import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
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

const useStyles = makeStyles({
    game: {
        'border': '1px solid black',
        'min-height': '100vh',
        'background-color': 'white',
        // 'backgroundImage': `url(${main_background})`,
        // 'background-size': '100% 100%'
    },
    root: {
        'background-color': '#6d3003'
    }
});

function App() {
    const styles = useStyles();
    return (
        <DndProvider backend={HTML5Backend}>
            <Router>
                <Grid container justify={'center'} className={styles.root}>
                    <Grid container item direction={'column'} alignItems={'center'} className={styles.game} xs={12}
                          md={6}>
                        <NavBar/>
                        <Switch>
                            <Route path={'/achievements'} component={AchievementsTable}/>
                            <Route path={'/story'} component={() => <StoryMode start_level={0}/>}/>
                            <Route path={'/'} component={MainMenu}/>
                        </Switch>
                    </Grid>
                </Grid>
            </Router>
        </DndProvider>
    );
}

export default App;
