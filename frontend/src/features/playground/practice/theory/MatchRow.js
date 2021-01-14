import React, {useEffect, useRef} from 'react';
import Grid from "@material-ui/core/Grid";
import DropZone from "./DropZone";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {color} from "../../../../definitions/Types";
import {practice_theory_symbol, practice_lava_frame} from "../../../../images";
import Slide from "@material-ui/core/Slide";

const useStyles = makeStyles((theme) => ({
    root: {
        'height': '150px',
        'margin-top': '30px',
        'background-image': `url(${practice_lava_frame})`,
        'background-size': '100% 100%'
    },
    correct_notification: {
        'background-color': '#AAF38D'
    },
    wrong_notification: {
        'background-color': '#F64A0A'
    },
    symbol: {
        'color': color.NORMAL_TEXT_WHITE,
        'height': '90px',
        'background-image': `url(${practice_theory_symbol})`,
        'background-size': '100% 100%'
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
              className={styles.root}
              ref={matchRow}>
            <Grid container item xs={5} justify={'flex-end'} alignItems={'center'}>
                <Grid container item justify={'center'} alignItems={'center'} xs={10} className={styles.symbol}>
                    {symbol}
                </Grid>
            </Grid>
            <DropZone index={index} swap={swap} description={description} resetColor={resetColor}/>
        </Grid>
    );
};

export default MatchRow;