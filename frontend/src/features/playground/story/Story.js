import React, {useState, useEffect, useContext} from 'react';
import {useSelector, useDispatch} from "react-redux";
import lodash from 'lodash';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import challengeGenerator from '../../../utils/game_generator/Story';
import {to_level, prepare_choice_for_last_level, prepare_oer_resources} from "./CurrentChallangeSlice";
import {set_story_level} from '../choose_level/CurrentStoryLevelSlice';
import {set_practices_list} from "./CurrentPracticesListSlice";
import {
    open_confirm_submission_dialog,
    close_confirm_submission_dialog
} from "../dialog/confirm_submission_dialog/ConfirmSubmissionDialogSlice";
import {
    open_choose_license_dialog,
    set_message_for_choose_license_dialog,
    close_choose_license_dialog,
    set_licenses_to_be_excluded_from_answer
} from "../dialog/choose_license_dialog/ChooseLicenseDialogSlice";
import {set_result_for_level} from "./GameProgressSlice";
import {questionTypes, color, background, gameTypes} from '../../../definitions/Types';
import PracticeMode from '../practice/PracticeMode';
import ChooseLicenseDialog from '../dialog/choose_license_dialog/ChooseLicenseDialog';
import {checkCompatible, postProgress} from '../../../utils/Requests';
import Choice from './choice/Choice';
import Slide from '@material-ui/core/Slide';
import ConfirmSubmissionDialog from "../dialog/confirm_submission_dialog/ConfirmSubmissionDialog";
import {
    story_description_image_container,
    story_talk_box,
    story_question,
    story_smith,
    story_go_button
} from '../../../images';
import {GameContext} from "../../../App";
import {increase_time, reset_time} from "../../navbar/TimerSlice";
import {set_score} from "../../../ScoreSlice";

const LAST_LEVEL = 6;
const SUCCESS_MESSAGE = 'Congratulation !!!';
const FAIL_MESSAGE = 'Please try again';

const useStyles = makeStyles((theme) => ({
    root: {
        'position': 'relative'
    },
    context: {
        'backgroundImage': `url(${story_talk_box})`,
        'background-size': '100% 100%',
        [theme.breakpoints.up('sm')]: {
            'padding-top': '40px',
            'padding-left': '70px',
            'padding-right': '30px',
            'height': '180px'
        },
        [theme.breakpoints.up('xl')]: {
            'height': '150px'
        }
    },
    picture: {
        'position': 'relative',
        [theme.breakpoints.up('sm')]: {
            'height': '225px'
        },
        [theme.breakpoints.up('xl')]: {
            'height': '300px'
        }
    },
    image_container: {
        'position': 'absolute',
        'max-width': '100%',
        'max-height': '100%',
        [theme.breakpoints.up('sm')]: {
            'top': '25px',
            'left': '107px'
        },
        [theme.breakpoints.up('xl')]: {
            'top': '25px',
            'left': '107px'
        }
    },
    image: {
        'position': 'absolute',
        'max-width': '10%',
        'max-height': '10%'
    },
    question: {
        'z-index': '1',
        'backgroundImage': `url(${story_question})`,
        'background-size': '100% 100%',
        'color': '#BFB7AF',
        [theme.breakpoints.up('sm')]: {
            'margin-top': '20px',
            'padding-left': '40px',
            'padding-right': '40px',
            'height': '200px'
        },
        [theme.breakpoints.up('xl')]: {
            'height': '175px'
        }
    },
    submit_button: {
        [theme.breakpoints.up('sm')]: {
            'margin-top': '20px'
        },
        [theme.breakpoints.up('xl')]: {
            'margin-top': '20px'
        }
    },
    go_button_container: {
        'position': 'absolute',
        'bottom': '35px',
        'height': '130px',
        'width': '130px',
    },
    go_button: {
        'backgroundImage': `url(${story_go_button})`,
        'background-size': '100% 100%',
        'color': color.NORMAL_TEXT_WHITE,
        'font-size': '20px',
        [theme.breakpoints.up('sm')]: {
            'margin-top': '20px'
        },
        [theme.breakpoints.up('xl')]: {
            'margin-top': '20px'
        }
    },
    smith: {
        'z-index': '0',
        'position': 'absolute',
        [theme.breakpoints.up('sm')]: {
            'max-width': '45%',
            'top': '100px',
            'left': '500px'
        },
        [theme.breakpoints.up('xl')]: {
            'max-width': '25%',
            'margin-left': '270px',
            'margin-top': '120px',
        }
    }
}));
const get_current_practice = (practices_list) => {
    for (let i = 0; i < practices_list.length; i++) {
        if (!practices_list[i].finished) {
            return practices_list[i];
        }
    }
    return null;
};

