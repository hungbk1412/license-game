import React, {useEffect, useRef} from 'react';
import Grid from "@material-ui/core/Grid";
import DropZone from "./DropZone";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    b: {
        'border': '1px solid black'
    },
    match_row: {
        'margin-top': '80px'
    },
    correct_notification: {
        'background-color': '#AAF38D'
    },
    wrong_notification: {
        'background-color': '#F64A0A'
    }
}));

const MatchRow = (props) => {
    const styles = useStyles();
    const symbol = props.symbol;
    const description = props.description;
    const index = props.index;
    const color = props.color;
    const matchRow = useRef(null);
    const swap = props.swap;
    const resetColor = props.resetColor;

    useEffect(() => {
        if (color === 'green') {
            matchRow.current.classList.add(styles.correct_notification);
        } else if (color === 'red') {
            matchRow.current.classList.add(styles.wrong_notification);
        } else if (color === 'none') {
            matchRow.current.classList.remove(styles.correct_notification);
            matchRow.current.classList.remove(styles.wrong_notification);
        }
    });
    return (
        <Grid container item xs={12}
              className={styles.match_row}
              ref={matchRow}>
            <Grid container item xs={6} className={styles.b}>
                <Grid container item justify={'flex-start'} xs={6}>
                    {symbol}
                </Grid>
            </Grid>
            <DropZone index={index} swap={swap} description={description} resetColor={resetColor}/>
        </Grid>
    );
};

export default MatchRow;