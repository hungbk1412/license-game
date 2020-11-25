import React from 'react';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {blacksmith_image, iron_ore} from "./images";

const useStyles = makeStyles((theme) => ({
    border: {
        'border': '1px solid black'
    },
    hints: {
        'margin-top': '50px',
        [theme.breakpoints.up('sm')]: {
            'height': '120px'
        },
        [theme.breakpoints.up('xl')]: {
            'height': '150px'
        }
    },
    picture: {
        'margin-top': '35px',
        [theme.breakpoints.up('sm')]: {
            'height': '200px'
        },
        [theme.breakpoints.up('xl')]: {
            'height': '300px'
        },
        'background-color': 'black'
    },
    question: {
        'margin-top': '50px',
        'padding-left': '10px',
        'padding-right': '10px',
        [theme.breakpoints.up('sm')]: {
            'height': '125px'
        },
        [theme.breakpoints.up('xl')]: {
            'height': '175px'
        }
    },
    choice: {
        'margin-top': '35px',
        'padding-left': '10px',
        'padding-right': '10px',
        [theme.breakpoints.up('sm')]: {
            'height': '50px'
        },
        [theme.breakpoints.up('xl')]: {
            'height': '75px'
        }
    },
    images: {
        'max-width': '95%',
        'max-height': '95%'
    },
    submit_button: {
        'margin-top': '20px'
    }

}));

function StoryMode() {
    const styles = useStyles();
    return (
        <Grid container item direction={'row'} justify={'center'} alignItems={'center'}>
            <Grid container item direction={'row'} justify={'center'} xs={10}>
                <Grid container item xs={12} justify={'flex-end'}>
                    <Grid container item xs={10} className={styles.border + ' ' + styles.hints} alignItems={'center'}
                          justify={'center'}>Nowadays, swords are often made from steel</Grid>
                </Grid>
                <Grid container item xs={12} justify={'flex-start'}>
                    <Grid container item xs={7} className={styles.border + ' ' + styles.picture} justify={'center'}
                          alignItems={'center'}>
                        <img className={styles.images} src={iron_ore}/>
                    </Grid>
                    <Grid container item xs={5}>
                        <img className={styles.images} src={blacksmith_image}/>
                    </Grid>
                </Grid>
                <Grid container item className={styles.border + ' ' + styles.question} justify={'center'}
                      alignItems={'center'} xs={11}>Steel is an alloy of carbon and a mysterious metal X. Given that X
                    is associated with a CC license, which does not allow any commercial usages. What is X?</Grid>
                <Grid container item xs={12} justify={'space-between'}>
                    <Grid container item xs={5} className={styles.choice}><Button variant={'contained'} fullWidth>Iron (CC-BY-NC)</Button></Grid>
                    <Grid container item xs={5} className={styles.choice}><Button variant={'contained'} fullWidth>Copper (CC-BY-ND)</Button></Grid>
                    <Grid container item xs={5} className={styles.choice}><Button variant={'contained'} fullWidth>Aluminium (CC-BY)</Button></Grid>
                    <Grid container item xs={5} className={styles.choice}><Button variant={'contained'} fullWidth>Zinc (CC-ZERO)</Button></Grid>
                </Grid>
                <Grid container item className={styles.submit_button} xs={12} justify={'center'}>
                    <Button color={"primary"} variant={'contained'}>Next Level</Button>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default StoryMode;
