import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from "@material-ui/core/styles";
import {Redirect} from 'react-router-dom';

const useStyle = makeStyles({
    text_pos: {
        'margin-top': '150px'
    },
    button_pos: {
        'margin-top': '300px'
    }
});


const CompositionOrCollage = () => {
    const styles = useStyle();
    return (
        <Grid container item direction={'column'} justify={'space-around'} className={styles.h}>
            <Grid container item justify={'center'} className={styles.text_pos}>
                <Grid item>
                    <p>Do you want to create a composition or a collage?</p>
                </Grid>
            </Grid>
            <Grid container item justify={'space-around'} className={styles.button_pos}>
                <Grid item xs={2}>
                    <Button variant={'contained'} fullWidth >Composition</Button>
                </Grid>
                <Grid item xs={2}>
                    <Button variant={'contained'} fullWidth >Collage</Button>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default CompositionOrCollage;