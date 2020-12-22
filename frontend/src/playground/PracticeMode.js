import React from 'react';
import PracticeEditing from "./PracticeEditing";
import PracticeTheory from "./PracticeTheory";
import {practiceTypes} from "../Types";
import {practiceTheoryGenerator, practiceEditingGenerator} from "../game_generator/Practice";

function PracticeMode(props) {
    if (props.practice.type === practiceTypes.THEORY) {
        let practice = practiceTheoryGenerator(props.practice.level);
        return <PracticeTheory practice={practice} finishPractice={props.finishPractice} practice_id={props.practice.id}/>
    } else if (props.practice.type === practiceTypes.EDITING_COLLAGE || props.practice.type === practiceTypes.EDITING_COMPOSITION) {
        let practice = practiceEditingGenerator(props.practice.level, props.practice.type);
        return <PracticeEditing practice={practice} finishPractice={props.finishPractice} practice_id={props.practice.id}/>
    } else {
        return <div>Loi roi</div>;
    }
}

export default PracticeMode;
