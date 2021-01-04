import React from 'react';
import DescriptionInPracticeTheory from "./DescriptionInPracticeTheory";
import Grid from "@material-ui/core/Grid";
import {useDrop} from "react-dnd";
import {itemTypes} from "../../../definitions/Types";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({

}));

const DropZone = (props) => {
    const styles = useStyles();
    const index = props.index;
    const description = props.description;
    const swap = props.swap;
    const resetColor = props.resetColor;

    const [{isOver}, drop] = useDrop({
        accept: itemTypes.PRACTICE_THEORY,
        drop: (item, monitor) => {
            swap(item.position, index);
            resetColor();
        },
        collect: monitor => ({
            isOver: !!monitor.isOver()
        })
    });

    return (
        <Grid container item xs={7} ref={drop} justify={'flex-start'} alignItems={'center'}>
            <DescriptionInPracticeTheory description={description} position={index}/>
        </Grid>
    );
};

export default DropZone;