import React from 'react';
import Grid from "@material-ui/core/Grid";
import Achievement from "./Achievement";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: {
        'margin-top': '50px'
    }
});
const AchievementsTable = () => {
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