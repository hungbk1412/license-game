import React, {useState, useEffect, useRef} from 'react';
import lodash from 'lodash';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {blacksmith_image} from "../../images";
import challengeGenerator from "../../game_generator/Story";
import {questionTypes} from "../../Types";
import PracticeMode from "../practice/PracticeMode";
import ChooseLicenseDialog from "../dialog/ChooseLicenseDialog";
import {checkCompatible} from "../../Requests";

const LAST_LEVEL = 6;

const useStyles = makeStyles((theme) => ({
    border: {
        'border': '1px solid black'
    },
    hints: {
        'margin-top': '50px',
        'padding-left': '10px',
        'padding-right': '10px',
        [theme.breakpoints.up('sm')]: {
            'height': '120px'
        },
        [theme.breakpoints.up('xl')]: {
            'height': '150px'
        }
    },
    picture: {
        'margin-top': '35px',
        [theme.breakpoints.up('sm')]: {
            'height': '200px'
        },
        [theme.breakpoints.up('xl')]: {
            'height': '300px'
        },
        'background-color': 'black'
    },
    question: {
        'margin-top': '50px',
        'padding-left': '10px',
        'padding-right': '10px',
        [theme.breakpoints.up('sm')]: {
            'height': '125px'
        },
        [theme.breakpoints.up('xl')]: {
            'height': '175px'
        }
    },
    choice: {
        'margin-top': '35px',
        'padding-left': '10px',
        'padding-right': '10px',
        [theme.breakpoints.up('sm')]: {
            'height': '50px'
        },
        [theme.breakpoints.up('xl')]: {
            'height': '75px'
        }
    },
    images: {
        'max-width': '95%',
        'max-height': '95%'
    },
    submit_button: {
        'margin-top': '20px'
    },
    chosen_choice: {
        'background-color': '#AAF38D'
    },
    go_button: {
        'margin-top': '20px',
        'background-color': 'brown'
    }
}));

