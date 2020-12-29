import React from 'react';
import Paper from "@material-ui/core/Paper";
import Form from "react-bootstrap/Form";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import {makeStyles} from "@material-ui/core/styles";
import {licenseTypes} from "../../Types";
import Slide from '@material-ui/core/Slide';

const useStyles = makeStyles((theme) => ({
    pop_up: {
        'background-color': 'white',
        [theme.breakpoints.up('sm')]: {
            'position': 'absolute',
            'width': '400px',
            'height': '200px',
            'top': '50%',
            'left': '50%',
            'transform': 'translate(-50%,-50%)'
        },
        [theme.breakpoints.up('xl')]: {
            'position': 'absolute',
            'width': '400px',
            'height': '200px',
            'top': '50%',
            'left': '50%',
            'transform': 'translate(-50%,-50%)'
        }
    }
}));

function ChooseLicenseDialog(props) {
    const styles = useStyles();
    const licenses_to_be_excluded_from_answer = props.licenses_to_be_excluded_from_answer;

    const getToBeDisplayedLicenses = () => {
        if (!licenses_to_be_excluded_from_answer) {
            return Object.values(licenseTypes);
        }
        let result = [];
        for (const license in licenseTypes) {
            if (licenseTypes.hasOwnProperty(license)) {
                if (!licenses_to_be_excluded_from_answer.includes(licenseTypes[license])) {
                    result.push(licenseTypes[license]);
                }
            }
        }
        return result;
    };

    return (
        <Modal open={props.isSubmitDialogOpening}
               onClose={props.closeChooseLicenseDialog}>
            <Grid className={styles.pop_up}>
                <Form onSubmit={props.clickOnSubmitButton}>
                    <Grid container direction={'column'} alignItems={'center'}>
                        <Form.Group controlId="exampleForm.SelectCustom">
                            <Form.Label>{props.message}</Form.Label>
                            <Form.Control as="select" value={props.finalLicense}
                                          onChange={props.selectFinalLicense}>
                                <option value={'none'}>Not combinable</option>
                                {
                                    getToBeDisplayedLicenses().map(license => {
                                        return (
                                            <option value={license}
                                                    key={'ChooseLicenseDialog-' + license}>{license}</option>
                                        );
                                    })
                                }
                            </Form.Control>
                        </Form.Group>
                        <Button variant={'contained'} type={'submit'}>
                            Submit
                        </Button>
                    </Grid>
                </Form>
            </Grid>
        </Modal>
    );
}

export default ChooseLicenseDialog;