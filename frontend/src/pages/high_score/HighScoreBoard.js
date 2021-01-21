import React from 'react';
import Grid from "@material-ui/core/Grid";
import {useSelector} from "react-redux";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {color} from "../../definitions/Types";

const useStyles = makeStyles({
    root: {
      'margin-top': '150px'
    },
    row: {
      'margin-top': '50px'
    },
    header: {
        color: color.NORMAL_TEXT_WHITE,
        'font-size': '40px'
    },
    position: {
        color: color.NORMAL_TEXT_WHITE,
        'font-size': '20px'
    },
    user_name: {
        color: color.NORMAL_TEXT_WHITE,
        'font-size': '20px'
    },
    score: {
        color: color.NORMAL_TEXT_WHITE,
        'font-size': '20px'
    }
});
const HighScoreBoard = () => {
    const high_score_board = useSelector(state => state.high_score_board);
    const styles = useStyles();
    return (
        <Grid container item direction={'column'} xs={4} className={styles.root}>
            <Grid container item className={styles.header} justify={'center'}>
                High Score
            </Grid>
            <Grid container item className={styles.row} justify={'space-between'}>
                <Grid item className={styles.position}>
                    Rank
                </Grid>
                <Grid item className={styles.user_name}>
                    Player
                </Grid>
                <Grid item className={styles.score}>
                    Score
                </Grid>
            </Grid>
            {
                high_score_board.map(elem => {
                    return (
                        <Grid container item key={'high-score-board-' + elem.position} className={styles.row} justify={'space-between'}>
                            <Grid item className={styles.position}>
                                {elem.position + 1}
                            </Grid>
                            <Grid item className={styles.user_name}>
                                {elem.user}
                            </Grid>
                            <Grid item className={styles.score}>
                                {elem.score}
                            </Grid>
                        </Grid>
                    )
                })
            }
        </Grid>
    );
};

export default HighScoreBoard;