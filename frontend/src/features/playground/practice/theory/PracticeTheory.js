import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {finish_a_practice} from "../../story/CurrentPracticesListSlice";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import MatchRow from "./MatchRow";
import lodash from 'lodash';
import {menu_button_background, story_question} from "../../../../images";
import {color} from "../../../../definitions/Types";
import ConfirmSubmissionDialog from "../../dialog/confirm_submission_dialog/ConfirmSubmissionDialog";
import {open_confirm_submission_dialog, close_confirm_submission_dialog} from "../../dialog/confirm_submission_dialog/ConfirmSubmissionDialogSlice";

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
        'background-image': `url(${story_question})`,
        'background-size': '100% 100%',
        [theme.breakpoints.up('sm')]: {
            'height': '90px',
            'margin-bottom': '10px'
        },
        [theme.breakpoints.up('xl')]: {
            'height': '70px',
            'margin-bottom': '10px'
        },
    },
    buttons_container: {
        'position': 'absolute',
        'bottom': '50px'
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

        // And swap it with the current element.
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
    const {symbols, descriptions, numberOfMatches} = extractSymbolAndDescriptionFromData(practice.data);
    const helper_array = [...Array(numberOfMatches).keys()];
    const [orderedDescriptions, setOrderedDescriptions] = useState(initOrder(shuffle(descriptions)));

    const swap = (from, to) => {
        const source = orderedDescriptions[from];
        const target = orderedDescriptions[to];
        setOrderedDescriptions(prevState => {
            let newOrder = lodash.cloneDeep(prevState);
            newOrder[from] = target;
            newOrder[to] = source;
            return newOrder;
        });
    };

    const resetColor = () => {
        setOrderedDescriptions(prevState => {
            let newOrder = lodash.cloneDeep(prevState);
            return newOrder.map(elem => {
                elem.color = 'none';
                return elem;
            });
        });
    };

    const clickOnSkip = (e) => {
        e.preventDefault();
        goToNextLevel();
    };

    const clickOnSubmit = (e) => {
        e.preventDefault();
        let correctness = checkForCorrectness();
        if (correctness.result) {
            dispatch(open_confirm_submission_dialog({correctness: true, message: SUCCESS_MESSAGE}));
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

    const checkForCorrectness = () => {
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

    const goToNextLevel = () => {
        dispatch(close_confirm_submission_dialog());
        dispatch(finish_a_practice(practice.id));
    };

    return (
        <Grid container item direction={'row'} justify={'center'} xs={10} className={styles.root}>
            <ConfirmSubmissionDialog go_to_next_level={goToNextLevel}/>
            <Grid container item direction={'row'} className={styles.header_container} xs={10} justify={'center'}
                  alignItems={'center'}>
                <Grid item className={styles.header}>{practice.description}</Grid>
            </Grid>
            <Grid container item direction={'row'}>
                {
                    helper_array.map(index => {
                        return (
                            <MatchRow key={symbols[index] + '_' + descriptions[index]} index={index}
                                      symbol={symbols[index]} description={orderedDescriptions[index].description}
                                      swap={swap} color={orderedDescriptions[index].color}
                                      resetColor={resetColor}/>
                        );
                    })
                }
            </Grid>
            <Grid container item xs={12} justify={'space-around'} className={styles.buttons_container}>
                <Grid container item xs={4} justify={'center'}>
                    <Button fullWidth color={"primary"}
                            onClick={clickOnSubmit} className={styles.button}>Submit</Button>
                </Grid>
                <Grid container item xs={4} justify={'center'}>
                    <Button fullWidth onClick={clickOnSkip} className={styles.button}>Skip</Button>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default PracticeTheory;