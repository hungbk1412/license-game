import React, {useState} from 'react';
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import MatchRow from "./MatchRow";
import lodash from 'lodash';

const useStyles = makeStyles((theme) => ({
    b: {
        'border': '1px solid black'
    },
    hint_box: {
        [theme.breakpoints.up('sm')]: {
            'border': '1px solid black',
            'height': '50px',
            'margin-top': '50px'
        },
        [theme.breakpoints.up('xl')]: {
            'border': '1px solid black',
            'height': '50px',
            'margin-top': '50px'
        }
    },
    match_row: {
        'margin-top': '80px'
    },
    buttons: {
        'margin-top': '100px'
    },
    connecting_dot: {
        'transform': 'scale(0.5)'
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
    const practice = props.practice;
    const {symbols, descriptions, numberOfMatches} = extractSymbolAndDescriptionFromData(practice.data);
    const helper_array = [...Array(numberOfMatches).keys()];
    const [orderedDescriptions, setOrderedDescriptions] = useState(initOrder(shuffle(descriptions)));
    const finishPractice = props.finishPractice;

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
        finishPractice(props.id_within_story);
    };

    const clickOnSubmit = (e) => {
        e.preventDefault();
        let correctness = checkForCorrectness();
        if (correctness.result) {
            finishPractice(props.id_within_story);
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

    return (
        <Grid container item direction={'row'} justify={'center'} xs={10}>
            <Grid container item direction={'row'} className={styles.hint_box} xs={10} justify={'center'}
                  alignItems={'center'}>
                <Grid item>Match the CC licences with the corresponding definitions</Grid>
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
            <Grid container item xs={12} justify={'space-around'} className={styles.buttons}>
                <Grid container item xs={3} justify={'center'}>
                    <Button variant={"contained"} fullWidth color={"primary"}
                            onClick={clickOnSubmit}>Submit</Button>
                </Grid>
                <Grid container item xs={3} justify={'center'}>
                    <Button variant={"contained"} fullWidth onClick={clickOnSkip}>Skip</Button>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default PracticeTheory;