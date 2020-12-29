import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {useDrop} from "react-dnd";
import {itemTypes} from "../../../Types";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ResourceInPractice from "./ResourceInPractice";
import ChooseLicenseDialog from "../../dialog/ChooseLicenseDialog";
import {checkCompatible} from "../../../Requests";

const useStyles = makeStyles((theme) => ({
    root: {
      position: 'absolute'
    },
    hint_box: {
        [theme.breakpoints.up('sm')]: {
            'border': '1px solid black',
            'height': '50px',
            'margin-top': '50px'
        },
        [theme.breakpoints.up('xl')]: {
            'border': '1px solid black',
            'height': '50px',
            'margin-top': '50px'
        }
    },
    result_box: {
        [theme.breakpoints.up('sm')]: {
            'border': '1px solid black',
            'height': '150px',
            'margin-top': '25px'
        },
        [theme.breakpoints.up('xl')]: {
            'border': '1px solid black',
            'height': '350px',
            'margin-top': '25px'
        }
    },
    submit_button: {
        [theme.breakpoints.up('sm')]: {
            'margin-top': '25px'
        },
        [theme.breakpoints.up('xl')]: {
            'margin-top': '80px'
        }
    }
}));

const initChosenResourcesArray = (arr) => {
    return arr.map((elem) => {
        return {
            resource_id: elem.resource_id,
            has_been_chosen: false
        }
    });
};

function PracticeEditing(props) {
    const styles = useStyles();
    const practice = props.practice;
    const [isSubmitDialogOpening, setIsSubmitDialogOpening] = useState(false);
    const [finalLicense, setFinalLicense] = useState('CC');
    const [chosenResourcesArray, setChosenResourcesArray] = useState(initChosenResourcesArray(practice.resources));
    const finishPractice = props.finishPractice;

    useEffect(() => {
        setChosenResourcesArray(initChosenResourcesArray(practice.resources));
    }, [practice]);

    const hasResourcesBeenChosen = (resource_id) => {
        const resource = chosenResourcesArray.find(element => element.resource_id === resource_id);
        if (resource) {
            return resource.has_been_chosen;
        }
        // it does not matter if the following line return true or false.
        return false;
    };

    const openChooseLicenseDialog = () => {
        setIsSubmitDialogOpening(true);
    };

    const closeChooseLicenseDialog = () => {
        setIsSubmitDialogOpening(false);
    };

    const selectFinalLicense = (e) => {
        setFinalLicense(e.target.value)
    };

    const clickOnSubmitButton = (e) => {
        e.preventDefault();
        let licenseArray = [];
        for (let i = 0; i < practice.resources.length; i++) {
            if (practice.resources[i].has_been_chosen) {
                licenseArray.push(practice.resources[i].license);
            }
        }
        checkCompatible(window.accessToken, 'composition', licenseArray, finalLicense)
            .then(res => {
                if (res.result) {
                    finishPractice(props.id_within_story);
                } else {
                    alert(res.error_message);
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
        finishPractice(props.id_within_story);
    };

    return (
        <Grid container item direction={'column'} spacing={10} className={styles.root}>
            <ChooseLicenseDialog isSubmitDialogOpening={isSubmitDialogOpening}
                                 closeChooseLicenseDialog={closeChooseLicenseDialog}
                                 clickOnSubmitButton={clickOnSubmitButton}
                                 selectFinalLicense={selectFinalLicense}
                                 finalLicense={finalLicense}
                                 message={':D'}/>
            <Grid container item justify={'center'}>
                <Grid container item direction={'row'} className={styles.hint_box} xs={10} justify={'center'}
                      alignItems={'center'}>
                    <Grid item>{practice.description}</Grid>
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
            <Grid container item justify={'space-around'} className={styles.submit_button}>
                <Grid item xs={3}>
                    <Button variant={'contained'} fullWidth onClick={openChooseLicenseDialog}>Next</Button>
                </Grid>
                <Grid container item xs={3} justify={'center'}>
                    <Button variant={"contained"} fullWidth onClick={clickOnSkip}>Skip</Button>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default PracticeEditing;