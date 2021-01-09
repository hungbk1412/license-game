import React from 'react';
import Modal from "@material-ui/core/Modal";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import {story_dialog, menu_button_background, correct_symbol, incorrect_symbol} from '../../../images';
import {color} from "../../../definitions/Types";

const useStyles = makeStyles((theme) => ({
    pop_up: {
        'background-image': `url(${story_dialog})`,
        'background-size': '100% 100%',
        [theme.breakpoints.up('sm')]: {
            'position': 'absolute',
            'width': '350px',
            'height': '250px',
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
    },
    symbol: {
        'margin-top': '40px',
        'max-width': '30%',
        'max-height': '30%'
    },
    congratulation_message: {
        'margin-top': '10px',
        'color': color.NORMAL_TEXT_WHITE
    },
    confirm_button: {
        'background-image': `url(${menu_button_background})`,
        'background-size': '100% 100%',
        'width': '120px',
        'margin-top': '15px'
    }
}));

const ConfirmSubmission = (props) => {
    const styles = useStyles();
    const isConfirmSubmissionDialogOpening = props.is_confirm_submission_dialog_opening;
    const closeConfirmSubmissionDialog = props.close_confirm_submission_dialog;
    const buttonLabel = props.correctness ? 'Next Level' : 'Okay';
    const symbol = props.correctness ? correct_symbol : incorrect_symbol;
    const message = props.message;
    const setConfirmSubmissionDialog = props.set_confirm_submission_dialog;
    const goToNextLevel = props.go_to_next_level;

    const onClickConfirm = () => {
        if (props.correctness) {
            goToNextLevel();
        } else {
            setConfirmSubmissionDialog(prevState => {
                return {
                    ...prevState,
                    is_opening: false
                }
            });
        }
    };

    return (
        <Modal open={isConfirmSubmissionDialogOpening}
               onClose={closeConfirmSubmissionDialog}>
            <Grid container item direction={'column'} alignItems={'center'}
                  className={styles.pop_up}>
                <img src={symbol} className={styles.symbol}/>
                <Grid item className={styles.congratulation_message}>{message}</Grid>
                <Grid item>
                    <Button onClick={onClickConfirm} className={styles.confirm_button}>{buttonLabel}</Button>
                </Grid>
            </Grid>
        </Modal>
    );
};

export default ConfirmSubmission;