function StoryMode(props) {
    const styles = useStyles();
    const [challenge, setChallenge] = useState(challengeGenerator(props.start_level));
    const [isSubmitDialogOpening, setIsSubmitDialogOpening] = useState(false);
    const [finalLicense, setFinalLicense] = useState('');
    const [resultsOfLevels, setResultsOfLevels] = useState({});
    const [message, setMessage] = useState('');
    // Only used for questions requiring players to choose many answer (choices)
    const [selectedChoices, setSelectedChoices] = useState([]);
    const choice0Ref = useRef(null);
    const choice1Ref = useRef(null);
    const choice2Ref = useRef(null);
    const choice3Ref = useRef(null);

    /*
        Open the dialog, in which players choose a license as their final answer
        @param [int] choiceNumbers
     */
    const openChooseLicenseDialog = (choiceNumbers) => {
        let newChallenge = lodash.cloneDeep(challenge);
        let newMessage = challenge.oer_resources[0];
        choiceNumbers.forEach(choiceNumber => {
            newChallenge.oer_resources.push(newChallenge.choices[choiceNumber].CC_license);
            newMessage += '; ' + challenge.choices[choiceNumber].CC_license
        });
        setChallenge(newChallenge);
        setMessage(newMessage);
        setIsSubmitDialogOpening(true);
    };

    const selectFinalLicense = (e) => {
        setFinalLicense(e.target.value)
    };

    /*
        Unset the selected choices
        @params [int] choiceNumbers
     */
    const unselectSelectedChoices = (choiceNumbers) => {
        choiceNumbers.forEach(choiceNumber => {
            if ([0, 1, 2, 3].includes(choiceNumber)) {
                switch (choiceNumber) {
                    case 0:
                        choice0Ref.current.classList.remove(styles.chosen_choice);
                        break;
                    case 1:
                        choice1Ref.current.classList.remove(styles.chosen_choice);
                        break;
                    case 2:
                        choice2Ref.current.classList.remove(styles.chosen_choice);
                        break;
                    case 3:
                        choice3Ref.current.classList.remove(styles.chosen_choice);
                        break;
                    default:
                        break;
                }
                let newSelectedChoices = [...selectedChoices];
                newSelectedChoices = newSelectedChoices.filter(elem => elem !== choiceNumber);
                setSelectedChoices(newSelectedChoices);
            } else {
                console.log('wrong choice number');
            }
        });
    };

    const closeChooseLicenseDialog = () => {
        setIsSubmitDialogOpening(false);
    };

    const clickOnSubmitButton = (e) => {
        e.preventDefault();
        checkCompatible(window.accessToken, challenge.combination_type, challenge.oer_resources, finalLicense)
            .then(res => {
                if (res.result) {
                    setIsSubmitDialogOpening(false);
                    setResultsOfLevels({
                        ...resultsOfLevels,
                        [challenge.level]: finalLicense
                    });
                    setFinalLicense('');
                    unselectSelectedChoices(selectedChoices);
                    goToNextLevel();
                } else {
                    alert(res.error_message);
                }
            })
            .catch(e => console.log(e));
    };

    const clickOnGoButton = (e) => {
        e.preventDefault();
        openChooseLicenseDialog(selectedChoices);
    };

    const clickOnAChoice = (choiceNumber) => {
        if (challenge.type === questionTypes.SELF_GENERATED) {
            openChooseLicenseDialog([choiceNumber]);
        } else if (challenge.type === questionTypes.SELF_GENERATED_WITH_TWO_CHOICES) {
            if (selectedChoices.includes(choiceNumber)) {
                unselectSelectedChoices([choiceNumber]);
            } else if (selectedChoices.length <= 1) {
                switch (choiceNumber) {
                    case 0:
                        choice0Ref.current.classList.add(styles.chosen_choice);
                        break;
                    case 1:
                        choice1Ref.current.classList.add(styles.chosen_choice);
                        break;
                    case 2:
                        choice2Ref.current.classList.add(styles.chosen_choice);
                        break;
                    case 3:
                        choice3Ref.current.classList.add(styles.chosen_choice);
                        break;
                    default:
                        break;
                }
                let newSelectedChoices = [...selectedChoices];
                newSelectedChoices.push(choiceNumber);
                setSelectedChoices(newSelectedChoices);
            }
        } else if (challenge.correctAnswer === choiceNumber) {
            setResultsOfLevels({
                ...resultsOfLevels,
                [challenge.level]: challenge.choices[challenge.correctAnswer].CC_license
            });
            goToNextLevel();
        }
    };

    const goToNextLevel = () => {
        if (challenge.level < LAST_LEVEL) {
            setChallenge(challengeGenerator(challenge.level + 1));
        } else {
            alert('End game!!!');
        }
    };

    const finishPractice = (id) => {
        let finishedPracticeIndex = challenge.practices.findIndex(practice => practice.id === id);
        let newChallenge = lodash.cloneDeep(challenge);
        newChallenge.practices[finishedPracticeIndex].finished = true;
        setChallenge(newChallenge);
    };

    const getNextUnfinishedPractice = (practices) => {
        for (let i = 0; i < practices.length; i++) {
            if (!practices[i].finished) {
                return practices[i];
            }
        }
        return null;
    };

    useEffect(() => {
        if (challenge.require_result_of_levels != null
            && challenge.require_result_of_levels.length !== 0
            && challenge.oer_resources.length === 0
        ) {
            let newChallenge = lodash.cloneDeep(challenge);
            challenge.require_result_of_levels.forEach(level => {
                newChallenge.oer_resources.push(resultsOfLevels[level]);
            });
            setChallenge(newChallenge);
        }
    });

    if (challenge.practices != null && getNextUnfinishedPractice(challenge.practices) !== null) {
        return <PracticeMode finishPractice={finishPractice} practice={getNextUnfinishedPractice(challenge.practices)}/>
    } else {
        return (
            <Grid container item direction={'row'} justify={'center'} alignItems={'center'}>
                <ChooseLicenseDialog isSubmitDialogOpening={isSubmitDialogOpening}
                                     closeChooseLicenseDialog={closeChooseLicenseDialog}
                                     clickOnSubmitButton={clickOnSubmitButton}
                                     selectFinalLicense={selectFinalLicense}
                                     finalLicense={finalLicense}
                                     message={message}/>
                <Grid container item direction={'row'} justify={'center'} xs={10}>
                    <Grid container item xs={12} justify={'flex-end'}>
                        <Grid container item xs={10} className={styles.border + ' ' + styles.hints}
                              alignItems={'center'}
                              justify={'center'}>{challenge.context}</Grid>
                    </Grid>
                    <Grid container item xs={12} justify={'flex-start'}>
                        <Grid container item xs={7} className={styles.border + ' ' + styles.picture} justify={'center'}
                              alignItems={'center'}>
                            <img className={styles.images} src={challenge.description_image}/>
                        </Grid>
                        <Grid container item xs={5}>
                            <img className={styles.images} src={blacksmith_image}/>
                        </Grid>
                    </Grid>
                    <Grid container item className={styles.border + ' ' + styles.question} justify={'center'}
                          alignItems={'center'} xs={11}>{challenge.question}</Grid>
                    <Grid container item xs={12} justify={'space-between'}>
                        <Grid container item xs={5} className={styles.choice}><Button variant={'contained'}
                                                                                      ref={choice0Ref}
                                                                                      fullWidth
                                                                                      onClick={() => clickOnAChoice(0)}>{challenge.choices[0].display_text}</Button></Grid>
                        <Grid container item xs={5} className={styles.choice}><Button variant={'contained'}
                                                                                      ref={choice1Ref}
                                                                                      id={'story-choice-1'}
                                                                                      fullWidth
                                                                                      onClick={() => clickOnAChoice(1)}>{challenge.choices[1].display_text}</Button></Grid>
                        <Grid container item xs={5} className={styles.choice}><Button variant={'contained'}
                                                                                      ref={choice2Ref}
                                                                                      id={'story-choice-2'}
                                                                                      fullWidth
                                                                                      onClick={() => clickOnAChoice(2)}>{challenge.choices[2].display_text}</Button></Grid>
                        <Grid container item xs={5} className={styles.choice}><Button variant={'contained'}
                                                                                      ref={choice3Ref}
                                                                                      id={'story-choice-3'}
                                                                                      fullWidth
                                                                                      onClick={() => clickOnAChoice(3)}>{challenge.choices[3].display_text}</Button></Grid>
                    </Grid>
                    {
                        challenge.type === questionTypes.SELF_GENERATED_WITH_TWO_CHOICES &&
                        <Grid container item xs={12} justify={'center'} id={'story-go-button'}>
                            <Grid container item xs={4}>
                                <Button variant={'contained'} fullWidth className={styles.go_button}
                                        onClick={clickOnGoButton}>Go!!!</Button>
                            </Grid>
                        </Grid>
                    }
                </Grid>
            </Grid>
        );
    }
}

export default StoryMode;
