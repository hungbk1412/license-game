import React from "react";
import {main_background, how_to_play, system_button_background} from "../../images";
import {useHistory} from 'react-router-dom';
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import {color} from "../../definitions/Types";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    root: {
        'position': 'absolute',
        'height': '100%',
        'background-image': `url(${main_background})`,
        'background-size': '100% 100%'
    },
    how_to_play_container: {
        'height': '75vh',
        'background-image': `url(${how_to_play})`,
        'background-size': '100% 100%'
    },
    header_container: {
        'margin-top': '3vh'
    },
    header: {
        'color': color.BROWN,
        'font-size': '4vh',
        'font-family': 'Charmonman'
    },
    button_container: {
        'position': 'absolute',
        'bottom': '5vh'
    },
    button: {
        'width': '10vw',
        'height': '5vh',
        'background-image': `url(${system_button_background})`,
        'background-size': '100% 100%'
    },
    text_container: {
        'font-family': 'Charmonman',
        'font-size': '2.0vh',
        'text-align': 'justify',
        'margin-top': '2vh'
    }
}));

const HowToPlay = () => {
    const styles = useStyles();
    const history = useHistory();
    const click_on_to_main_menu = () => {
        history.push('/');
    };
    return (
        <Grid container item xs={12} justify={'center'} alignItems={'center'} className={styles.root}>
            <Grid container item xs={8} className={styles.how_to_play_container} justify={'center'}
                  alignContent={'flex-start'}>
                <Grid container item xs={12} justify={'center'} alignItems={'center'} alignContent={'center'}
                      className={styles.header_container}>
                    <Grid item className={styles.header}>Game Rules</Grid>
                </Grid>
                <Grid container item xs={10} justify={'flex-start'} className={styles.text_container}>
                    <Grid item>This game is a question-based game and has 7 levels in total. You overcome a level by
                        giving the
                        correct answer.
                        <br/><br/>
                        In the first three levels, some practices are prepared for you. You can skip them if you want,
                        but it is recommended to finish these practices before jumping into the main challenge. To check
                        whether you are practicing or solving a main challenge, take a look at the Game mode on the top
                        side of the game.
                    </Grid>
                </Grid>
                <Grid container item xs={12} justify={'center'} alignItems={'center'}
                      className={styles.header_container}>
                    <Grid item className={styles.header}>Scoring system</Grid>
                </Grid>
                <Grid container item xs={10} justify={'flex-start'} className={styles.text_container}>
                    <Grid item>For every passed challenge and practice, you will get a certain amount of points. The
                        score is calculated based on the time
                        <br/><br/>
                        By clicking on the High Score button in the main menu, you can see the top three players with
                        the highest score</Grid>
                </Grid>
                <Grid container item xs={4} className={styles.button_container} justify={'center'}>
                    <Button className={styles.button} onClick={click_on_to_main_menu}>
                        To Main Menu
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    )
};

export default HowToPlay;