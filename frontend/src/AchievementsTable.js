import React from 'react';
import Grid from "@material-ui/core/Grid";
import Achievement from "./Achievement";
import {makeStyles} from "@material-ui/core/styles";
import Navbar from "./Navbar";

const useStyles = makeStyles({
    root: {
        'margin-top': '50px'
    }
});
const AchievementsTable = () => {
    const styles = useStyles();
    return (
        <Grid container item direction={'column'} xs={11}>
            <Grid item>
                <h1>My Achievements</h1>
            </Grid>
            <Grid container item direction={'column'} alignItems={'center'}>
                <Achievement/>
                <Achievement/>
                <Achievement/>
                <Achievement/>
                <Achievement/>
                <Achievement/>
            </Grid>
        </Grid>
    );
};

export default AchievementsTable;