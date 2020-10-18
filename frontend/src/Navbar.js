import React from 'react';
import { useHistory } from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Grid from '@material-ui/core/Grid';

const Navbar = () => {
    let history = useHistory();
    const click_on_back_button = () => {
        history.push('/')
    };

    return (
        <Grid container item>
            <Grid container item xs={6} justify={'flex-start'}>
                <IconButton onClick={() => click_on_back_button()}>
                    <ArrowBackIcon/>
                </IconButton>
            </Grid>
            <Grid container item justify={'flex-end'} xs={6}>
                <Grid item>
                    <p>Max Musterman</p>
                </Grid>
                <Grid item>
                    <IconButton aria-label="delete">
                        <SettingsIcon/>
                    </IconButton>
                </Grid>
                <Grid item>
                    <IconButton aria-label="delete">
                        <ExitToAppIcon/>
                    </IconButton>
                </Grid>
            </Grid>
        </Grid>
    );

};


export default Navbar;