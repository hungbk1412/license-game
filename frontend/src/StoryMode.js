import React from 'react';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
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
        }
    },
    question: {
        'margin-top': '50px',
        [theme.breakpoints.up('sm')]: {
            'height': '125px'
        },
        [theme.breakpoints.up('xl')]: {
            'height': '175px'
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
                <Grid container item xs={12} justify={'flex-end'}>
                    <Grid container item xs={10} className={styles.border + ' ' + styles.hints}>Hints</Grid>
                </Grid>
                <Grid container item xs={12} justify={'flex-start'}>
                    <Grid container item xs={7} className={styles.border + ' ' + styles.picture}>Picture</Grid>
                </Grid>
                <Grid container item className={styles.border + ' ' + styles.question} xs={11}>Question</Grid>
                <Grid container item className={styles.choices_container} xs={12} justify={'space-between'}>
                    <Grid container item xs={5} className={styles.border + ' ' + styles.choice} alignItems={'center'}
                          alignContent={'center'}><Grid item>This is sample choice A</Grid></Grid>
                    <Grid container item xs={5} className={styles.border + ' ' + styles.choice}>This is sample choice
                        B</Grid>
                    <Grid container item xs={5} className={styles.border + ' ' + styles.choice}>This is sample choice
                        C</Grid>
                    <Grid container item xs={5} className={styles.border + ' ' + styles.choice}>This is sample choice
                        D</Grid>
                </Grid>
                <Grid container item className={styles.submit_button} xs={12} justify={'center'}>
                    <Button variant={'contained'}>Submit</Button>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default StoryMode;
