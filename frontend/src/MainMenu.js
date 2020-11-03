import React, {useState} from 'react';
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';
import {makeStyles} from "@material-ui/core/styles";
import  { Redirect } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
        margin: '100px 0px 100px 0px',
        width: '100%'
    }
});

function MainMenu(props) {
    const styles = useStyles();
    const [to_arcade, set_to_arcade] = useState(false);
    const [to_story, set_to_story] = useState(false);
    const [to_instruction, set_to_instruction] = useState(false);
    const [to_achievements, set_to_achievements] = useState(false);
    const onClickArcade = () => {
        set_to_arcade(true)
    };

    const onClickStory = (props) => {
        set_to_story(true)
    };

    const onClickHowToPlay = (props) => {
        set_to_instruction(true)
    };

    const onClickMyAchievements = (props) => {
        set_to_achievements(true)
    };

    if (to_arcade) {
        return (
            <Redirect to={'/arcade'}/>
        )
    } else if (to_story) {
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
            <Grid container direction={'column'} spacing={10} className={styles.root}>
                <Grid container item justify={'center'}>
                    <Grid item xs={6} md={2}>
                        <Button variant={'contained'} fullWidth onClick={onClickArcade}>Arcade</Button>
                    </Grid>
                </Grid>
                <Grid container item justify={'center'}>
                    <Grid item xs={6} md={2}>
                        <Button variant={'contained'} fullWidth onClick={onClickStory}>Story Mode</Button>
                    </Grid>
                </Grid>
                <Grid container item justify={'center'}>
                    <Grid item xs={6} md={2}>
                        <Button variant={'contained'} fullWidth onClick={onClickHowToPlay}>How To Play</Button>
                    </Grid>
                </Grid>
                <Grid container item justify={'center'}>
                    <Grid item xs={6} md={2}>
                        <Button variant={'contained'} fullWidth onClick={onClickMyAchievements}>My Achievements</Button>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default MainMenu;