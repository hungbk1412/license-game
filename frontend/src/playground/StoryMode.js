import React, {useState, useEffect} from 'react';
import lodash from 'lodash';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {blacksmith_image} from "../images";
import challengeGenerator from "../game_generator/Story";
import {questionTypes} from "../Types";
import PracticeMode from "./PracticeMode";
import ChooseLicenseDialog from "./dialog/ChooseLicenseDialog";
import {checkCompatible} from "../Requests";

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
    const [challenge, setChallenge] = useState(challengeGenerator(props.story_level));
    const [isSubmitDialogOpening, setIsSubmitDialogOpening] = useState(false);
    const [finalLicense, setFinalLicense] = useState('');
    const [resultsOfLevels, setResultsOfLevels] = useState({});
    const [message, setMessage] = useState('');
    // Only used for questions requiring players to choose many answer (choices)
    const [selectedChoices, setSelectedChoices] = useState([]);

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

    const removeSelectedChoices = (removeAll = false, choiceNumber = null) => {
        if (removeAll) {
            selectedChoices.forEach(choice => {
                if (selectedChoices.includes(choice)) {
                    document.getElementById('story-choice-' + choice).classList.remove(styles.chosen_choice);
                    let newSelectedChoices = [...selectedChoices];
                    newSelectedChoices = newSelectedChoices.filter(elem => elem !== choice);
                    setSelectedChoices(newSelectedChoices);
                }
            })
        } else if (choiceNumber !== null) {
            if (selectedChoices.includes(choiceNumber)) {
                document.getElementById('story-choice-' + choiceNumber).classList.remove(styles.chosen_choice);
                let newSelectedChoices = [...selectedChoices];
                newSelectedChoices = newSelectedChoices.filter(elem => elem !== choiceNumber);
                setSelectedChoices(newSelectedChoices);
            }
        } else {
            console.log('provided choice number is not valid!!');
        }
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
                    removeSelectedChoices(true);
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
                removeSelectedChoices(false, choiceNumber);
            } else if (selectedChoices.length <= 1) {
                document.getElementById('story-choice-' + choiceNumber).classList.add(styles.chosen_choice);
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

    if (challenge.attached_practice != null && props.finished_practice_for_level !== challenge.level) {
        return <PracticeMode story_level={challenge.level} practice_type={challenge.attached_practice.type}
                             practice_level={challenge.attached_practice.level}/>
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
                                                                                      id={'story-choice-0'}
                                                                                      fullWidth
                                                                                      onClick={() => clickOnAChoice(0)}>{challenge.choices[0].display_text}</Button></Grid>
                        <Grid container item xs={5} className={styles.choice}><Button variant={'contained'}
                                                                                      id={'story-choice-1'}
                                                                                      fullWidth
                                                                                      onClick={() => clickOnAChoice(1)}>{challenge.choices[1].display_text}</Button></Grid>
                        <Grid container item xs={5} className={styles.choice}><Button variant={'contained'}
                                                                                      id={'story-choice-2'}
                                                                                      fullWidth
                                                                                      onClick={() => clickOnAChoice(2)}>{challenge.choices[2].display_text}</Button></Grid>
                        <Grid container item xs={5} className={styles.choice}><Button variant={'contained'}
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
