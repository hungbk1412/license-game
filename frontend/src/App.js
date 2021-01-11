import React, {useEffect, useRef, useState} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    withRouter
} from 'react-router-dom';
import MainMenu from './features/mainmenu/MainMenu';
import AchievementsTable from './AchievementsTable';
import ChooseLevel from "./features/playground/choose_level/ChooseLevel";
import Grid from '@material-ui/core/Grid';
import NavBar from './features/navbar/NavBar';
import {makeStyles} from '@material-ui/core/styles';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import {main_background, story_background} from "./images";
import {background} from "./definitions/Types";
import {TransitionGroup, CSSTransition} from "react-transition-group";
import './App.css';
import {useDispatch} from "react-redux";
import {init_fetch_game_progress} from "./features/playground/story/GameProgressSlice";

const useStyles = makeStyles(theme => {
    return {
        game: {
            'position': 'relative',
            'border': '1px solid black',
            'min-height': '100vh',
            'background-color': 'white',
        },
        use_main_background: {
            'backgroundImage': `url(${main_background})`,
            'background-size': '100% 100%'
        },
        use_story_background: {
            'backgroundImage': `url(${story_background})`,
            'background-size': '100% 100%'
        },
        root: {
            'background-color': '#6d3003',
            'overflow': 'hidden'
        }
    }
});
export const GameContext = React.createContext(null);

function App() {
    const styles = useStyles();
    const dispatch = useDispatch();
    const game = useRef(null);
    const [score, set_score] = useState(0);

    const changeToInGameBackground = () => {
        game.current.classList.remove(styles.use_main_background);
        game.current.classList.add(styles.use_story_background);
    };

    const changeToMainMenuBackground = () => {
        game.current.classList.remove(styles.use_story_background);
        game.current.classList.add(styles.use_main_background);
    };

    const set_background = (background_type) => {
        if (background_type === background.MAIN_MENU) {
            changeToMainMenuBackground();
        } else if (background_type === background.IN_GAME) {
            changeToInGameBackground();
        }
    };

    const AnimatedSwitch = withRouter(({location}) => {
        return (
            <TransitionGroup component={null}>
                <CSSTransition key={location.key} classNames={"route-switch"} timeout={1000}>
                    <Switch location={location}>
                        <Route path={'/'}
                               component={() => <MainMenu/>}
                               exact/>
                        <Route path={'/achievements'} component={AchievementsTable}/>
                        <Route path={'/play'} component={() => <ChooseLevel/>} exact/>
                    </Switch>
                </CSSTransition>
            </TransitionGroup>
        );
    });

    /*
    Initializing to fetch game progress from data base
     */
    useEffect(() => {
        dispatch(init_fetch_game_progress());
    });

    return (
        <DndProvider backend={HTML5Backend}>
            <Router>
                <GameContext.Provider value={
                    {
                        background: {
                            current_background: null,
                            set_background: set_background
                        },
                        score: {
                            current_score: score,
                            set_score: set_score
                        }
                    }
                }>
                    <Grid container justify={'center'} className={styles.root}>
                        <Grid container item direction={'column'} alignItems={'center'} className={styles.game} xs={12}
                              md={6} ref={game}>
                            <NavBar/>
                            <AnimatedSwitch/>
                        </Grid>
                    </Grid>
                </GameContext.Provider>
            </Router>
        </DndProvider>
    );
}

export default App;
