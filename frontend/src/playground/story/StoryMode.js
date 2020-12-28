import React, {useState, useEffect, useRef} from 'react';
import lodash from 'lodash';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import challengeGenerator from "../../game_generator/Story";
import {licenseTypes, questionTypes} from "../../Types";
import PracticeMode from "../practice/PracticeMode";
import ChooseLicenseDialog from "../dialog/ChooseLicenseDialog";
import {checkCompatible} from "../../Requests";
import Choice from "./Choice";
import {story_description_image_container, story_talk_box, story_question, story_smith} from "../../images";

const LAST_LEVEL = 6;

const useStyles = makeStyles((theme) => ({
    hints: {
        'padding-top': '40px',
        'padding-left': '10px',
        'padding-right': '10px',
        'backgroundImage': `url(${story_talk_box})`,
        'background-size': '100% 100%',
        [theme.breakpoints.up('sm')]: {
            'height': '180px'
        },
        [theme.breakpoints.up('xl')]: {
            'height': '150px'
        }
    },
    picture: {
        'margin-top': '65px',
        [theme.breakpoints.up('sm')]: {
            'height': '150px'
        },
        [theme.breakpoints.up('xl')]: {
            'height': '300px'
        }
    },
    question: {
        'z-index': '1',
        'margin-top': '50px',
        'padding-left': '40px',
        'padding-right': '40px',
        'backgroundImage': `url(${story_question})`,
        'background-size': '100% 100%',
        'color': '#BFB7AF',
        [theme.breakpoints.up('sm')]: {
            'height': '200px'
        },
        [theme.breakpoints.up('xl')]: {
            'height': '175px'
        }
    },
    image_container: {
        'position': 'absolute',
        'max-width': '14%'
    },
    image: {
        'position': 'absolute',
        'max-width': '10%',
        'max-height': '10%'
    },
    submit_button: {
        'margin-top': '20px'
    },
    go_button: {
        'margin-top': '20px',
        'background-color': 'brown'
    },
    smith: {
        'z-index': '0',
        'position': 'absolute',
        'max-width': '25%',
        'margin-left': '270px',
        'margin-top': '120px'
    }
}));

function StoryMode(props) {
    const styles = useStyles();
    const changeToStoryBackground = props.changeToStoryBackground;
    const [challenge, setChallenge] = useState(challengeGenerator(props.start_level));
    const [isSubmitDialogOpening, setIsSubmitDialogOpening] = useState(false);
    const [finalLicense, setFinalLicense] = useState('');
    const [resultsOfLevels, setResultsOfLevels] = useState({});
    const [message, setMessage] = useState('');
    // Only used for questions requiring players to choose many answer (choices)
    const [selectedChoices, setSelectedChoices] = useState([]);

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
        let newSelectedChoices = lodash.cloneDeep(selectedChoices);
        choiceNumbers.forEach(choiceNumber => {
            newSelectedChoices = newSelectedChoices.filter(elem => elem !== choiceNumber);
        });
        setSelectedChoices(newSelectedChoices);
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

        // special case, just for the 6th level
        if (challenge.level === LAST_LEVEL && challenge.choices[challenge.correctAnswer].CC_license === null) {
            checkCompatible(window.accessToken, challenge.combination_type, challenge.oer_resources, 'check')
                .then(res => {
                    if (res.correctAnswer) {
                        let newChallenge = lodash.cloneDeep(challenge);
                        newChallenge.choices[challenge.correctAnswer].CC_license = res.correctAnswer;
                        newChallenge.choices[challenge.correctAnswer].display_text = res.correctAnswer;
                        let availableLicenses = Object.values(licenseTypes).filter (elem => elem !== res.correctAnswer);
                        newChallenge.choices = newChallenge.choices.map (license => {
                            if (license.CC_license === null) {
                                let randomLicense = availableLicenses[Math.floor(Math.random() * availableLicenses.length)];
                                license.CC_license = randomLicense;
                                license.display_text = randomLicense;
                                availableLicenses = availableLicenses.filter (elem => elem !== randomLicense);
                                return license;
                            } else {
                                return license;
                            }
                        });
                        setChallenge(newChallenge);
                    }
                })
                .catch(e => console.log(e));
        }
        changeToStoryBackground();
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
                                     message={message}
                                     licenses_to_be_excluded_from_answer={challenge.licenses_to_be_excluded_from_answer}/>
                <Grid container item direction={'row'} justify={'center'} xs={11}>
                    <img className={styles.smith} src={story_smith}/>
                    <Grid container item xs={12} justify={'flex-start'}>
                        <Grid container item xs={11} className={styles.hints}
                              justify={'center'}>{challenge.context}</Grid>
                    </Grid>
                    <Grid container item xs={12} justify={'flex-start'}>
                        <Grid container item xs={7} className={styles.picture} justify={'center'}
                              alignItems={'center'}>
                            <img className={styles.image_container} src={story_description_image_container}/>
                            <img className={styles.image} src={challenge.description_image}/>
                        </Grid>
                    </Grid>
                    <Grid container item className={styles.question} justify={'center'}
                          alignItems={'center'} xs={11}>{challenge.question}</Grid>
                    <Grid container item xs={12} justify={'space-between'}>
                        {
                            [...Array(4).keys()].map(choiceNumber => {
                                return (
                                    <Choice key={'storymode-choice-' + choiceNumber} clickOnAChoice={clickOnAChoice}
                                            display_text={challenge.choices[choiceNumber].display_text}
                                            choice_number={choiceNumber}
                                            is_selected={selectedChoices.includes(choiceNumber)}/>
                                )
                            })
                        }
                    </Grid>
                    {
                        challenge.type === questionTypes.SELF_GENERATED_WITH_TWO_CHOICES &&
                        <Grid container item xs={12} justify={'center'}>
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
