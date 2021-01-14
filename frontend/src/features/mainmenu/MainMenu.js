import React, {useState, useEffect, useContext} from 'react';
import {useDispatch} from "react-redux";
import {reset_to_default_challenge} from "../playground/story/CurrentChallangeSlice";
import {reset_to_default_practices_list} from "../playground/story/CurrentPracticesListSlice";
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';
import {makeStyles} from "@material-ui/core/styles";
import {Redirect} from 'react-router-dom';
import {menu_button_background} from "../../images";
import {GameContext} from "../../App";
import {background} from "../../definitions/Types";

const useStyles = makeStyles((theme) => ({
    root: {
        'margin': '100px 0px 100px 0px',
        'width': '100%'
    },
    button: {
        [theme.breakpoints.up('xl')]: {
            'height': '90px',
            'font-size': '20px'
        },
        [theme.breakpoints.down('xl')]: {
            'height': '50px',
            'font-size': '14px'
        },
        'background-image': `url(${menu_button_background})`,
        'background-size': '100% 100%'
    }
}));

function MainMenu() {
    const styles = useStyles();
    const dispatch = useDispatch();
    const [to_story, set_to_story] = useState(false);
    const [to_instruction, set_to_instruction] = useState(false);
    const [to_high_score, set_to_high_score] = useState(false);
    const game_context = useContext(GameContext);

    const onClickStory = (e) => {
        e.preventDefault();
        set_to_story(true);
    };

    const onClickHowToPlay = (e) => {
        e.preventDefault();
        set_to_instruction(true)
    };

    const onClickHighScore = (e) => {
        e.preventDefault();
        set_to_high_score(true);
    };

    useEffect(() => {
        dispatch(reset_to_default_challenge());
        dispatch(reset_to_default_practices_list());
    });

    useEffect(() => {
        if (game_context.background.current_background !== background.MAIN_MENU) {
            game_context.background.current_background = background.MAIN_MENU;
            game_context.background.set_background(background.MAIN_MENU);
        }
    });

    if (to_story) {
        return (
            <Redirect to={'/play'}/>
        )
    } else if (to_instruction) {
        return (
            <Redirect to={'/instruction'}/>
        )
    } else if (to_high_score) {
        return (
            <Redirect to={'/high-score'}/>
        )
    }
    else {
        return (
            <Grid container direction={'column'} spacing={10} className={styles.root}>
                <Grid container item justify={'center'}>
                    <Grid item xs={6} md={5}>
                        <Button className={styles.button} fullWidth onClick={onClickStory}>Play</Button>
                    </Grid>
                </Grid>
                <Grid container item justify={'center'}>
                    <Grid item xs={6} md={5}>
                        <Button className={styles.button} fullWidth onClick={onClickHowToPlay}>How To Play</Button>
                    </Grid>
                </Grid>
                <Grid container item justify={'center'}>
                    <Grid item xs={6} md={5}>
                        <Button className={styles.button} fullWidth onClick={onClickHighScore}>My
                            High Score</Button>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default MainMenu;