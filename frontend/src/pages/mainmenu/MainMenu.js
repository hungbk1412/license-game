import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {reset_to_default_challenge} from "../../redux_slices/CurrentChallangeSlice";
import {reset_to_default_practices_list} from "../../redux_slices/CurrentPracticesListSlice";
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';
import {makeStyles} from "@material-ui/core/styles";
import {main_background, system_button_background} from "../../images";
import {fetch_high_score_board} from "../../redux_slices/HighScoreBoardSlice";
import {color} from "../../definitions/Types";
import {reset_time} from "../../redux_slices/TimerSlice";
import {set_current_page} from "../../redux_slices/CurrentPage";

const useStyles = makeStyles((theme) => ({
    root: {
        'position': 'absolute',
        'height': '100%',
        'background-image': `url(${main_background})`,
        'background-size': '100% 100%',
        // This is only a temporary fix
        // 'z-index': 1
    },
    mainmenu_container: {
        'margin-top': '16vh'
    },
    button: {
        'height': '6vh',
        'font-size': '1.7vh',
        'background-image': `url(${system_button_background})`,
        'background-size': '100% 100%',
        'color': color.WHITE,
        'font-family': 'Charmonman'
    }
}));

function MainMenu() {
    const styles = useStyles();
    const dispatch = useDispatch();

    const onClickPlay = (e) => {
        e.preventDefault();
        dispatch(set_current_page('choose_level'));
    };

    const onClickHowToPlay = (e) => {
        e.preventDefault();
        dispatch(set_current_page('how_to_play'));
    };

    const onClickHighScore = (e) => {
        e.preventDefault();
        dispatch(fetch_high_score_board());
        dispatch(set_current_page('high_score_board'));
    };

    useEffect(() => {
        dispatch(reset_to_default_challenge());
        dispatch(reset_to_default_practices_list());
        dispatch(reset_time());
    });

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

export default MainMenu;