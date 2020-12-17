import React from 'react';
import Grid from '@material-ui/core/Grid';
import {itemTypes, licenseTypes, resourceTypes} from "../Types";
import {useDrag} from 'react-dnd';
import CancelIcon from '@material-ui/icons/Cancel';
import IconButton from '@material-ui/core/IconButton';
import makeStyles from "@material-ui/core/styles/makeStyles";
import {
    CC_ZERO,
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
} from '../images';

const useStyles = makeStyles((theme) => ({
    close_button: {
        'position': 'absolute',
        'top': '-20px',
        'right': '-25px',
        'background': 'red',
        'color': 'white',
        'transform': 'scale(0.5)'
    },
    resource_and_close_button: {
        'position': 'relative'
    },
    images: {
        'max-width': '100%',
        [theme.breakpoints.up('sm')]: {
            'max-height': (props) => {
                if (props.inside_the_result_box) {
                    return '50px';
                } else {
                    return '70px';
                }
            }
        },
        [theme.breakpoints.up('xl')]: {
            'max-height': (props) => {
                if (props.inside_the_result_box) {
                    return '90px';
                } else {
                    return '120px';
                }
            }
        }
    }
}));
const ResourceInPractice = (props) => {
    const styles = useStyles();
    let resource_type;
    let license;
    switch (props.license) {
        case licenseTypes.CC_ZERO:
            license = CC_ZERO;
            break;
        case licenseTypes.CC_BY:
            license = CC_BY;
            break;
        case licenseTypes.CC_BY_SA:
            license = CC_BY_SA;
            break;
        case licenseTypes.CC_BY_NC:
            license = CC_BY_NC;
            break;
        case licenseTypes.CC_BY_NC_SA:
            license = CC_BY_NC_SA;
            break;
        case licenseTypes.CC_BY_ND:
            license = CC_BY_ND;
            break;
        case licenseTypes.CC_BY_NC_ND:
            license = CC_BY_NC_ND;
            break;
        default:
            break;
    }

    switch (props.resource_type) {
        case resourceTypes.AUDIO:
            resource_type = audio;
            break;
        case resourceTypes.DOCUMENT:
            resource_type = document;
            break;
        case resourceTypes.PICTURE:
            resource_type = picture;
            break;
        case resourceTypes.VIDEO:
            resource_type = video;
            break;
        default:
            break;
    }

    const [{isDragging}, drag] = useDrag({
        item: {
            type: itemTypes.PRACTICE_RESOURCE,
            resource_id: props.resource_id
        },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    });

    if (props.inside_the_result_box) {
        return (
            <Grid container item direction={'row'} alignItems={'center'} ref={drag}
                  xs={3}
                  justify={'center'}
            >
                <Grid container item direction={'row'} ref={drag} xs={6} justify={'center'}>
                    <Grid item className={styles.resource_and_close_button}>
                        <IconButton className={styles.close_button} size={'small'}
                                    onClick={() => props.onClickRemoveResource(props.resource_id)}>
                            <CancelIcon/>
                        </IconButton>
                        <img className={styles.images} src={resource_type}/>
                    </Grid>
                    <img className={styles.images} src={license}/>
                </Grid>
            </Grid>
        );
    } else {
        return (
            <Grid container item direction={'row'} alignItems={'flex-end'}
                  xs={3}
                  justify={'center'}>
                <Grid container item direction={'row'} ref={drag} xs={6} justify={'center'}>
                    <img className={styles.images} src={resource_type}/>
                    <img className={styles.images} src={license}/>
                </Grid>
            </Grid>
        );
    }
};

export default ResourceInPractice;