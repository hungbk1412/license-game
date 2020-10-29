import React from 'react';
import Grid from '@material-ui/core/Grid';
import license from './CC0.png';
import resource from './audio-CC-BY-NC.png';
import ItemTypes from "./ItemTypes";
import {useDrag} from 'react-dnd';

const ResourceInArcade = (props) => {

    const [{ isDragging }, drag] = useDrag({
        item: {
            type: ItemTypes.ARCADE_RESOURCE,
            resource_id: props.id
        },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    });

    return (
        <Grid id={props.id} container item direction={'column'} alignItems={'center'} ref={drag} style={{width: props.width}}>
            <Grid item>
                <img src={resource} width={props.width}/>
            </Grid>
            <Grid item>
                <img src={license} width={props.width}/>
            </Grid>
        </Grid>
    );
};

export default ResourceInArcade;