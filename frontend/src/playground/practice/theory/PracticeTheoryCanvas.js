import React, {useEffect, useRef} from 'react'
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
    canvas: {
        'position': 'absolute',
        'width': '100%',
        'height': '100%'
    }
});
const PracticeTheoryCanvas = (props) => {
    const canvasRef = useRef(null);
    const styles = useStyles();
    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
    });

    return (
        <canvas ref={canvasRef} {...props} className={styles.canvas}/>
    );

};

export default PracticeTheoryCanvas;