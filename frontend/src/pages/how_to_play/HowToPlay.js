import React from "react";
import {main_background, how_to_play, system_button_background} from "../../images";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import {color} from "../../definitions/Types";
import Button from "@material-ui/core/Button";
const useStyles = makeStyles((theme) => ({
    root: {
        'position': 'absolute',
        'height': '100%',
        'background-image': `url(${main_background})`,
        'background-size': '100% 100%'
    },
    how_to_play_container: {
        'height': '75vh',
        'background-image': `url(${how_to_play})`,
        'background-size': '100% 100%'
    },
    header_container: {
        'margin-top': '3vh'
    },
    header: {
        'color': color.BROWN,
        'font-size': '3.5vh',
        'font-family': 'Charmonman'
    },
    button_container: {
        'position': 'absolute',
        'bottom': '5vh'
    },
    button: {
        'width': '10vw',
        'height': '5vh',
        'background-image': `url(${system_button_background})`,
        'background-size': '100% 100%'
    }
}));

const HowToPlay = () => {
    const styles = useStyles();
    return (
        <Grid container item xs={12} justify={'center'} alignItems={'center'} className={styles.root}>
            <Grid container item xs={8} className={styles.how_to_play_container} justify={'center'}>
                <Grid container item xs={12} justify={'center'} className={styles.header_container}>
                    <Grid item className={styles.header}>Game Rules</Grid>
                </Grid>
                <Grid container item xs={4} className={styles.button_container} justify={'center'}>
                    <Button className={styles.button}>
                        To Main Menu
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    )
};

export default HowToPlay;