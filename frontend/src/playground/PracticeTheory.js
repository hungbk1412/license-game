import React, {useState} from 'react';
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import FiberManualRecordOutlinedIcon from '@material-ui/icons/FiberManualRecordOutlined';
import practiceGenerator from "../challenge_generator/Practice";
import PracticeTheoryCanvas from "./PracticeTheoryCanvas";

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
        'margin-top': '40px'
    },
    submit_button: {
        'margin-top': '40px'
    },
    connecting_dot: {
        'transform': 'scale(0.5)'
    }
}));

function PracticeTheory(props) {
    const styles = useStyles();
    const [{symbols, meanings, numberOfMatches}] = useState(practiceGenerator(props.practiceLevel));
    const helper_array = [...Array(numberOfMatches).keys()];

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
                            <Grid container item xs={12} key={symbols[index] + '_' + meanings[index]}
                                  className={styles.match_row}>
                                <Grid container item xs={6}>
                                    <Grid container item justify={'flex-start'} xs={6}>
                                        {symbols[index]}
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
                                        {meanings[index]}
                                    </Grid>
                                </Grid>
                            </Grid>
                        );
                    })
                }
            </Grid>
            <Grid container item xs={12} justify={'center'} className={styles.submit_button}>
                <Button variant={"contained"} color={"primary"}>Submit</Button>
            </Grid>
        </Grid>
    )
}

export default PracticeTheory;