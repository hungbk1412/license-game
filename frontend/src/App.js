import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import MainMenu from './MainMenu';
import CompositionOrCollage from './CompositionOrCollage';
import AchievementsTable from './AchievementsTable';
import StoryMode from "./StoryMode";
import Grid from '@material-ui/core/Grid';
import NavBar from './NavBar';
import {makeStyles} from '@material-ui/core/styles';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';


const useStyles = makeStyles({
    root: {
        border: '1px solid black',
        height: '1200px'
    },
    main_menu: {
        margin_top: '15px',
        margin_bottom: '15px'
    }
});

function App() {
    const styles = useStyles();
    return (
        <DndProvider backend={HTML5Backend}>
            <Router>
                <Grid container justify={'center'}>
                    <Grid container item direction={'column'} alignItems={'center'} className={styles.root} xs={12}
                          md={6}>
                        <NavBar/>
                        <Switch>
                            <Route path={'/practice'} component={CompositionOrCollage}/>
                            <Route path={'/achievements'} component={AchievementsTable}/>
                            <Route path={'/story'} component={StoryMode}/>
                            <Route path={'/'} component={MainMenu}/>
                        </Switch>
                    </Grid>
                </Grid>
            </Router>
        </DndProvider>
    );
}

export default App;
