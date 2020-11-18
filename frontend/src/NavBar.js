import React, {useState} from 'react';
import {useHistory} from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Grid from '@material-ui/core/Grid';
import SettingMenu from "./SettingMenu";

const NavBar = () => {
    let history = useHistory();
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
        <Grid container item>
            <SettingMenu settingStatus={settingStatus} handleCloseSetting={handleCloseSetting}/>
            <Grid container item xs={6} justify={'flex-start'}>
                <IconButton onClick={() => click_on_back_button()}>
                    <ArrowBackIcon color={'secondary'}/>
                </IconButton>
            </Grid>
            <Grid container item justify={'flex-end'} xs={6}>
                <Grid item>
                    <div>Max Musterman</div>
                </Grid>
                <Grid item>
                    <IconButton onClick={handleOpenSetting}>
                        <SettingsIcon color={'secondary'}/>
                    </IconButton>
                </Grid>
                <Grid item>
                    <IconButton>
                        <ExitToAppIcon color={'secondary'}/>
                    </IconButton>
                </Grid>
            </Grid>
        </Grid>
    );
};


export default NavBar;