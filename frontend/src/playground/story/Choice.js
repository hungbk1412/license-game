import React, {useRef, useEffect} from 'react';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import {story_choice} from "../../images";

const useStyles = makeStyles((theme) => ({
    choice: {
        'margin-top': '5px',
        'padding-left': '10px',
        'padding-right': '10px',
        [theme.breakpoints.up('sm')]: {
            'height': '90px'
        },
        [theme.breakpoints.up('xl')]: {
            'height': '75px'
        }
    },
    chosen_choice: {
        'background-color': '#AAF38D'
    },
    choice_button: {
        'backgroundImage': `url(${story_choice})`,
        'background-size': '100% 100%',
        'color': '#BFB7AF',

    }
}));

const Choice = (props) => {
    const styles = useStyles();
    const clickOnAChoice = props.clickOnAChoice;
    const choiceButton = useRef(null);
    const display_text = props.display_text;
    const choice_number = props.choice_number;
    const is_selected = props.is_selected;

    useEffect(() => {
        if (is_selected) {
            choiceButton.current.classList.add(styles.chosen_choice);
        } else {
            choiceButton.current.classList.remove(styles.chosen_choice);
        }
    });
    return (
        <Grid container item xs={5} className={styles.choice}>
            <Button                    ref={choiceButton}
                    id={'story-choice-3'}
                    fullWidth
                    onClick={() => clickOnAChoice(choice_number)}
                    className={styles.choice_button}>
                {display_text}
            </Button>
        </Grid>
    );
};

export default Choice;