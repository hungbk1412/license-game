import React from 'react';
import Grid from "@material-ui/core/Grid";
import {useDrag} from "react-dnd";
import {itemTypes, color} from "../../../Types";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    description: {
        'color': color.NORMAL_TEXT_WHITE
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
        <Grid container item justify={'flex-start'} xs={10} ref={drag} className={styles.description}>
            {description}
        </Grid>
    );
};

export default DescriptionInPracticeTheory;