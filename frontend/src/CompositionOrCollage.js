import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PracticeMode from "./PracticeMode";
import {makeStyles} from "@material-ui/core/styles";
import {menu_button_background} from "./images";

const useStyle = makeStyles({
    text_pos: {
        'margin-top': '150px'
    },
    button_pos: {
        'margin-top': '300px'
    },
    button: {
        'height': '90px',
        'font-size': '20px',
        'background-image': `url(${menu_button_background})`,
        'background-size': '100% 100%'
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
            <PracticeMode mode={'composition'}/>
        )
    } else if (mode === 'collage') {
        return (
            <PracticeMode mode={'collage'}/>
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
                        <Button className={styles.button} onClick={clickOnComposition} fullWidth>Composition</Button>
                    </Grid>
                    <Grid item xs={2}>
                        <Button className={styles.button} onClick={clickOnCollage} fullWidth>Collage</Button>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
};

export default CompositionOrCollage;