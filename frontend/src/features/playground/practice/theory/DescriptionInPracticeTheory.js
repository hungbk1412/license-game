import React from 'react';
import Grid from "@material-ui/core/Grid";
import {useDrag} from "react-dnd";
import {itemTypes, color} from "../../../../definitions/Types";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {practice_theory_description} from "../../../../images";

const useStyles = makeStyles((theme) => ({
    root: {
        'color': color.NORMAL_TEXT_WHITE,
        'height': '90px',
        'text-align': 'center',
        'background-image': `url(${practice_theory_description})`,
        'background-size': '100% 100%',
        'padding-left': '25px',
        'padding-right': '25px'
    }
}));

const DescriptionInPracticeTheory = (props) => {
    const description = props.description;
    const styles = useStyles();
    const [{isDragging}, drag] = useDrag({
        item: {
            type: itemTypes.PRACTICE_THEORY,
            position: props.position
        },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    });

    return (
        <Grid container item justify={'center'} alignItems={'center'} xs={11} ref={drag} className={styles.root}>
            {description}
        </Grid>
    );
};

export default DescriptionInPracticeTheory;