function Story() {
    const styles = useStyles();
    const game_context = useContext(GameContext);
    const dispatch = useDispatch();
    const current_story_level = useSelector(state => state.current_story_level);
    const current_challenge = useSelector(state => state.current_challenge);
    const choose_license_dialog = useSelector(state => state.choose_license_dialog);
    const [chosenLicenses, setChosenLicenses] = useState([]);
    const current_practices_list = useSelector(state => state.current_practices_list);
    const current_practice = get_current_practice(current_practices_list);
    const nextChallenge = challengeGenerator(current_challenge.level + 1);
    const game_progress = useSelector(state => state.game_progress);
    const elapsed_time = useSelector(state => state.elapsed_time);
    const [finalLicense, setFinalLicense] = useState('');
    const [failTimes, setFailTimes] = useState(0);
    // Only used for questions requiring players to choose many answer (choices)
    const [choices, setChoices] = useState([
        {
            is_selected: false,
            color: 'none'
        },
        {
            is_selected: false,
            color: 'none'
        },
        {
            is_selected: false,
            color: 'none'
        },
        {
            is_selected: false,
            color: 'none'
        }
    ]);
    const [showUp, setShowUp] = useState({
        stable_content: true,
        unstable_content: true,
    });

    /*
        Open the dialog, in which players choose a license as their final answer
        @param [int] choiceNumbers
     */
    const openChooseLicenseDialog = (choiceNumbers) => {
        let newMessage = current_challenge.oer_resources[0];
        let newChosenLicenses = lodash.cloneDeep(chosenLicenses);
        choiceNumbers.forEach(choiceNumber => {
            newChosenLicenses.push(current_challenge.choices[choiceNumber].CC_license);
            newMessage += '; ' + current_challenge.choices[choiceNumber].CC_license
        });
        setChosenLicenses(newChosenLicenses);
        // setMessage(newMessage);
        // setIsChooseLicenseDialogOpening(true);
        dispatch(set_message_for_choose_license_dialog(newMessage));
        dispatch(open_choose_license_dialog());
    };

    const getAllSelectedChoices = () => {
        let res = [];
        for (let i = 0; i < choices.length; i++) {
            if (choices[i].is_selected) {
                res.push(i);
            }
        }
        return res;
    };

    /*
        Unset the selected choices
        @params [int] choiceNumbers
     */
    const unselectSelectedChoices = (choiceNumbers) => {
        let newChoices = lodash.cloneDeep(choices);
        choiceNumbers.forEach(choiceNumber => {
            newChoices[choiceNumber].is_selected = false;
        });
        setChoices(newChoices);
    };

    const clickOnSubmitButton = (e) => {
        e.preventDefault();
        const user_answer = choose_license_dialog.selected_license;
        checkCompatible(window.accessToken, current_challenge.combination_type, chosenLicenses.concat(current_challenge.oer_resources), user_answer)
            .then(res => {
                // Player correctly answered
                if (res.hasOwnProperty('result') && res.result) {
                    dispatch(close_choose_license_dialog());
                    dispatch(set_result_for_level({level: current_challenge.level, result: user_answer}));
                    unselectSelectedChoices(getAllSelectedChoices());
                    setFinalLicense(user_answer);
                    dispatch(open_confirm_submission_dialog({correctness: true, message: SUCCESS_MESSAGE}));
                }
                // Wrong Answer
                else {
                    const message = failTimes === 1 ? FAIL_MESSAGE : current_challenge.hint;
                    dispatch(open_confirm_submission_dialog({correctness: false, message: message}));
                }
            })
            .catch(e => console.log(e));
    };

    const clickOnGoButton = (e) => {
        e.preventDefault();
        openChooseLicenseDialog(getAllSelectedChoices());
    };

    const countNumberOfSelectedChoices = () => {
        let count = 0;
        choices.forEach((choice) => {
            if (choice.is_selected) {
                count += 1;
            }
        });
        return count;
    };

    const clickOnAChoice = (choiceNumber) => {
        if (current_challenge.type === questionTypes.SELF_GENERATED) {
            openChooseLicenseDialog([choiceNumber]);
        } else if (current_challenge.type === questionTypes.SELF_GENERATED_WITH_TWO_CHOICES) {
            if (choices[choiceNumber].is_selected) {
                unselectSelectedChoices([choiceNumber]);
            } else if (countNumberOfSelectedChoices() <= 1) {
                let newChoices = [...choices];
                newChoices[choiceNumber].is_selected = true;
                setChoices(newChoices);
            }
        } else if (current_challenge.correctAnswer === choiceNumber) {
            dispatch(set_result_for_level({
                level: current_challenge.level,
                result: current_challenge.choices[current_challenge.correctAnswer]
            }));
            dispatch(open_confirm_submission_dialog({correctness: true, message: SUCCESS_MESSAGE}));
        } else {
            const message = failTimes < 2 ? FAIL_MESSAGE : current_challenge.hint;
            dispatch(open_confirm_submission_dialog({correctness: false, message: message}));
            setFailTimes(failTimes + 1);
        }
    };

    /*
        @param bool enter enter = true means sliding in, enter = false means sliding out
     */
    const setTransition = (enter) => {
        if (nextChallenge.hasOwnProperty('practices')) {
            setShowUp(prevState => (
                {
                    ...prevState,
                    stable_content: enter,
                    unstable_content: enter
                }
            ));
        } else {
            setShowUp(prevState => (
                {
                    ...prevState,
                    unstable_content: enter
                }
            ));
        }
    };

    const goToNextLevel = () => {
        dispatch(close_confirm_submission_dialog());
        dispatch(set_score({
            type: gameTypes.STORY,
            story_level: current_challenge.level,
            elapsed_time: elapsed_time,
            failed_times: failTimes
        }));
        postProgress(window.accessToken, {
            [current_challenge.level]: {
                answer: current_challenge.correctAnswer === null ? finalLicense : current_challenge.choices[current_challenge.correctAnswer].CC_license,
                failTimes
            }
        })
            .then((res) => {

            })
            .catch(err => {
                console.log('err :>> ', err);
            });
        if (nextChallenge !== null) {
            setTransition(false);

            // time out is required for exiting animation
            setTimeout((() => {
                setTransition(true);
                setFailTimes(0);
                setChosenLicenses([]);
                if (nextChallenge.hasOwnProperty('practices')) {
                    dispatch(set_practices_list(nextChallenge.practices));
                }
                dispatch(set_story_level(current_story_level + 1));
            }), 500);
        } else {
            alert('Congratulation, end game');
        }
        dispatch(reset_time());
    };

    /*
    Get list of practices for each level
     */
    useEffect(() => {
        if (current_challenge.hasOwnProperty('practices')) {
            dispatch(set_practices_list(current_challenge.practices));
        }
    }, [current_challenge.level]);

    /*
    Move to next level if current_story_level is changed
     */
    useEffect(() => {
        dispatch(to_level(current_story_level));
    }, [current_story_level]);

    /*
    Set background
     */
    useEffect(() => {
        if (game_context.background.current_background !== background.IN_GAME) {
            game_context.background.current_background = background.IN_GAME;
            game_context.background.set_background(background.IN_GAME);
        }
    }, [game_context.background.current_background]);

    /*
    Set up required oer for each level. Only useful if a level takes the output of previous levels as its input
     */
    useEffect(() => {
        if (current_challenge.hasOwnProperty('require_result_of_levels')) {
            dispatch(prepare_oer_resources(game_progress));
        }
    }, [current_challenge.level]);

    /*
    special case, just for the 6th level
     */
    useEffect(() => {
        if (current_challenge.level === LAST_LEVEL && current_challenge.choices[current_challenge.correctAnswer].CC_license === null) {
            checkCompatible(window.accessToken, current_challenge.combination_type, current_challenge.oer_resources, 'check')
                .then(res => {
                    if (res.hasOwnProperty('correctAnswer') && res.correctAnswer) {
                        dispatch(prepare_choice_for_last_level({correctAnswer: res.correctAnswer}))
                    }
                })
                .catch(e => console.log(e));
        }
    });

    /*
     Exclude some licenses from answer according to requirement of the level
     The dependency is challenge.level, not current_story_level is for the case user directly jump to level 5 from main menu
     */
    useEffect(() => {
        if (current_challenge.hasOwnProperty('licenses_to_be_excluded_from_answer')) {
            dispatch(set_licenses_to_be_excluded_from_answer(current_challenge.licenses_to_be_excluded_from_answer))
        }
    }, [current_challenge.level]);

    // Start the timer
    useEffect(() => {
        let timer = setInterval(() => {
            dispatch(increase_time());
        },1000);
        return () => {
            clearInterval(timer);
        };
    });

    if (current_practice !== null) {
        return <PracticeMode practice={current_practice}/>
    } else {
        return (
            <Grid container item direction={'row'} justify={'center'} alignItems={'center'} className={styles.root}>
                <Slide direction={'left'} in={showUp.stable_content} mountOnEnter unmountOnExit>
                    <img className={styles.smith} src={story_smith}/>
                </Slide>
                <ConfirmSubmissionDialog go_to_next_level={goToNextLevel}/>
                <ChooseLicenseDialog clickOnSubmitButton={clickOnSubmitButton}/>
                <Grid container item direction={'row'} justify={'center'} xs={11}>
                    <Grid container item xs={12} justify={'flex-start'}>
                        <Slide direction={'right'} in={showUp.stable_content} mountOnEnter unmountOnExit>
                            <Grid container item xs={11} className={styles.context}
                                  justify={'center'}>
                                {current_challenge.context}
                            </Grid>
                        </Slide>
                    </Grid>
                    <Grid container item xs={12} justify={'flex-start'}>
                        <Slide direction={'right'} in={showUp.unstable_content} mountOnEnter unmountOnExit>
                            <Grid container item xs={7} className={styles.picture} justify={'center'}
                                  alignItems={'center'}>
                                <img className={styles.image_container} src={story_description_image_container}/>
                                <img className={styles.image} src={current_challenge.description_image}/>
                            </Grid>
                        </Slide>
                    </Grid>
                    <Slide direction={'left'} in={showUp.unstable_content} mountOnEnter unmountOnExit>
                        <Grid container item className={styles.question} justify={'center'}
                              alignItems={'center'} xs={11}>
                            {current_challenge.question}
                        </Grid>
                    </Slide>
                    <Grid container item xs={12} justify={'space-between'}>
                        {
                            [...Array(4).keys()].map(choiceNumber => {
                                return (
                                    <Choice key={'storymode-choice-' + choiceNumber} clickOnAChoice={clickOnAChoice}
                                            display_text={current_challenge.choices[choiceNumber].display_text}
                                            choice_number={choiceNumber}
                                            is_selected={choices[choiceNumber].is_selected}
                                            show_up={showUp.unstable_content}/>
                                )
                            })
                        }
                    </Grid>
                    {
                        current_challenge.type === questionTypes.SELF_GENERATED_WITH_TWO_CHOICES &&
                        <Grid container item xs={12} justify={'center'}>
                            <Grid container item className={styles.go_button_container}>
                                <Button fullWidth className={styles.go_button}
                                        onClick={clickOnGoButton}>Go</Button>
                            </Grid>
                        </Grid>
                    }
                </Grid>
            </Grid>
        );
    }
}

export default Story;
