import React, {useState} from 'react';
import Paper from "@material-ui/core/Paper";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Modal from "@material-ui/core/Modal";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    pop_up: {
        'position': 'absolute',
        'width': '300px',
        'height': '150px',
        'top': '50%',
        'left': '50%',
        'transform': 'translate(-50%,-50%)',
        'padding-top': '30px',
        'padding-left': '10px'
    }
});
const Setting = (props) => {
    const styles = useStyles();
    const [gameSound, setGameSound] = useState(true);
    const [gameMusic, setGameMusic] = useState(true);

    return (
        <Modal open={props.settingStatus}
               onClose={props.handleCloseSetting}
               aria-labelledby="simple-modal-title"
               aria-describedby="simple-modal-description">
            <Paper className={styles.pop_up}>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Sound</FormLabel>
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox checked={gameSound} onChange={() => setGameSound(!gameSound)}
                                               name="gilad"/>}
                            label={'Game Sound'}
                        />
                        <FormControlLabel
                            control={<Checkbox checked={gameMusic} onChange={() => setGameMusic(!gameMusic)}
                                               name="jason"/>}
                            label={'Game Music'}
                        />
                    </FormGroup>
                </FormControl>
            </Paper>
        </Modal>
    );
};

export default Setting;