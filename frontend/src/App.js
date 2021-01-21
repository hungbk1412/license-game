import React, {useEffect, useRef} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    withRouter
} from 'react-router-dom';
import MainMenu from './pages/mainmenu/MainMenu';
import ChooseLevel from "./pages/playground/choose_level/ChooseLevel";
import Grid from '@material-ui/core/Grid';
import NavBar from './pages/navbar/NavBar';
import {makeStyles} from '@material-ui/core/styles';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import {TransitionGroup, CSSTransition} from "react-transition-group";
import './App.css';
import {useDispatch} from "react-redux";
import {init_fetch_game_progress} from "./pages/playground/story/GameProgressSlice";
import HighScoreBoard from "./pages/high_score/HighScoreBoard";
import {main_background} from "./images";

const useStyles = makeStyles(theme => {
    return {
        game: {
            'position': 'relative',
            'border': '1px solid black',
            'height': '100vh',
            'background-image': `url(${main_background})`,
            'background-size': '100% 100%'
        },
        root: {
            'background-color': '#6d3003',
            'overflow': 'hidden'
        }
    }
});

function App() {
    const styles = useStyles();
    const dispatch = useDispatch();
    const game = useRef(null);

    const AnimatedSwitch = withRouter(({location}) => {
        return (
            <TransitionGroup component={null}>
                <CSSTransition key={location.key} classNames={"route-switch"} timeout={1000}>
                    <Switch location={location}>
                        <Route path={'/'}
                               component={() => <MainMenu/>}
                               exact/>
                        <Route path={'/play'} component={() => <ChooseLevel/>} exact/>
                        <Route path={'/high-score'} component={HighScoreBoard} exact/>
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
