import React from 'react';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    border: {
        'border': '1px solid black'
    },
    picture_and_hints: {
        'margin-top': '65px',
        [theme.breakpoints.up('sm')]: {
            'height': '350px'
        },
        [theme.breakpoints.up('xl')]: {
            'height': '500px'
        }
    },
    picture: {},
    hints: {},
    question: {
        'margin-top': '50px',
        [theme.breakpoints.up('sm')]: {
            'height': '100px'
        },
        [theme.breakpoints.up('xl')]: {
            'height': '150px'
        }
    },
    choices_container: {
        [theme.breakpoints.up('sm')]: {
            'height': '100px'
        },
        [theme.breakpoints.up('xl')]: {
            'height': '150px'
        }
    },
    choice: {
        'margin-top': '35px',
        [theme.breakpoints.up('sm')]: {
            'height': '50px'
        },
        [theme.breakpoints.up('xl')]: {
            'height': '75px'
        }
    }

}));

function StoryMode() {
    const styles = useStyles();
    return (
        <Grid container item direction={'row'} justify={'center'} alignItems={'center'}>
            <Grid container item direction={'row'} justify={'center'} xs={10}>
                <Grid container item direction={'row'} justify={'space-between'} className={styles.picture_and_hints}>
                    <Grid container item xs={7} className={styles.border}>A</Grid>
                    <Grid container item xs={3} className={styles.border}>B</Grid>
                </Grid>
                <Grid container item className={styles.border + ' ' + styles.question} xs={11}>C</Grid>
                <Grid container item className={styles.choices_container} xs={12} justify={'space-between'}>
                    <Grid contain item xs={5} className={styles.border + ' ' + styles.choice} alignItems={'center'}
                          alignContent={'center'}><Grid item>This is sample choice A</Grid></Grid>
                    <Grid contain item xs={5} className={styles.border + ' ' + styles.choice}>This is sample choice
                        B</Grid>
                    <Grid contain item xs={5} className={styles.border + ' ' + styles.choice}>This is sample choice
                        C</Grid>
                    <Grid contain item xs={5} className={styles.border + ' ' + styles.choice}>This is sample choice
                        D</Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default StoryMode;
