import React from 'react';
import PracticeEditing from "./editing/PracticeEditing";
import PracticeTheory from "./theory/PracticeTheory";
import {practiceTypes} from "../../definitions/Types";
import {practiceTheoryGenerator, practiceEditingGenerator} from "../../game_generator/Practice";

function PracticeMode(props) {
    if (props.practice.type === practiceTypes.THEORY) {
        const practice = practiceTheoryGenerator(props.practice.level);
        return <PracticeTheory practice={practice} finishPractice={props.finishPractice} id_within_story={props.practice.id}/>
    } else if (props.practice.type === practiceTypes.EDITING_COLLAGE || props.practice.type === practiceTypes.EDITING_COMPOSITION) {
        const practice = practiceEditingGenerator(props.practice.level, props.practice.type);
        return <PracticeEditing practice={practice} finishPractice={props.finishPractice} id_within_story={props.practice.id}/>
    } else {
        return <div>Loi roi</div>;
    }
}

export default PracticeMode;
