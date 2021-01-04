import React, {useState} from 'react';
import {useHistory} from "react-router-dom";
import Button from '@material-ui/core/Button';
import {navbar_back_button, navbar_setting_button, navbar_logout_button} from "./images";
import Grid from '@material-ui/core/Grid';
import SettingMenu from "./SettingMenu";
import {makeStyles} from "@material-ui/core/styles";
import {color} from "./definitions/Types";

const useStyles = makeStyles((theme) => ({
    root: {
      'margin-top': '10px'
    },
    back_button: {
        'margin-left': '5px',
        'min-width': '0px',
        'width': '30px',
        'height': '30px',
        'background-image': `url(${navbar_back_button})`,
        'background-size': '100% 100%'
    },
    logout_button: {
        'margin-right': '5px',
        'min-width': '0px',
        'width': '30px',
        'height': '30px',
        'background-image': `url(${navbar_logout_button})`,
        'background-size': '100% 100%'
    },
    setting_button: {
        'min-width': '0px',
        'width': '30px',
        'height': '30px',
        'background-image': `url(${navbar_setting_button})`,
        'background-size': '100% 100%'
    },
    player_name: {
        color: color.NORMAL_TEXT_WHITE
    }
}));


const NavBar = () => {
    let history = useHistory();
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

    return (
        <Grid container item className={styles.root}>
            <SettingMenu settingStatus={settingStatus} handleCloseSetting={handleCloseSetting}/>
            <Grid container item xs={6} justify={'flex-start'}>
                <Button onClick={() => click_on_back_button()} className={styles.back_button}>
                </Button>
            </Grid>
            <Grid container item justify={'flex-end'} xs={6}>
                <Grid container item justify={'space-between'} xs={6}>
                    <Grid item className={styles.player_name}>
                        Max Musterman
                    </Grid>
                    <Grid item>
                        <Button onClick={handleOpenSetting} className={styles.setting_button}>
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button className={styles.logout_button}>
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};


export default NavBar;