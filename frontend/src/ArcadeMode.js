import React, {useState} from 'react';
import lodash from 'lodash';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ResourceInArcade from './ResourceInArcade';
import {useDrop} from "react-dnd";
import ItemTypes from './ItemTypes';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Form from 'react-bootstrap/Form';
import challengeGenerator from './challenge_generator/Arcade';

const useStyles = makeStyles({
    result_box: {
        'border': '1px solid black',
        'height': '200px',
        'margin-top': '100px'
    },
    submit_button: {
        'margin-top': '100px'
    },
    pop_up: {
        'position': 'absolute',
        'width': '400px',
        'height': '200px',
        'top': '50%',
        'left': '50%',
        'transform': 'translate(-50%,-50%)'
    }
});

function ArcadeMode() {
    const styles = useStyles();
    const [resources, setResources] = useState(challengeGenerator());
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
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                type: 'collage',
                clientLicenseAnswer: finalLicense,
                licenseArray: licenseArray
            })
        };
        fetch('http://localhost:5000/', requestOptions).then(res => res.json()).then(res => alert('error: ' + res.error_message + '/ ' +'result: ' + res.result));
    };

    const onClickRemoveResource = (resource_id) => {
        let new_resources = lodash.cloneDeep(resources);
        new_resources[resource_id].has_been_chosen = false;
        setResources(new_resources);
    };

    const [{isOver}, drop] = useDrop({
        accept: ItemTypes.ARCADE_RESOURCE,
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

    return (
        <Grid container item direction={'column'} spacing={10}>
            <Modal open={isSubmitDialogOpening}
                   onClose={closeSubmitDialog}
                   aria-labelledby="simple-modal-title"
                   aria-describedby="simple-modal-description">
                <Paper className={styles.pop_up}>
                    <Form onSubmit={clickOnSubmitButton}>
                        <Grid container direction={'column'} alignItems={'center'}>
                            <Form.Group controlId="exampleForm.SelectCustom">
                                <Form.Label>Now, please license your content</Form.Label>
                                <Form.Control as="select" value={finalLicense} onChange={selectFinalLicense}>
                                    <option value={'none'}>Not combinable</option>
                                    <option value={'CC_ZERO'}>CC</option>
                                    <option value={'CC_BY'}>CC-BY</option>
                                    <option value={'CC_BY_SA'}>CC-BY-SA</option>
                                    <option value={'CC_BY_NC'}>CC-BY-NC</option>
                                    <option value={'CC_BY_NC_SA'}>CC-BY-NC-SA</option>
                                    <option value={'CC_BY_ND'}>CC-BY-ND</option>
                                    <option value={'CC_BY_NC_ND'}>CC-BY-NC-ND</option>
                                </Form.Control>
                            </Form.Group>
                            <Button variant={'contained'} type={'submit'}>
                                Submit
                            </Button>
                        </Grid>
                    </Form>
                </Paper>
            </Modal>
            <Grid container item justify={'center'}>
                <Grid container item direction={'row'} justify={'space-around'} alignItems={'center'}
                      className={styles.result_box} xs={8} ref={drop}>
                    {
                        resources.map((resource) => {
                            if (resource.has_been_chosen) {
                                const key = 'arcade_resource.' + resource.resource_id;
                                return (
                                    <ResourceInArcade key={key}
                                                      width={'50px'}
                                                      height={'50px'}
                                                      resource_type={resource.resource_type}
                                                      license={resource.license}
                                                      resource_id={resource.resource_id}
                                                      onClickRemoveResource={onClickRemoveResource}
                                                      display_remove_button={true}
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
                            const key = 'arcade_resource.' + resource.resource_id;
                            return (
                                <ResourceInArcade key={key}
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
                    <Button variant={'contained'} fullWidth onClick={openSubmitDialog}>Submit</Button>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default ArcadeMode;
