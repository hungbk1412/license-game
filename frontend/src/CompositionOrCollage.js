import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ArcadeMode from "./ArcadeMode";
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
    const [mode, setMode] = useState('');

    const clickOnComposition = () => {
        setMode('composition');
    };

    const clickOnCollage = () => {
        setMode('collage');
    };

    if (mode === 'composition') {
        return (
            <ArcadeMode mode={'composition'}/>
        )
    } else if (mode === 'collage') {
        return (
            <ArcadeMode mode={'collage'}/>
        )
    } else {
        return (
            <Grid container item direction={'column'} justify={'space-around'} className={styles.h}>
                <Grid container item justify={'center'} className={styles.text_pos}>
                    <Grid item>
                        <p>Do you want to create a composition or a collage?</p>
                    </Grid>
                </Grid>
                <Grid container item justify={'space-around'} className={styles.button_pos}>
                    <Grid item xs={2}>
                        <Button variant={'contained'} onClick={clickOnComposition} fullWidth>Composition</Button>
                    </Grid>
                    <Grid item xs={2}>
                        <Button variant={'contained'} onClick={clickOnCollage} fullWidth>Collage</Button>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
};

export default CompositionOrCollage;