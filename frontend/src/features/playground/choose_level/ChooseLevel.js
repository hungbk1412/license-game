import React, {useState, useEffect, useContext} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {set_story_level} from "./CurrentStoryLevelSlice";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import {menu_button_background} from "../../../images";
import {Redirect} from "react-router-dom";
import {GameContext} from "../../../App";
import {color, background} from '../../../definitions/Types';
import {getProgress} from "../../../utils/Requests";
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
    const [availableLevels, setAvailableLevels] = useState([0]);
    const dispatch = useDispatch();
    const current_story_level = useSelector(state => state.current_story_level);
    const helper_arr = [...Array(7).keys()];
    const [fetchAvailableLevels, setFetchAvailableLevel] = useState(false);
    const game_context = useContext(GameContext);
    const onClickLevel = (level) => {
        dispatch(set_story_level(level));
    };
    useEffect(() => {
        let mounted = true;
        if (!fetchAvailableLevels) {
            getProgress(window.accessToken).then(res => {
                if (res.hasOwnProperty('level')) {
                    let keys = Object.keys(res.level);
                    keys = keys.filter(key => res.level.hasOwnProperty(key));
                    keys = keys.map(key => parseInt(key));
                    keys.push((keys.length));
                    if (mounted) {
                        setAvailableLevels([...keys]);
                        setFetchAvailableLevel(true);
                    }
                }
            });
        }
        return () => {
            mounted = false
        }
    });

    useEffect(() => {
        if (game_context.background.current_background !== background.MAIN_MENU) {
            game_context.background.current_background = background.MAIN_MENU;
            game_context.background.set_background(background.MAIN_MENU);
        }
    });

    if (current_story_level === -1) {
        return (
            <Grid container direction={'column'} spacing={1} className={styles.root}>
                <Grid container item justify={'center'}>
                    <Grid item className={styles.header}>
                        Choose Level
                    </Grid>
                </Grid>
                {
                    helper_arr.map(index => {
                        if (availableLevels.includes(index)) {
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