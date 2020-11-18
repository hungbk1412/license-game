import React from 'react';
import Grid from '@material-ui/core/Grid';
import ItemTypes from "./ItemTypes";
import {useDrag} from 'react-dnd';
import CancelIcon from '@material-ui/icons/Cancel';
import IconButton from '@material-ui/core/IconButton';
import makeStyles from "@material-ui/core/styles/makeStyles";
import {
    CC_0,
    CC_BY,
    CC_BY_SA,
    CC_BY_NC,
    CC_BY_NC_ND,
    CC_BY_NC_SA,
    CC_BY_ND,
    audio,
    document,
    picture,
    video
} from './images';

const useStyles = makeStyles({
    close_button: {
        'position': 'absolute',
        'top': '-20px',
        'right': '-25px',
        'background': 'red',
        'color': 'white',
        'transform': 'scale(0.5)'
    },
    container: {
        'position': 'relative'
    }
});
const ResourceInArcade = (props) => {
    const styles = useStyles();
    let resource_type;
    let license;
    switch (props.license) {
        case 'CC_0':
            license = CC_0;
            break;
        case 'CC_BY':
            license = CC_BY;
            break;
        case 'CC_BY_SA':
            license = CC_BY_SA;
            break;
        case 'CC_BY_NC':
            license = CC_BY_NC;
            break;
        case 'CC_BY_NC_SA':
            license = CC_BY_NC_SA;
            break;
        case 'CC_BY_ND':
            license = CC_BY_ND;
            break;
        case 'CC_BY_NC_ND':
            license = CC_BY_NC_ND;
            break;
        default:
            break;
    }

    switch (props.resource_type) {
        case 'audio':
            resource_type = audio;
            break;
        case 'document':
            resource_type = document;
            break;
        case 'picture':
            resource_type = picture;
            break;
        case 'video':
            resource_type = video;
            break;
        default:
            break;
    }

    const [{isDragging}, drag] = useDrag({
        item: {
            type: ItemTypes.PRACTICE_RESOURCE,
            resource_id: props.resource_id
        },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    });

    if (props.display_remove_button) {
        return (
            <Grid container item direction={'column'} alignItems={'center'} ref={drag}
                  style={{width: props.width}}
                  xs={3}
                  justify={'center'}>
                <Grid item className={styles.container}>
                    <IconButton className={styles.close_button} size={'small'}
                                onClick={() => props.onClickRemoveResource(props.resource_id)}>
                        <CancelIcon/>
                    </IconButton>
                    <img src={resource_type} width={props.width} height={props.height}/>
                </Grid>
                <Grid item>
                    <img src={license} width={props.width}/>
                </Grid>
            </Grid>
        );
    } else {
        return (
            <Grid container item direction={'column'} alignItems={'center'} ref={drag}
                  style={{width: props.width}}
                  xs={3}
                  justify={'center'}>
                <Grid item className={styles.container}>
                    <img src={resource_type} width={props.width} height={props.height}/>
                </Grid>
                <Grid item>
                    <img src={license} width={props.width}/>
                </Grid>
            </Grid>
        );
    }
};

export default ResourceInArcade;