import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {finish_a_practice} from "../../story/CurrentPracticesListSlice";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import MatchRow from "./MatchRow";
import lodash from 'lodash';
import {menu_button_background, story_question} from "../../../../images";
import {color, game_types} from "../../../../definitions/Types";
import ConfirmSubmissionDialog from "../../dialog/confirm_submission_dialog/ConfirmSubmissionDialog";
import {
    open_confirm_submission_dialog,
    close_confirm_submission_dialog
} from "../../dialog/confirm_submission_dialog/ConfirmSubmissionDialogSlice";
import {reset_time} from "../../../navbar/TimerSlice";
import {set_score} from "../../../../ScoreSlice";
import Slide from "@material-ui/core/Slide";

const SUCCESS_MESSAGE = 'Congratulation !!!';
const FAIL_MESSAGE = 'Please try again';

const useStyles = makeStyles((theme) => ({
    root: {
        'margin-top': '20px'
    },
    header: {
        'color': color.NORMAL_TEXT_WHITE
    },
    header_container: {
        [theme.breakpoints.up('sm')]: {
            'height': '90px'
        },
        [theme.breakpoints.up('xl')]: {
            'height': '120px'
        },
        'background-image': `url(${story_question})`,
        'background-size': '100% 100%'
    },
    buttons_container: {
        'position': 'absolute',
        'bottom': '25px'
    },
    button: {
        'background-image': `url(${menu_button_background})`,
        'background-size': '100% 100%',
        'height': '50px',
        'color': color.NORMAL_TEXT_WHITE
    }
}));

const initOrder = (descriptions) => {
    let result = [];
    for (let i = 0; i < descriptions.length; i++) {
        result.push({
            description: descriptions[i],
            color: 'none'
        });
    }
    return result;
};

const extractSymbolAndDescriptionFromData = (data) => {
    let symbols = [];
    let descriptions = [];
    data.forEach(elem => {
        for (const symbol in elem) {
            if (elem.hasOwnProperty(symbol)) {
                symbols.push(symbol);
                descriptions.push(elem[symbol]);
            }
        }
    });

    return {
        symbols: symbols,
        descriptions: descriptions,
        numberOfMatches: symbols.length
    }
};

const shuffle = (array) => {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap_position_of_two_rows it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};

function PracticeTheory(props) {
    const styles = useStyles();
    const dispatch = useDispatch();
    const practice = props.practice;
    const current_challenge = useSelector(state => state.current_challenge);
    const {symbols, descriptions, numberOfMatches} = extractSymbolAndDescriptionFromData(practice.data);
    const [helper_array, set_helper_array] = useState([...Array(numberOfMatches).keys()]);
    const [orderedDescriptions, setOrderedDescriptions] = useState(initOrder(shuffle(descriptions)));
    const [show_up, set_show_up] = useState(true);

    const swap_position_of_two_rows = (from, to) => {
        const source = orderedDescriptions[from];
        const target = orderedDescriptions[to];
        setOrderedDescriptions(prevState => {
            let newOrder = lodash.cloneDeep(prevState);
            newOrder[from] = target;
            newOrder[to] = source;
            return newOrder;
        });
    };

    const reset_color = () => {
        setOrderedDescriptions(prevState => {
            let newOrder = lodash.cloneDeep(prevState);
            return newOrder.map(elem => {
                elem.color = 'none';
                return elem;
            });
        });
    };

    const click_on_skip = (e) => {
        e.preventDefault();
        go_to_next_level();
    };

    const click_on_submit = (e) => {
        e.preventDefault();
        let correctness = check_for_correctness();
        if (correctness.result) {
            dispatch(open_confirm_submission_dialog({correctness: true, message: SUCCESS_MESSAGE}));
            dispatch(set_score({
                type: game_types.PRACTICE_THEORY,
                story_level: current_challenge.level,
                practice_id: practice.id,
                practice_level: practice.level
            }));
        } else {
            let newOrderedDescriptions = lodash.cloneDeep(orderedDescriptions);
            for (let i = 0; i < correctness.details.length; i++) {
                if (correctness.details[i]) {
                    newOrderedDescriptions[i].color = 'green'
                } else {
                    newOrderedDescriptions[i].color = 'red'
                }
            }
            setOrderedDescriptions(newOrderedDescriptions);
            dispatch(open_confirm_submission_dialog({correctness: false, message: FAIL_MESSAGE}));
        }
    };

    const check_for_correctness = () => {
        let correctness = {
            details: [],
            result: true
        };
        for (let i = 0; i < symbols.length; i++) {
            if (practice.data[i][symbols[i]] !== orderedDescriptions[i].description) {
                correctness.result = false;
                correctness.details.push(false);
            } else {
                correctness.details.push(true);
            }
        }
        return correctness;
    };


    const go_to_next_level = () => {
        set_show_up(false);
        dispatch(reset_time());
        dispatch(close_confirm_submission_dialog());
        setTimeout(() => {
            set_show_up(true);
            dispatch(finish_a_practice(practice.id));
        }, 500);

    };

    useEffect(() => {
        setOrderedDescriptions(initOrder(shuffle(descriptions)));
        set_helper_array([...Array(numberOfMatches).keys()]);
    }, [practice.id, current_challenge.level]);
    return (
        <Grid container item direction={'row'} justify={'center'} alignItems={'flex-start'} alignContent={'flex-start'} xs={10} className={styles.root}>
            <ConfirmSubmissionDialog go_to_next_level={go_to_next_level}/>
            <Slide direction={'down'} in={show_up} mountOnEnter unmountOnExit>
                <Grid container item direction={'row'} className={styles.header_container} xs={10} justify={'center'}
                      alignItems={'center'}>
                    <Grid item className={styles.header}>{practice.description}</Grid>
                </Grid>
            </Slide>
            <Slide direction={'down'} in={show_up} mountOnEnter unmountOnExit>
                <Grid container item direction={'row'} xs={12}>
                    {
                        helper_array.map(index => {
                            return (
                                <MatchRow key={symbols[index] + '_' + descriptions[index]} index={index}
                                          symbol={symbols[index]} description={orderedDescriptions[index].description}
                                          swap_position_of_two_rows={swap_position_of_two_rows} color={orderedDescriptions[index].color}
                                          reset_color={reset_color}/>
                            );
                        })
                    }
                </Grid>
            </Slide>
            <Slide direction={'up'} in={show_up} mountOnEnter unmountOnExit>
                <Grid container item xs={12} justify={'space-around'} className={styles.buttons_container}>
                    <Grid container item xs={4} justify={'center'}>
                        <Button fullWidth color={"primary"}
                                onClick={click_on_submit} className={styles.button}>Submit</Button>
                    </Grid>
                    <Grid container item xs={4} justify={'center'}>
                        <Button fullWidth onClick={click_on_skip} className={styles.button}>Skip</Button>
                    </Grid>
                </Grid>
            </Slide>
        </Grid>
    )
}

export default PracticeTheory;