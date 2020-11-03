import React from 'react';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import license from './images/licenses/CC_0.png';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
    hint_box: {
        'border': '1px solid black',
        'height': '50px',
        'margin-top': '100px'
    },
    result_box: {
        'border': '1px solid black',
        'height': '75px'
    },
    interact_area: {
        'margin-top': '100px'
    }

});

function StoryMode() {
    const styles = useStyles();
    return (
        <Grid container item direction={'column'} alignItems={'center'}>
            <Grid container item justify={'center'}>
                <Grid container item className={styles.hint_box} xs={8}></Grid>
            </Grid>
            <Grid container item direction={'column'} className={styles.interact_area} spacing={10}>
                <Grid container item justify={'space-around'}>
                    <img src={license} width={'150px'}/>
                    <img src={license} width={'150px'}/>
                </Grid>
                <Grid container item justify={'center'}>
                    <Grid container item className={styles.result_box} xs={2}></Grid>
                </Grid>
                <Grid container item justify={'space-around'}>
                    <img src={license} width={'150px'}/>
                    <img src={license} width={'150px'}/>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default StoryMode;
