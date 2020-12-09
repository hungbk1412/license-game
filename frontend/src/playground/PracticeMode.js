import React from 'react';
import PracticeEditing from "./PracticeEditing";
import PracticeTheory from "./PracticeTheory";

function PracticeMode(props) {
    if (props.practiceLevel.type === "THEORY") {
        return <PracticeTheory {...props}/>
    } else if (props.practiceLevel.type === "EDITING") {
        return <PracticeEditing {...props}/>
    } else {
        return <div>Loi roi</div>;
    }
}

export default PracticeMode;
