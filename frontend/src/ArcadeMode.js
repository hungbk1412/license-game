import React from 'react';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import license from './CC0.png';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
    result_box: {
        'border': '1px solid black',
        'height': '200px',
        'margin-top': '100px'
    },
    submit_button: {
        'margin-top': '100px'
    }
});

function ArcadeMode() {
    const styles = useStyles();
    return (
        <Grid container item direction={'column'} spacing={10}>
            <Grid container item justify={'center'}>
                <Grid container item className={styles.result_box} xs={8}/>
            </Grid>
            <Grid container item spacing={4}>
                <Grid container item xs={3} justify={'center'}>
                    <img src={license} width={'150px'}/>
                </Grid>
                <Grid container item xs={3} justify={'center'}>
                    <img src={license} width={'150px'}/>
                </Grid>
                <Grid container item xs={3} justify={'center'}>
                    <img src={license} width={'150px'}/>
                </Grid>
                <Grid container item xs={3} justify={'center'}>
                    <img src={license} width={'150px'}/>
                </Grid>
                <Grid container item xs={3} justify={'center'}>
                    <img src={license} width={'150px'}/>
                </Grid>
                <Grid container item xs={3} justify={'center'}>
                    <img src={license} width={'150px'}/>
                </Grid>
                <Grid container item xs={3} justify={'center'}>
                    <img src={license} width={'150px'}/>
                </Grid>
                <Grid container item xs={3} justify={'center'}>
                    <img src={license} width={'150px'}/>
                </Grid>
            </Grid>
            <Grid container item justify={'center'} className={styles.submit_button}>
                <Grid item xs={3}>
                    <Button variant={'contained'} fullWidth>Submit</Button>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default ArcadeMode;
