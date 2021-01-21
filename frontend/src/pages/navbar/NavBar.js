import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import Button from '@material-ui/core/Button';
import {navbar_back_button, navbar_setting_button, navbar_logout_button} from "../../images";
import Grid from '@material-ui/core/Grid';
import Setting from "./setting/Setting";
import {makeStyles} from "@material-ui/core/styles";
import {color} from "../../definitions/Types";
import {keycloak} from "../../index";
import jwt_decode from 'jwt-decode';

const useStyles = makeStyles((theme) => ({
    root: {
        'position': 'fixed'
    },
    navbar_container: {
        'margin-top': '10px'
    },
    back_button: {
        'margin-left': '10px',
        'min-width': '0px',
        'width': '35px',
        'height': '35px',
        'background-image': `url(${navbar_back_button})`,
        'background-size': '100% 100%'
    },
    logout_button: {
        'margin-right': '10px',
        'min-width': '0px',
        'width': '35px',
        'height': '35px',
        'background-image': `url(${navbar_logout_button})`,
        'background-size': '100% 100%'
    },
    setting_button: {
        'min-width': '0px',
        'width': '35px',
        'height': '35px',
        'background-image': `url(${navbar_setting_button})`,
        'background-size': '100% 100%'
    },
    player_name: {
        'color': color.NORMAL_TEXT_WHITE,
        'font-size': '20px'
    },
    score_and_time: {
        'color': color.NORMAL_TEXT_WHITE,
        'font-size': '20px'
    }
}));


const NavBar = () => {
    let history = useHistory();
    const total_score = useSelector(state => state.score.total_score);
    const elapsed_time = useSelector(state => state.elapsed_time);
    const decoded_token = jwt_decode(window.accessToken);
    const styles = useStyles();
    // true means open, false means close
    const [settingStatus, setSettingStatus] = useState(false);

    const handleOpenSetting = () => {
        setSettingStatus(true);
    };

    const handleCloseSetting = () => {
        setSettingStatus(false);
    };

    const click_on_back_button = () => {
        history.push('/');
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
                    <Grid container item xs={6} justify={'space-around'}>
                        <Grid item className={styles.score_and_time}>
                            Score: {total_score}
                        </Grid>
                        <Grid item className={styles.score_and_time}>
                            Elapsed Time: {elapsed_time}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container item justify={'flex-end'} xs={2}>
                    <Grid container item justify={'space-between'} xs={12}>
                        <Grid item className={styles.player_name}>
                            {decoded_token.preferred_username}
                        </Grid>
                        <Grid item>
                            <Button onClick={handleOpenSetting} className={styles.setting_button}>
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button onClick={logout} className={styles.logout_button}>
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};


export default NavBar;