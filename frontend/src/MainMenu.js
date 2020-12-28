import React, {useState} from 'react';
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';
import {makeStyles} from "@material-ui/core/styles";
import {Redirect} from 'react-router-dom';
import {menu_button_background} from "./images";
import Slide from '@material-ui/core/Slide';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: '100px 0px 100px 0px',
        width: '100%'
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
    const [to_story, set_to_story] = useState(false);
    const [to_instruction, set_to_instruction] = useState(false);
    const [to_achievements, set_to_achievements] = useState(false);
    const [checked, setChecked] = useState(true);

    const onClickStory = () => {
        set_to_story(true);
        setChecked(!checked);
    };

    const onClickHowToPlay = () => {
        set_to_instruction(true)
    };

    const onClickMyAchievements = () => {
        set_to_achievements(true)
    };

    if (to_story) {
        return (
            <Redirect to={'/story'}/>
        )
    } else if (to_instruction) {
        return (
            <Redirect to={'/instruction'}/>
        )
    } else if (to_achievements) {
        return (
            <Redirect to={'/achievements'}/>
        )
    } else {
        return (
            <Slide direction="up" in={checked} mountOnEnter unmountOnExit>
                <Grid container direction={'column'} spacing={10} className={styles.root}>
                    <Grid container item justify={'center'}>
                        <Grid item xs={6} md={3}>
                            <Button className={styles.button} fullWidth onClick={onClickStory}>Play</Button>
                        </Grid>
                    </Grid>
                    <Grid container item justify={'center'}>
                        <Grid item xs={6} md={3}>
                            <Button className={styles.button} fullWidth onClick={onClickHowToPlay}>How To Play</Button>
                        </Grid>
                    </Grid>
                    <Grid container item justify={'center'}>
                        <Grid item xs={6} md={3}>
                            <Button className={styles.button} fullWidth onClick={onClickMyAchievements}>My
                                Achievements</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Slide>
        );
    }
}

export default MainMenu;