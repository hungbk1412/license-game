import React, {useState} from 'react';
import lodash from 'lodash';
import {makeStyles} from "@material-ui/core/styles";
import practiceGenerator from "../challenge_generator/Practice";
import {useDrop} from "react-dnd";
import ItemTypes from "../ItemTypes";
import StoryMode from "./StoryMode";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ResourceInPractice from "./ResourceInPractice";
import SubmitDialogInPracticeEditing from "./dialog/SubmitDialogInPracticeEditing";

const useStyles = makeStyles((theme) => ({
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

function PracticeEditing(props) {
    const styles = useStyles();
    const [finishPractice, setFinishPractice] = useState(false);
    const [{resources}, setResources] = useState(practiceGenerator(props.practiceLevel));
    const [isSubmitDialogOpening, setIsSubmitDialogOpening] = useState(false);
    const [finalLicense, setFinalLicense] = useState('CC');
    const openSubmitDialog = () => {
        setIsSubmitDialogOpening(true);
    };

    const closeSubmitDialog = () => {
        setIsSubmitDialogOpening(false);
    };

    const selectFinalLicense = (e) => {
        setFinalLicense(e.target.value)
    };

    const clickOnSubmitButton = (e) => {
        e.preventDefault();
        let licenseArray = [];
        for (let i = 0; i < resources.length; i++) {
            if (resources[i].has_been_chosen) {
                licenseArray.push(resources[i].license);
            }
        }
        const token = window.accessToken || 'Example_token';
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                // todo: NO HARD CODE. COMPSITION
                type: 'composition',
                clientLicenseAnswer: finalLicense,
                licenseArray: licenseArray
            })
        };
        fetch('http://localhost:5000/', requestOptions)
            .then(res => res.json())
            .then(res => {
                if (res.result) {
                    setFinishPractice(true);
                } else {
                    alert(res.error_message);
                }
            })
            .catch(e => console.log(e));
    };

    const onClickRemoveResource = (resource_id) => {
        let new_resources = lodash.cloneDeep(resources);
        new_resources[resource_id].has_been_chosen = false;
        setResources(new_resources);
    };

    const [{isOver}, drop] = useDrop({
        accept: ItemTypes.PRACTICE_RESOURCE,
        drop: (item, monitor) => {
            const position = resources.findIndex(resource => resource.resource_id === item.resource_id);
            let new_resources = lodash.cloneDeep(resources);
            new_resources[position].has_been_chosen = true;
            setResources(new_resources);
        },
        collect: monitor => ({
            isOver: !!monitor.isOver()
        })
    });

    if (finishPractice) {
        return <StoryMode storyLevel={props.storyLevel} practiceLevel={null}/>
    } else {
        return (
            <Grid container item direction={'column'} spacing={10}>
                <SubmitDialogInPracticeEditing isSubmitDialogOpening={isSubmitDialogOpening}
                                               closeSubmitDialog={closeSubmitDialog}
                                               clickOnSubmitButton={clickOnSubmitButton}
                                               selectFinalLicense={selectFinalLicense}
                                               finalLicense={finalLicense}/>
                <Grid container item justify={'center'}>
                    <Grid container item direction={'row'} className={styles.hint_box} xs={10} justify={'center'}
                          alignItems={'center'}>
                        <Grid item>Drag and drop OER into the big rectangle below</Grid>
                    </Grid>
                    <Grid container item direction={'row'} justify={'space-around'} alignItems={'center'}
                          className={styles.result_box} xs={10} ref={drop}>
                        {
                            resources.map((resource) => {
                                if (resource.has_been_chosen) {
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
                <Grid container item spacing={4}>
                    {
                        resources.map((resource) => {
                            if (!resource.has_been_chosen) {
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
                <Grid container item justify={'center'} className={styles.submit_button}>
                    <Grid item xs={3}>
                        <Button variant={'contained'} fullWidth onClick={openSubmitDialog}>Next</Button>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default PracticeEditing;