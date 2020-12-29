import React, {useRef, useEffect, useState} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    withRouter
} from 'react-router-dom';
import MainMenu from './MainMenu';
import AchievementsTable from './AchievementsTable';
import StoryMode from "./playground/story/StoryMode";
import Grid from '@material-ui/core/Grid';
import NavBar from './NavBar';
import {makeStyles} from '@material-ui/core/styles';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import {main_background} from "./images";
import {story_background} from "./images";
import {TransitionGroup, CSSTransition} from "react-transition-group";
import './App.css';

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
            'overflow-x': 'hidden'
        }
    }
});

function App() {
    const styles = useStyles();
    const game = useRef(null);

    const changeToStoryBackground = () => {
        game.current.classList.remove(styles.use_main_background);
        game.current.classList.add(styles.use_story_background);
    };

    const changeToMainMenuBackground = () => {
        game.current.classList.remove(styles.use_story_background);
        game.current.classList.add(styles.use_main_background);
    };

    const AnimatedSwitch = withRouter(({location}) => {
        return (
            <TransitionGroup component={null}>
                <CSSTransition key={location.key} classNames={"route-switch"} timeout={1000}>
                    <Switch location={location}>
                        <Route path={'/'} component={() => <MainMenu change_to_mainmenu_background={changeToMainMenuBackground}/>} exact/>
                        <Route path={'/achievements'} component={AchievementsTable}/>
                        <Route path={'/story'} component={() => <StoryMode start_level={0}
                                                                           change_to_story_background={changeToStoryBackground}/>}/>
                    </Switch>
                </CSSTransition>
            </TransitionGroup>
        );
    });

    return (
        <DndProvider backend={HTML5Backend}>
            <Router>
                <Grid container justify={'center'} className={styles.root}>
                    <Grid container item direction={'column'} alignItems={'center'} className={styles.game} xs={12}
                          md={6} ref={game}>
                        <NavBar/>
                        <AnimatedSwitch/>
                    </Grid>
                </Grid>
            </Router>
        </DndProvider>
    );
}
export default App;
