import React from 'react';
import Paper from "@material-ui/core/Paper";
import Form from "react-bootstrap/Form";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    pop_up: {
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

function SubmitDialogInPracticeEditing (props) {
    const styles = useStyles();
    return (
        <Modal open={props.isSubmitDialogOpening}
               onClose={props.closeSubmitDialog}>
            <Paper className={styles.pop_up}>
                <Form onSubmit={props.clickOnSubmitButton}>
                    <Grid container direction={'column'} alignItems={'center'}>
                        <Form.Group controlId="exampleForm.SelectCustom">
                            <Form.Label>Now, please license your content</Form.Label>
                            <Form.Control as="select" value={props.finalLicense} onChange={props.selectFinalLicense}>
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
    );
}

export default SubmitDialogInPracticeEditing;