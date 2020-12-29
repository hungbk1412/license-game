import React from 'react';
import Paper from "@material-ui/core/Paper";
import Modal from "@material-ui/core/Modal";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
    pop_up: {
        'position': 'relative',
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

const SuccessfullyCompleteALevel = (props) => {
    const styles = useStyles();
    const isFinishLevelDialogOpening = props.is_finish_level_dialog_opening;
    const closeFinishLevelDialog = props.close_finish_level_dialog;
    const goToNextLevel = props.go_to_next_level;

    return (
        <Modal open={isFinishLevelDialogOpening}
               onClose={closeFinishLevelDialog}>
            <Grid container item direction={'column'} alignItems={'center'} justify={'space-around'}
                  className={styles.pop_up}>
                <Grid item>Congratulation!!!</Grid>
                <Button onClick={goToNextLevel} variant={'outlined'}>Next</Button>
            </Grid>
        </Modal>
    );
};

export default SuccessfullyCompleteALevel;