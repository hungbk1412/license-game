import React from "react";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({});
const Introduction = (props) => {
    const styles = useStyles();
    const set_seen_introduction = props.set_seen_introduction;
    return (
        <Grid container item className={styles.root}></Grid>
    );
};

export default Introduction