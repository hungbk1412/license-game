import React from 'react';
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import badge from './badge.png';
const useStyles = makeStyles({
    root: {
        'border-bottom': '1px solid black',
        'margin-top': '20px'
    }
});
const Achievement = () => {
    const styles = useStyles();
    return (
        <Grid container item className={styles.root}>
            <Grid container item xs={6} justify={'flex-start'}>
                <p>Creation of the first picture</p>
            </Grid>
            <Grid container item xs={6} justify={'flex-end'}>
                <img src={badge} width={'50px'}/>
            </Grid>
        </Grid>
    );
};

export default Achievement;