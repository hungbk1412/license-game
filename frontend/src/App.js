import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import MainMenu from './MainMenu';
import CompositionOrCollage from './CompositionOrCollage';
import ArcadeMode from './ArcadeMode';
import AchievementsTable from './AchievementsTable';
import StoryMode from "./StoryMode";
import Grid from '@material-ui/core/Grid';
import Navbar from './Navbar';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        border: '1px solid black',
        height: '1000px'
    },
    main_menu: {
        margin_top: '15px',
        margin_bottom: '15px'
    }
});

function App() {
    const styles = useStyles();
    return (
        <Router>
            <Grid container justify={'center'}>
                <Grid container item direction={'column'} alignItems={'center'} className={styles.root} xs={12} md={6}>
                    <Navbar/>
                    <Switch>
                        <Route path={'/choose-mode'} component={CompositionOrCollage}/>
                        <Route path={'/arcade'} component={ArcadeMode}/>
                        <Route path={'/achievements'} component={AchievementsTable}/>
                        <Route path={'/story'} component={StoryMode}/>
                        <Route path={'/'} component={MainMenu}/>
                    </Switch>
                </Grid>
            </Grid>
        </Router>
    );
}

export default App;
