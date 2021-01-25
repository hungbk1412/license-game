import React, {useState, useEffect} from 'react';
import {useDispatch} from "react-redux";
import {reset_to_default_challenge} from "../playground/story/CurrentChallangeSlice";
import {reset_to_default_practices_list} from "../playground/story/CurrentPracticesListSlice";
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';
import {makeStyles} from "@material-ui/core/styles";
import {Redirect} from 'react-router-dom';
import {main_background, system_button_background} from "../../images";
import {fetch_high_score_board} from "../high_score/HighScoreBoardSlice";

const useStyles = makeStyles((theme) => ({
    root: {
        'position': 'absolute',
        'height': '100%',
        'background-image': `url(${main_background})`,
        'background-size': '100% 100%',
        // This is only a temporary fix
        'z-index': 1
    },
    mainmenu_container: {
        'margin-top': '160px'
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
        'background-image': `url(${system_button_background})`,
        'background-size': '100% 100%'
    }
}));

function MainMenu() {
    const styles = useStyles();
    const dispatch = useDispatch();
    const [to_choose_level, set_to_choose_level] = useState(false);
    const [to_instruction, set_to_instruction] = useState(false);
    const [to_high_score, set_to_high_score] = useState(false);

    const onClickPlay = (e) => {
        e.preventDefault();
        set_to_choose_level(true);
    };

    const onClickHowToPlay = (e) => {
        e.preventDefault();
        set_to_instruction(true)
    };

    const onClickHighScore = (e) => {
        e.preventDefault();
        dispatch(fetch_high_score_board());
        set_to_high_score(true);
    };

    useEffect(() => {
        dispatch(reset_to_default_challenge());
        dispatch(reset_to_default_practices_list());
    });

    if (to_choose_level) {
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
    } else {
        return (
            <Grid container item justify={'center'} xs={12} className={styles.root}>
                <Grid container item direction={'column'} xs={10} spacing={10} className={styles.mainmenu_container}>
                    <Grid container item justify={'center'}>
                        <Grid item xs={6} md={5}>
                            <Button className={styles.button} fullWidth onClick={onClickPlay}>Play</Button>
                        </Grid>
                    </Grid>
                    <Grid container item justify={'center'}>
                        <Grid item xs={6} md={5}>
                            <Button className={styles.button} fullWidth onClick={onClickHowToPlay}>How To Play</Button>
                        </Grid>
                    </Grid>
                    <Grid container item justify={'center'}>
                        <Grid item xs={6} md={5}>
                            <Button className={styles.button} fullWidth onClick={onClickHighScore}>High Score</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default MainMenu;