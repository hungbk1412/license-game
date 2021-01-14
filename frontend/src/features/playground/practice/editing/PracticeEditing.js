import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";
import {useDrop} from "react-dnd";
import {itemTypes, color, gameTypes} from "../../../../definitions/Types";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ResourceInPractice from "./ResourceInPractice";
import ChooseLicenseDialog from "../../dialog/choose_license_dialog/ChooseLicenseDialog";
import ConfirmSubmissionDialog from "../../dialog/confirm_submission_dialog/ConfirmSubmissionDialog";
import {
    open_confirm_submission_dialog,
    close_confirm_submission_dialog
} from "../../dialog/confirm_submission_dialog/ConfirmSubmissionDialogSlice";
import {
    open_choose_license_dialog,
    close_choose_license_dialog
} from "../../dialog/choose_license_dialog/ChooseLicenseDialogSlice";
import {checkCompatible} from "../../../../utils/Requests";
import {menu_button_background, practice_lava_frame, story_question} from "../../../../images";
import {finish_a_practice} from "../../story/CurrentPracticesListSlice";
import {reset_time} from "../../../navbar/TimerSlice";
import {set_score} from "../../../../ScoreSlice";
import Slide from "@material-ui/core/Slide";

const SUCCESS_MESSAGE = 'Congratulation !!!';
const FAIL_MESSAGE = 'Please try again';

const useStyles = makeStyles((theme) => ({
    root: {
        'margin-top': '20px'
    },
    header: {
        'color': color.NORMAL_TEXT_WHITE
    },
    header_container: {
        'background-image': `url(${story_question})`,
        'background-size': '100% 100%',
        [theme.breakpoints.up('sm')]: {
            'height': '90px',
            'margin-bottom': '10px'
        },
        [theme.breakpoints.up('xl')]: {
            'height': '70px',
            'margin-bottom': '10px'
        },
    },
    result_box: {
        'background-image': `url(${practice_lava_frame})`,
        'background-size': '100% 100%',
        [theme.breakpoints.up('sm')]: {
            'height': '200px',
            'margin-top': '25px'
        },
        [theme.breakpoints.up('xl')]: {
            'height': '350px',
            'margin-top': '25px'
        }
    },
    button_container: {
        'position': 'absolute',
        [theme.breakpoints.up('sm')]: {
            'margin-top': '25px',
            'bottom': '50px'
        },
        [theme.breakpoints.up('xl')]: {
            'margin-top': '80px',
            'bottom': '50px'
        }
    },
    button: {
        'background-image': `url(${menu_button_background})`,
        'background-size': '100% 100%',
        'height': '50px',
        'color': color.NORMAL_TEXT_WHITE
    }
}));

const initChosenResourcesArray = (arr) => {
    return arr.map((elem) => {
        return {
            resource_id: elem.resource_id,
            license: elem.license,
            has_been_chosen: false
        }
    });
};

