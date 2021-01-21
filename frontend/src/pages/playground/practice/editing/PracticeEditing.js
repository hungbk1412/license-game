import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";
import {useDrop} from "react-dnd";
import {item_types, color, game_types} from "../../../../definitions/Types";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ResourceInPracticeEditing from "./ResourceInPracticeEditing";
import ChooseLicenseDialog from "../../dialog/choose_license_dialog/ChooseLicenseDialog";
import ConfirmSubmissionDialog from "../../dialog/confirm_submission_dialog/ConfirmSubmissionDialog";
import {
    open_confirm_submission_dialog,
    close_confirm_submission_dialog
} from "../../dialog/confirm_submission_dialog/ConfirmSubmissionDialogSlice";
import {
    open_choose_license_dialog,
    close_choose_license_dialog,
    select_license
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
            'bottom': '25px'
        },
        [theme.breakpoints.up('xl')]: {
            'bottom': '25px'
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

    const has_resources_been_chosen = (resource_id) => {
        const resource = chosenResourcesArray.find(element => element.resource_id === resource_id);
        if (resource) {
            return resource.has_been_chosen;
        }
        // it does not matter if the following line return true or false.
        return false;
    };

    const click_on_submit_button = (e) => {
        e.preventDefault();
        let licenseArray = [];

        for (let i = 0; i < chosenResourcesArray.length; i++) {
            if (chosenResourcesArray[i].has_been_chosen) {
                licenseArray.push(chosenResourcesArray[i].license);
            }
        }

        if (licenseArray.length < practice.number_of_required_resource) {
            alert('Beware the number of resources');
            return;
        }

        let user_answer = choose_license_dialog.selected_license;
        let combination_type = practice.type === game_types.PRACTICE_EDITING_COLLAGE ? 'collage' : 'composition';
        checkCompatible(window.accessToken, combination_type, licenseArray, user_answer)
            .then(res => {
                if (res.hasOwnProperty('result') && res.result) {
                    dispatch(open_confirm_submission_dialog({correctness: true, message: SUCCESS_MESSAGE}));
                    dispatch(set_score({
                        type: game_types.PRACTICE_EDITING_COLLAGE,
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

    const on_click_remove_resource = (resource_id) => {
        let new_resources = chosenResourcesArray.map(resource => {
            if (resource.resource_id === resource_id) {
                resource.has_been_chosen = false;
            }
            return resource
        });
        setChosenResourcesArray(new_resources);
    };

    const [{isOver}, drop] = useDrop({
        accept: item_types.PRACTICE_RESOURCE,
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

    const click_on_next = (e) => {
        e.preventDefault();
        dispatch(select_license('none'));
        dispatch(open_choose_license_dialog());
    };

    const click_on_skip = (e) => {
        e.preventDefault();
        go_to_next_level();
    };

    const go_to_next_level = () => {
        set_show_up(false);
        dispatch(reset_time());
        dispatch(close_choose_license_dialog());
        dispatch(close_confirm_submission_dialog());
        setTimeout(() => {
            set_show_up(true);
            dispatch(finish_a_practice(practice.id));
        }, 500);
    };

    useEffect(() => {
        setChosenResourcesArray(initChosenResourcesArray(practice.resources));
    }, [practice.id, current_challenge.level]);


    return (
        <Grid container item direction={'column'} alignItems={'center'} spacing={10} className={styles.root}>
            <ChooseLicenseDialog click_on_submit_button={click_on_submit_button}/>
            <ConfirmSubmissionDialog go_to_next_level={go_to_next_level}/>
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
                                if (has_resources_been_chosen(resource.resource_id)) {
                                    const key = 'practice_resource.' + resource.resource_id;
                                    return (
                                        <ResourceInPracticeEditing key={key}
                                                                   width={'50px'}
                                                                   height={'50px'}
                                                                   resource_type={resource.resource_type}
                                                                   license={resource.license}
                                                                   resource_id={resource.resource_id}
                                                                   on_click_remove_resource={on_click_remove_resource}
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
                            if (!has_resources_been_chosen(resource.resource_id)) {
                                const key = 'practice_resource.' + resource.resource_id;
                                return (
                                    <ResourceInPracticeEditing key={key}
                                                               width={'100px'}
                                                               height={'100px'}
                                                               resource_type={resource.resource_type}
                                                               license={resource.license}
                                                               resource_id={resource.resource_id}
                                                               on_click_remove_resource={on_click_remove_resource}

                                    />
                                );
                            }
                        })
                    }
                </Grid>
            </Slide>
            <Slide direction={'up'} in={show_up} mountOnEnter unmountOnExit>
                <Grid container item justify={'space-around'} className={styles.button_container}>
                    <Grid item xs={4}>
                        <Button fullWidth onClick={click_on_next}
                                className={styles.button}>Next</Button>

                    </Grid>
                    <Grid container item xs={4} justify={'center'}>
                        <Button fullWidth onClick={click_on_skip} className={styles.button}>Skip</Button>
                    </Grid>
                </Grid>
            </Slide>
        </Grid>
    );
}

export default PracticeEditing;