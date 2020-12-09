import {iron_ore} from "../images";

const generateLevel1 = () => {
    return {
        type: 'MULTIPLE_CHOICE',
        context: null,
        description_image: iron_ore,
        question: `Steel is an alloy of carbon and a mysterious metal X. Given that X
                    is associated with a CC license, which does not allow any commercial usages. What is X?`,
        choices: ['Iron (CC-BY-NC)', 'Copper (CC-BY-ND)', 'Aluminium (CC-BY)', 'Zinc (CC-ZERO)'],
        correctAnswer: 0
    };
};

const generateLevel2 = () => {
    return {
        type: 'MULTIPLE_CHOICE',
        context: null,
        description_image: iron_ore,
        question: `Steel is an alloy of carbon and a mysterious metal X. Given that X
                    is associated with a CC license, which does not allow any commercial usages. What is X?`,
        choices: ['Iron (CC-BY-NC)', 'Copper (CC-BY-ND)', 'Aluminium (CC-BY)', 'Zinc (CC-ZERO)'],
        correctAnswer: 0
    };
};

const generateLevel3 = () => {

};

const generateLevel4 = () => {

};

const generateLevel5 = () => {

};

const generateLevel6 = () => {

};

const generateLevel7 = () => {

};

const generateLevel8 = () => {

};

const challengeGenerator = (level) => {
    let result = {};
    switch (level) {
        case 1:
            result = generateLevel1();
            break;
        case 2:
            result = generateLevel2();
            break;
        case 3:
            result = generateLevel3();
            break;
        case 4:
            result = generateLevel4();
            break;
        case 5:
            result = generateLevel5();
            break;
        case 6:
            result = generateLevel6();
            break;
        case 7:
            result = generateLevel7();
            break;
        case 8:
            result = generateLevel8();
            break;
        default:
            break;
    }

    return result;
};

export default challengeGenerator;