function PracticeEditing(props) {
    const styles = useStyles();
    const dispatch = useDispatch();
    const current_challenge = useSelector(state => state.current_challenge);
    const practice = props.practice;
    const choose_license_dialog = useSelector(state => state.choose_license_dialog);
    const [chosenResourcesArray, setChosenResourcesArray] = useState(initChosenResourcesArray(practice.resources));
    const [show_up, set_show_up] = useState(true);

    const hasResourcesBeenChosen = (resource_id) => {
        const resource = chosenResourcesArray.find(element => element.resource_id === resource_id);
        if (resource) {
            return resource.has_been_chosen;
        }
        // it does not matter if the following line return true or false.
        return false;
    };

    const clickOnSubmitButton = (e) => {
        e.preventDefault();
        let licenseArray = [];

        for (let i = 0; i < chosenResourcesArray.length; i++) {
            if (chosenResourcesArray[i].has_been_chosen) {
                licenseArray.push(chosenResourcesArray[i].license);
            }
        }

        let user_answer = choose_license_dialog.selected_license;
        checkCompatible(window.accessToken, 'collage', licenseArray, user_answer)
            .then(res => {
                if (res.hasOwnProperty('result') && res.result) {
                    dispatch(open_confirm_submission_dialog({correctness: true, message: SUCCESS_MESSAGE}));
                    dispatch(set_score({
                        type: gameTypes.PRACTICE_EDITING_COLLAGE,
                        story_level: current_challenge.level,
                        practice_id: practice.id,
                        practice_level: practice.level
                    }));
                } else {
                    dispatch(open_confirm_submission_dialog({correctness: false, message: FAIL_MESSAGE}));
                }
            })
            .catch(e => console.log(e));
    };

    const onClickRemoveResource = (resource_id) => {
        let new_resources = chosenResourcesArray.map(resource => {
            if (resource.resource_id === resource_id) {
                resource.has_been_chosen = false;
            }
            return resource
        });
        setChosenResourcesArray(new_resources);
    };

    const [{isOver}, drop] = useDrop({
        accept: itemTypes.PRACTICE_RESOURCE,
        drop: (item, monitor) => {
            let new_resources = chosenResourcesArray.map(resource => {
                if (resource.resource_id === item.resource_id) {
                    resource.has_been_chosen = true;
                }
                return resource
            });
            setChosenResourcesArray(new_resources);
        },
        collect: monitor => ({
            isOver: !!monitor.isOver()
        })
    });

    const clickOnSkip = (e) => {
        e.preventDefault();
        goToNextLevel();
    };

    const goToNextLevel = () => {
        set_show_up(false);
        setTimeout(() => {
            set_show_up(true);
            dispatch(reset_time());
            dispatch(close_choose_license_dialog());
            dispatch(close_confirm_submission_dialog());
            dispatch(finish_a_practice(practice.id));
        }, 500);
    };

    useEffect(() => {
        setChosenResourcesArray(initChosenResourcesArray(practice.resources));
    }, [practice.id, current_challenge.level]);


    return (
        <Grid container item direction={'column'} spacing={10} className={styles.root}>
            <ChooseLicenseDialog clickOnSubmitButton={clickOnSubmitButton}/>
            <ConfirmSubmissionDialog go_to_next_level={goToNextLevel}/>
            <Grid container item justify={'center'}>
                <Slide direction={'down'} in={show_up} mountOnEnter unmountOnExit>
                    <Grid container item direction={'row'} className={styles.header_container} xs={10}
                          justify={'center'}
                          alignItems={'center'}>
                        <Grid item className={styles.header}>{practice.description}</Grid>
                    </Grid>
                </Slide>
                <Slide direction={'down'} in={show_up} mountOnEnter unmountOnExit>
                    <Grid container item direction={'row'} justify={'space-around'} alignItems={'center'}
                          className={styles.result_box} xs={10} ref={drop}>
                        {
                            practice.resources.map((resource) => {
                                if (hasResourcesBeenChosen(resource.resource_id)) {
                                    const key = 'practice_resource.' + resource.resource_id;
                                    return (
                                        <ResourceInPractice key={key}
                                                            width={'50px'}
                                                            height={'50px'}
                                                            resource_type={resource.resource_type}
                                                            license={resource.license}
                                                            resource_id={resource.resource_id}
                                                            onClickRemoveResource={onClickRemoveResource}
                                                            inside_the_result_box={true}
                                        />
                                    );
                                }
                            })
                        }
                    </Grid>
                </Slide>
            </Grid>
            <Slide direction={'up'} in={show_up} mountOnEnter unmountOnExit>
                <Grid container item justify={'center'} spacing={4}>
                    {
                        practice.resources.map((resource) => {
                            if (!hasResourcesBeenChosen(resource.resource_id)) {
                                const key = 'practice_resource.' + resource.resource_id;
                                return (
                                    <ResourceInPractice key={key}
                                                        width={'100px'}
                                                        height={'100px'}
                                                        resource_type={resource.resource_type}
                                                        license={resource.license}
                                                        resource_id={resource.resource_id}
                                                        onClickRemoveResource={onClickRemoveResource}

                                    />
                                );
                            }
                        })
                    }
                </Grid>
            </Slide>
            <Grid container item justify={'space-around'} className={styles.button_container}>
                <Grid item xs={4}>
                    <Slide direction={'up'} in={show_up} mountOnEnter unmountOnExit>
                        <Button fullWidth onClick={() => dispatch(open_choose_license_dialog())}
                                className={styles.button}>Next</Button>
                    </Slide>
                </Grid>
                <Grid container item xs={4} justify={'center'}>
                    <Slide direction={'up'} in={show_up} mountOnEnter unmountOnExit>
                        <Button fullWidth onClick={clickOnSkip} className={styles.button}>Skip</Button>
                    </Slide>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default PracticeEditing;