import React from 'react';
import PracticeEditing from "./editing/PracticeEditing";
import PracticeTheory from "./theory/PracticeTheory";
import {gameTypes} from "../../../definitions/Types";

function PracticeMode(props) {
    const practice = props.practice;
    if (practice.type === gameTypes.PRACTICE_THEORY) {
        return <PracticeTheory practice={practice}/>
    } else if (practice.type === gameTypes.PRACTICE_EDITING_COLLAGE || practice.type === gameTypes.PRACTICE_EDITING_COMPOSITION) {
        return <PracticeEditing practice={practice}/>
    } else {
        return <div>Loi roi</div>;
    }
}

export default PracticeMode;
