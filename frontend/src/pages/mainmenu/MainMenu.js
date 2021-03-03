import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {reset_to_default_challenge} from "../../redux_slices/CurrentChallangeSlice";
import {reset_to_default_practices_list} from "../../redux_slices/CurrentPracticesListSlice";
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';
import {makeStyles} from "@material-ui/core/styles";
import {main_background, story_dialog, system_button_background} from "../../images";
import {fetch_high_score_board} from "../../redux_slices/HighScoreBoardSlice";
import {color} from "../../definitions/Types";
import {reset_time} from "../../redux_slices/TimerSlice";
import {set_current_page} from "../../redux_slices/CurrentPage";
import {close_choose_license_dialog, select_license} from "../../redux_slices/ChooseLicenseDialogSlice";
import Form from "react-bootstrap/Form";
import Modal from "@material-ui/core/Modal";

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
    },
    pop_up: {
        'position': 'absolute',
        'background-image': `url(${story_dialog})`,
        'background-size': '100% 100%',
        'width': '45vw',
        'height': '100vh',
        'top': '50%',
        'left': '50%',
        'transform': 'translate(-50%,-50%)',
        'padding-left': '2vw',
        'padding-right': '2vw',
        'padding-top': '11vh'
    },
    ok_button_container: {
        'position': 'absolute',
        'bottom': '10vh',
    },
    ok_button: {
        'background-image': `url(${system_button_background})`,
        'background-size': '100% 100%',
        'color': color.WHITE,
        'font-size': '1.7vh'
    },
    text_container: {
        'color': color.WHITE,
        'font-size': '1.7vh',
        'line-height': '2'
    }
}));

function MainMenu() {
    const styles = useStyles();
    const dispatch = useDispatch();
    const [is_opening, set_is_opening] = useState(false);
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

    const onClickOk = (e) => {
        set_is_opening(false);
    };

    const onClickAbout = (e) => {
        set_is_opening(true);
    };

    useEffect(() => {
        dispatch(reset_to_default_challenge());
        dispatch(reset_to_default_practices_list());
        dispatch(reset_time());
    });

    return (
        <Grid container item justify={'center'} xs={12} className={styles.root}>
            <Modal open={is_opening}
                   onClose={() => set_is_opening(false)}>
                <Grid container className={styles.pop_up} justify={'center'}>
                    <Grid item className={styles.text_container}>
                        A. This learning game was developed in a bachelor thesis at RWTH Aachen University, by Vu Tuan
                        Tran.
                        The work was supervised, by Lubna Ali, M.Sc. RWTH, Prof. Dr.-Ing. Schroeder, and Univ.-Prof. Dr.
                        rer. nat. Horst Lichter.
                        <br/>
                        <br/>
                        B. In the game, I have used and adapted the following artwork:
                        <br/>
                        1. The main menu background, made by Chivy, original work is published at:
                        https://www.artstation.com/artwork/Ng9yq
                        <br/>
                        2. The challenge background, made by Zanariya, original work is published at:
                        https://www.deviantart.com/zanariya/art/Blacksmith-s-Shop-413036759
                        <br/>
                        3. The leaderboard background, made by gogots, original work is published at:
                        https://www.deviantart.com/gogots/art/Bannire-vide-01-788445292
                        <br/>
                        4. The final sword, made by hu zheng , original work is published at:
                        https://www.artstation.com/artwork/claymore-1bf4e020-a644-47c8-b52f-baa873b102cc
                        <br/>
                        5. The smith, made by Annadel Cinco , original work is published at:
                        https://www.artstation.com/artwork/g6zGm
                        <br/>
                        6. The trunk, made by Jule Ma, original work is published at:
                        https://www.behance.net/gallery/48802895/chests-
                        <br/>
                        I do not own these images. All credit goes to the original authors. For any problem concerning
                        licenses, please contact me via email: vu.tuan.tran@rwth-aachen.de
                    </Grid>
                    <Grid item className={styles.ok_button_container} xs={12}>
                        <Button fullWidth className={styles.ok_button} onClick={onClickOk}>
                            OK
                        </Button>
                    </Grid>
                </Grid>
            </Modal>
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
                <Grid container item justify={'center'}>
                    <Grid item xs={6} md={5}>
                        <Button className={styles.button} fullWidth onClick={onClickAbout}>About</Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default MainMenu;