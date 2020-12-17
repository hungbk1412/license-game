import React from 'react';
import PracticeEditing from "./PracticeEditing";
import PracticeTheory from "./PracticeTheory";
import {practiceTypes} from "../Types";

function PracticeMode(props) {
    if (props.practice_type === practiceTypes.THEORY) {
        return <PracticeTheory {...props}/>
    } else if (props.practice_type === practiceTypes.EDITING) {
        return <PracticeEditing {...props}/>
    } else {
        return <div>Loi roi</div>;
    }
}

export default PracticeMode;
