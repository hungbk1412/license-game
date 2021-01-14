import React, {useEffect, useContext} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {to_level} from "../story/CurrentChallangeSlice";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import {menu_button_background} from "../../../images";
import {GameContext} from "../../../App";
import {color, background} from '../../../definitions/Types';
import Story from "../story/Story";

const useStyles = makeStyles((theme) => ({
    root: {
        'margin': '100px 0px 100px 0px',
        'width': '100%'
    },
    level_clickable: {
        [theme.breakpoints.up('xl')]: {
            'height': '90px',
            'font-size': '20px'
        },
        [theme.breakpoints.down('xl')]: {
            'height': '50px',
            'font-size': '14px'
        },
        'background-image': `url(${menu_button_background})`,
        'background-size': '100% 100%'
    },
    level_not_clickable: {
        'opacity': '0.3',
        [theme.breakpoints.up('xl')]: {
            'height': '90px',
            'font-size': '20px'
        },
        [theme.breakpoints.down('xl')]: {
            'height': '50px',
            'font-size': '14px'
        },
        'background-image': `url(${menu_button_background})`,
        'background-size': '100% 100%'
    },
    header: {
        'font-size': '30px',
        'color': color.NORMAL_TEXT_WHITE
    }
}));

const ChooseLevel = (props) => {
    const styles = useStyles();
    const dispatch = useDispatch();
    const game_progress = useSelector(state => state.game_progress);
    const current_challenge = useSelector(state => state.current_challenge);
    const helper_arr = [...Array(7).keys()];
    const game_context = useContext(GameContext);
    const number_of_unlocked_level = Object.keys(game_progress).length;

    const onClickLevel = (level) => {
        dispatch(to_level(level));
    };

    useEffect(() => {
        if (game_context.background.current_background !== background.MAIN_MENU) {
            game_context.background.current_background = background.MAIN_MENU;
            game_context.background.set_background(background.MAIN_MENU);
        }
    });

    if (current_challenge.level === -1) {
        return (
            <Grid container direction={'column'} spacing={1} className={styles.root}>
                <Grid container item justify={'center'}>
                    <Grid item className={styles.header}>
                        Choose Level
                    </Grid>
                </Grid>
                {
                    helper_arr.map(index => {
                        if (index <= number_of_unlocked_level) {
                            return (
                                <Grid container item justify={'center'} key={'choose-level-' + index}>
                                    <Grid item xs={6} md={3}>
                                        <Button className={styles.level_clickable} fullWidth
                                                onClick={() => onClickLevel(index)}>{index + 1}</Button>
                                    </Grid>
                                </Grid>
                            )
                        } else {
                            return (
                                <Grid container item justify={'center'} key={'choose-level-' + index}>
                                    <Grid item xs={6} md={3}>
                                        <Button className={styles.level_not_clickable} fullWidth>{index + 1}</Button>
                                    </Grid>
                                </Grid>
                            )
                        }
                    })
                }
            </Grid>
        );
    } else {
        return (
            <Story change_to_story_background={props.change_to_story_background}/>
        );
    }
};

export default ChooseLevel;