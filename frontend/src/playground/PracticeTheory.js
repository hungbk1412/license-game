import React, {useState, useEffect} from 'react';
import lodash from 'lodash';
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import FiberManualRecordOutlinedIcon from '@material-ui/icons/FiberManualRecordOutlined';
import {practiceTheoryGenerator} from "../game_generator/Practice";
import PracticeTheoryCanvas from "./PracticeTheoryCanvas";
import StoryMode from "./StoryMode";
import {practiceTypes} from "../Types";

const useStyles = makeStyles((theme) => ({
    b: {
        'border': '1px solid black'
    },
    hint_box: {
        [theme.breakpoints.up('sm')]: {
            'border': '1px solid black',
            'height': '50px',
            'margin-top': '50px'
        },
        [theme.breakpoints.up('xl')]: {
            'border': '1px solid black',
            'height': '50px',
            'margin-top': '50px'
        }
    },
    match_row: {
        'margin-top': '80px'
    },
    buttons: {
        'margin-top': '100px'
    },
    connecting_dot: {
        'transform': 'scale(0.5)'
    }
}));

function PracticeTheory(props) {
    const styles = useStyles();
    const practice = props.practice;
    const helper_array = [...Array(practice.numberOfMatches).keys()];
    const finishPractice = props.finishPractice;

    const clickOnSkip = (e) => {
        e.preventDefault();
        finishPractice(props.practice_id);
    };
    return (
        <Grid container item direction={'row'} justify={'center'} xs={10}>
            <PracticeTheoryCanvas/>
            <Grid container item direction={'row'} className={styles.hint_box} xs={10} justify={'center'}
                  alignItems={'center'}>
                <Grid item>Match the CC licences with the corresponding definitions</Grid>
            </Grid>
            <Grid container item direction={'row'}>
                {
                    helper_array.map(index => {
                        return (
                            <Grid container item xs={12}
                                  key={practice.symbols[index] + '_' + practice.meanings[index]}
                                  className={styles.match_row}>
                                <Grid container item xs={6}>
                                    <Grid container item justify={'flex-start'} xs={6}>
                                        {practice.symbols[index]}
                                    </Grid>
                                    <Grid container item justify={'flex-start'} xs={6}>
                                        <FiberManualRecordOutlinedIcon fontSize={'small'}
                                                                       className={styles.connecting_dot}/>
                                    </Grid>
                                </Grid>
                                <Grid container item xs={6}>
                                    <Grid container item justify={'flex-start'} xs={2}>
                                        <FiberManualRecordOutlinedIcon fontSize={'small'}
                                                                       className={styles.connecting_dot}/>
                                    </Grid>
                                    <Grid container item justify={'flex-start'} xs={10}>
                                        {practice.meanings[index]}
                                    </Grid>
                                </Grid>
                            </Grid>
                        );
                    })
                }
            </Grid>
            <Grid container item xs={12} justify={'space-around'} className={styles.buttons}>
                <Grid container item xs={3} justify={'center'}>
                    <Button variant={"contained"} fullWidth color={"primary"}>Submit</Button>
                </Grid>
                <Grid container item xs={3} justify={'center'}>
                    <Button variant={"contained"} fullWidth onClick={clickOnSkip}>Skip</Button>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default PracticeTheory;