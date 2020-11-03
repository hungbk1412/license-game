import React, {useState} from 'react';
import {useHistory} from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core/styles";
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles({
    pop_up: {
        'position': 'absolute',
        'width': '300px',
        'height': '150px',
        'top': '50%',
        'left': '50%',
        'transform': 'translate(-50%,-50%)',
        'padding-top': '30px',
        'padding-left': '10px'
    },
    user_name: {

    }
});
const NavBar = () => {
    let history = useHistory();
    const styles = useStyles();
    const [openSetting, setOpenSetting] = useState(false);
    const [gameSound, setGameSound] = useState(true);
    const [gameMusic, setGameMusic] = useState(true);

    const handleOpenSetting = () => {
        setOpenSetting(true);
    };

    const handleCloseSetting = () => {
        setOpenSetting(false);
    };
    const click_on_back_button = () => {
        history.push('/')
    };

    return (
        <Grid container item>
            <Modal open={openSetting}
                   onClose={handleCloseSetting}
                   aria-labelledby="simple-modal-title"
                   aria-describedby="simple-modal-description">
                <Paper className={styles.pop_up}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Sound</FormLabel>
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox checked={gameSound} onChange={() => setGameSound(!gameSound)} name="gilad" />}
                                label={'Game Sound'}
                            />
                            <FormControlLabel
                                control={<Checkbox checked={gameMusic} onChange={() => setGameMusic(!gameMusic)} name="jason" />}
                                label={'Game Music'}
                            />
                        </FormGroup>
                    </FormControl>
                </Paper>
            </Modal>
            <Grid container item xs={6} justify={'flex-start'}>
                <IconButton onClick={() => click_on_back_button()}>
                    <ArrowBackIcon/>
                </IconButton>
            </Grid>
            <Grid container item justify={'flex-end'} xs={6}>
                <Grid item>
                    <div className={styles.user_name}>Max Musterman</div>
                </Grid>
                <Grid item>
                    <IconButton onClick={handleOpenSetting}>
                        <SettingsIcon/>
                    </IconButton>
                </Grid>
                <Grid item>
                    <IconButton>
                        <ExitToAppIcon/>
                    </IconButton>
                </Grid>
            </Grid>
        </Grid>
    );
};


export default NavBar;