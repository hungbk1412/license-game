import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {useDrop} from "react-dnd";
import {itemTypes, color} from "../../../../definitions/Types";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ResourceInPractice from "./ResourceInPractice";
import ChooseLicenseDialog from "../../dialog/ChooseLicenseDialog";
import ConfirmSubmission from "../../dialog/ConfirmSubmission";
import {checkCompatible} from "../../../../utils/Requests";
import {menu_button_background, practice_lava_frame, story_question} from "../../../../images";

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
    const practice = props.practice;
    const [confirmSubmissionDialog, setConfirmSubmissionDialog] = useState({
        is_opening: false,
        correctness: false,
        message: ''
    });
    const [isChooseLicenseDialogOpening, setIsChooseLicenseDialogOpening] = useState(false);
    const [finalLicense, setFinalLicense] = useState('CC');
    const [chosenResourcesArray, setChosenResourcesArray] = useState(initChosenResourcesArray(practice.resources));
    const finishPractice = props.finishPractice;

    const closeConfirmSubmissionDialog = () => {
        setConfirmSubmissionDialog(prevState => {
            return {...prevState, is_opening: false}
        });
    };

    useEffect(() => {
        if (practice.resources.length !== chosenResourcesArray.length)
        setChosenResourcesArray(initChosenResourcesArray(practice.resources));
    });

    const hasResourcesBeenChosen = (resource_id) => {
        const resource = chosenResourcesArray.find(element => element.resource_id === resource_id);
        if (resource) {
            return resource.has_been_chosen;
        }
        // it does not matter if the following line return true or false.
        return false;
    };

    const openChooseLicenseDialog = () => {
        setIsChooseLicenseDialogOpening(true);
    };

    const closeChooseLicenseDialog = () => {
        setIsChooseLicenseDialogOpening(false);
    };

    const selectFinalLicense = (e) => {
        setFinalLicense(e.target.value)
    };

    const clickOnSubmitButton = (e) => {
        e.preventDefault();
        let licenseArray = [];
        for (let i = 0; i < chosenResourcesArray.length; i++) {
            if (chosenResourcesArray[i].has_been_chosen) {
                licenseArray.push(chosenResourcesArray[i].license);
            }
        }
        checkCompatible(window.accessToken, 'collage', licenseArray, finalLicense)
            .then(res => {
                if (res.result) {
                    setConfirmSubmissionDialog(prevState => {
                        return {
                            ...prevState,
                            is_opening: true,
                            correctness: true,
                            message: SUCCESS_MESSAGE
                        }
                    });
                } else {
                    setConfirmSubmissionDialog(prevState => {
                        return {
                            ...prevState,
                            is_opening: true,
                            correctness: false,
                            message: FAIL_MESSAGE
                        }
                    });
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
        setIsChooseLicenseDialogOpening(false);
        setConfirmSubmissionDialog(prevState => {
            return {
                ...prevState,
                is_opening: false
            }
        });
        finishPractice(props.id_within_story);
    };

    return (
        <Grid container item direction={'column'} spacing={10} className={styles.root}>
            <ChooseLicenseDialog isChooseLicenseDialogOpening={isChooseLicenseDialogOpening}
                                 closeChooseLicenseDialog={closeChooseLicenseDialog}
                                 clickOnSubmitButton={clickOnSubmitButton}
                                 selectFinalLicense={selectFinalLicense}
                                 finalLicense={finalLicense}
                                 message={':D'}/>
            <ConfirmSubmission is_confirm_submission_dialog_opening={confirmSubmissionDialog.is_opening}
                               close_confirm_submission_dialog={closeConfirmSubmissionDialog}
                               go_to_next_level={goToNextLevel}
                               correctness={confirmSubmissionDialog.correctness}
                               message={confirmSubmissionDialog.message}
                               set_confirm_submission_dialog={setConfirmSubmissionDialog}/>
            <Grid container item justify={'center'}>
                <Grid container item direction={'row'} className={styles.header_container} xs={10} justify={'center'}
                      alignItems={'center'}>
                    <Grid item className={styles.header}>{practice.description}</Grid>
                </Grid>
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
            </Grid>
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
            <Grid container item justify={'space-around'} className={styles.button_container}>
                <Grid item xs={4}>
                    <Button fullWidth onClick={openChooseLicenseDialog} className={styles.button}>Next</Button>
                </Grid>
                <Grid container item xs={4} justify={'center'}>
                    <Button fullWidth onClick={clickOnSkip} className={styles.button}>Skip</Button>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default PracticeEditing;