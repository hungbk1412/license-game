import React from 'react';
import Grid from "@material-ui/core/Grid";
import {useDrag} from "react-dnd";
import {itemTypes} from "../../../Types";

const DescriptionInPracticeTheory = (props) => {
    const description = props.description;

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
        <Grid container item justify={'flex-start'} xs={10} ref={drag}>
            {description}
        </Grid>
    );
};

export default DescriptionInPracticeTheory;