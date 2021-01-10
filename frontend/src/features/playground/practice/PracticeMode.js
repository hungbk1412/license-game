import React from 'react';
import PracticeEditing from "./editing/PracticeEditing";
import PracticeTheory from "./theory/PracticeTheory";
import {practiceTypes} from "../../../definitions/Types";

function PracticeMode(props) {
    const practice = props.practice;
    if (practice.type === practiceTypes.THEORY) {
        return <PracticeTheory practice={practice}/>
    } else if (practice.type === practiceTypes.EDITING_COLLAGE || practice.type === practiceTypes.EDITING_COMPOSITION) {
        return <PracticeEditing practice={practice}/>
    } else {
        return <div>Loi roi</div>;
    }
}

export default PracticeMode;
