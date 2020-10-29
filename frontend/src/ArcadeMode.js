import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ResourceInArcade from './ResourceInArcade';
import {useDrop} from "react-dnd";
import ItemTypes from './ItemTypes';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Form from 'react-bootstrap/Form';

const useStyles = makeStyles({
    result_box: {
        'border': '1px solid black',
        'height': '200px',
        'margin-top': '100px'
    },
    submit_button: {
        'margin-top': '100px'
    },
    pop_up: {
        'position': 'absolute',
        'width': '400px',
        'height': '200px',
        'top': '50%',
        'left': '50%',
        'transform': 'translate(-50%,-50%)'
    }
});

function ArcadeMode() {
    const styles = useStyles();
    const [chosen_resources, set_chosen_resources] = useState([]);
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [{isOver}, drop] = useDrop({
        accept: ItemTypes.ARCADE_RESOURCE,
        drop: (item, monitor) => {
            set_chosen_resources([...chosen_resources, item.resource_id])
        },
        collect: monitor => ({
            isOver: !!monitor.isOver()
        })
    });

    return (
        <Grid container item direction={'column'} spacing={10}>
            <Modal open={open}
                   onClose={handleClose}
                   aria-labelledby="simple-modal-title"
                   aria-describedby="simple-modal-description">
                <Paper className={styles.pop_up}>
                    <Form>
                        <Grid container direction={'column'} alignItems={'center'}>
                            <Form.Group controlId="exampleForm.SelectCustom">
                                <Form.Label>Now you need to license</Form.Label>
                                <Form.Control as="select" custom>
                                    <option>CC</option>
                                    <option>CC-BY</option>
                                    <option>CC-BY-SA</option>
                                    <option>CC-BY-NC</option>
                                    <option>CC-BY-NC-SA</option>
                                    <option>CC-BY-ND</option>
                                    <option>CC-BY-NC-ND</option>
                                </Form.Control>
                            </Form.Group>
                            <Button variant={'contained'} type={'submit'}>
                                Submit
                            </Button>
                        </Grid>
                    </Form>
                </Paper>
            </Modal>
            <Grid container item justify={'center'}>
                <Grid container item direction={'row'} justify={'space-around'} alignItems={'center'}
                      className={styles.result_box} xs={8} ref={drop}>
                    {chosen_resources.map(resource_id => {
                        return (<ResourceInArcade key={resource_id} id={resource_id} width={'50px'}/>)
                    })}
                </Grid>
            </Grid>
            <Grid container item spacing={4}>
                <Grid container item xs={3} justify={'center'}>
                    <ResourceInArcade id={Math.floor(Math.random() * 1000)} width={'100px'}/>
                </Grid>
                <Grid container item xs={3} justify={'center'}>
                    <ResourceInArcade id={Math.floor(Math.random() * 1000)} width={'100px'}/>
                </Grid>
                <Grid container item xs={3} justify={'center'}>
                    <ResourceInArcade id={Math.floor(Math.random() * 1000)} width={'100px'}/>
                </Grid>
                <Grid container item xs={3} justify={'center'}>
                    <ResourceInArcade id={Math.floor(Math.random() * 1000)} width={'100px'}/>
                </Grid>
                <Grid container item xs={3} justify={'center'}>
                    <ResourceInArcade id={Math.floor(Math.random() * 1000)} width={'100px'}/>
                </Grid>
                <Grid container item xs={3} justify={'center'}>
                    <ResourceInArcade id={Math.floor(Math.random() * 1000)} width={'100px'}/>
                </Grid>
                <Grid container item xs={3} justify={'center'}>
                    <ResourceInArcade id={Math.floor(Math.random() * 1000)} width={'100px'}/>
                </Grid>
                <Grid container item xs={3} justify={'center'}>
                    <ResourceInArcade id={Math.floor(Math.random() * 1000)} width={'100px'}/>
                </Grid>
            </Grid>
            <Grid container item justify={'center'} className={styles.submit_button}>
                <Grid item xs={3}>
                    <Button variant={'contained'} fullWidth onClick={handleOpen}>Submit</Button>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default ArcadeMode;
