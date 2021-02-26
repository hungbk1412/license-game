import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Button from '@material-ui/core/Button';
import {navbar_back_button, navbar_setting_button, navbar_logout_button} from "../../images";
import Grid from '@material-ui/core/Grid';
import Setting from "./setting/Setting";
import {makeStyles} from "@material-ui/core/styles";
import {color} from "../../definitions/Types";
import {keycloak} from "../../index";
import {set_current_page} from "../../redux_slices/CurrentPage";

const useStyles = makeStyles((theme) => ({
    root: {
        'position': 'fixed',
        'z-index': 2
    },
    navbar_container: {
        'margin-top': '1vh'
    },
    back_button: {
        'margin-left': '0.5vw',
        'min-width': '0px',
        'width': '2vw',
        'height': '4vh',
        'background-image': `url(${navbar_back_button})`,
        'background-size': '100% 100%'
    },
    logout_button: {
        'margin-right': '0.5vw',
        'min-width': '0px',
        'width': '2vw',
        'height': '4vh',
        'background-image': `url(${navbar_logout_button})`,
        'background-size': '100% 100%'
    },
    setting_button: {
        'min-width': '0px',
        'width': '2vw',
        'height': '4vh',
        'background-image': `url(${navbar_setting_button})`,
        'background-size': '100% 100%'
    },
    player_name: {
        'color': color.WHITE,
        'font-size': '2vh',
        'overflow': 'hidden'
    },
    score_and_time_and_game_type: {
        'color': color.WHITE,
        'font-size': '2vh',
        'font-family': 'Charmonman'
    }
}));


const NavBar = () => {
    const dispatch = useDispatch();
    const current_page = useSelector(state => state.current_page);
    const total_score = useSelector(state => state.score.total_score);
    const elapsed_time = useSelector(state => state.elapsed_time);
    const styles = useStyles();
    // true means open, false means close
    const [settingStatus, setSettingStatus] = useState(false);
    const game_mode = current_page === 'story' || current_page === 'practice' ? current_page : '';
    const handleOpenSetting = () => {
        setSettingStatus(true);
    };

    const handleCloseSetting = () => {
        setSettingStatus(false);
    };

    const click_on_back_button = () => {
        dispatch(set_current_page('main_menu'));
    };

    const logout = () => {
        keycloak.logout();
    };

    return (
        <Grid container item justify={'center'} xs={12} className={styles.root}>
            <Grid container item md={6} className={styles.navbar_container}>
                <Setting settingStatus={settingStatus} handleCloseSetting={handleCloseSetting}/>
                <Grid container item xs={2} justify={'flex-start'}>
                    <Button onClick={() => click_on_back_button()} className={styles.back_button}>
                    </Button>
                </Grid>
                <Grid container item xs={8} justify={'center'}>
                    <Grid container item xs={12} justify={'flex-start'}>
                        <Grid container item xs={3} justify={'flex-start'}>
                            <Grid item className={styles.score_and_time_and_game_type}>
                                Score: {total_score}
                            </Grid>
                        </Grid>
                        <Grid container item xs={5} justify={'flex-start'}>
                            <Grid item className={styles.score_and_time_and_game_type}>
                                Game Mode: {game_mode.toUpperCase()}
                            </Grid>
                        </Grid>
                        <Grid container item xs={4} justify={'flex-start'}>
                            <Grid item className={styles.score_and_time_and_game_type}>
                                Elapsed Time: {elapsed_time}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container item justify={'flex-end'} xs={2}>
                    <Grid container item xs={5} justify={'center'}>
                        <Button onClick={logout} className={styles.logout_button}>
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};


export default NavBar;