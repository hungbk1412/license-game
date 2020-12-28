import {licenseTypes, questionTypes, practiceTypes} from '../Types';

// For multiple_choice questions, declaring combination_type in the challenge is not necessary because the correct answer
// is fixed. Hence no request to the server will be made.

const generateLevel0 = () => {
    return {
        type: questionTypes.MULTIPLE_CHOICE,
        level: 0,
        practices:
            [
                {
                    id: 0,
                    type: practiceTypes.THEORY,
                    level: 0,
                    finished: false
                },
                {
                    id: 1,
                    type: practiceTypes.THEORY,
                    level: 1,
                    finished: false
                }
            ],
        context: 'Nowadays, swords are often made from steel',
        description_image: null,
        question: `Steel is an alloy of carbon and a mysterious metal X. Given that X
                   is associated with a CC license, which does not allow any commercial usages. What is X?`,
        choices: [
            {
                display_text: 'Aluminium (CC-BY)',
                CC_license: licenseTypes.CC_BY
            },
            {
                display_text: 'Copper (CC-BY-ND)',
                CC_license: licenseTypes.CC_BY_ND
            },
            {
                display_text: 'Iron (CC-BY-NC)',
                CC_license: licenseTypes.CC_BY_NC
            },
            {
                display_text: 'Zinc (CC-ZERO)',
                CC_license: licenseTypes.CC_ZERO
            }
        ],
        correctAnswer: 2
    };
};

const generateLevel1 = () => {
    return {
        type: questionTypes.MULTIPLE_CHOICE,
        level: 1,
        practices: [
            {
                id: 0,
                finished: false,
                type: practiceTypes.THEORY,
                level: 2
            },
            {
                id: 1,
                finished: false,
                type: practiceTypes.EDITING_COLLAGE,
                level: 0
            }
        ],
        context: `Ok, so to make steel, we need to mix iron and carbon, but at which ratio?
                  Too little carbon makes the sword soft, too much carbon makes the sword can be broken easily`,
        description_image: null,
        question: `How much carbon should we use to make the steel? Given that steel is a COLLAGE of carbon and iron. The steel should be CC-BY-SA
                   and the iron should be CC-ZERO`,
        choices: [
            {
                display_text: 'From 0.2% to 1.5% (CC-BY-NC)',
                CC_license: licenseTypes.CC_BY_NC
            },
            {
                display_text: 'From 1.5% to 2.3% (CC-BY-ND)',
                CC_license: licenseTypes.CC_BY_ND
            },
            {
                display_text: 'From 2.3% to 3.0% (CC-BY)',
                CC_license: licenseTypes.CC_BY
            },
            {
                display_text: 'From 3.0% to 4.1% (CC-ZERO)',
                CC_license: licenseTypes.CC_ZERO
            }
        ],
        correctAnswer: 0
    };
};

const generateLevel2 = () => {
    return {
        type: questionTypes.MULTIPLE_CHOICE,
        level: 2,
        practices: [
            {
                id: 0,
                finished: false,
                type: practiceTypes.EDITING_COMPOSITION,
                level: 0
            },
            {
                id: 1,
                finished: false,
                type: practiceTypes.EDITING_COMPOSITION,
                level: 1
            }
        ],
        context: `A royal gift has to be flawless. Iron and carbon are not enough. The king want the sword to last after decades.
                  Therefore, we will put a secret substance into our steel. This small addition is what make you the best blacksmith of the country`,
        description_image: null,
        question: `Given that steel is a COLLAGE of carbon, iron and secret substance X. The steel, the iron and the carbon are respectively
        CC-BY-SA-NC, CC-ZERO and CC-BY-NC. What is X?`,
        choices: [
            {
                display_text: 'Chromium (CC-BY-SA)',
                CC_license: licenseTypes.CC_BY_SA
            },
            {
                display_text: 'Tungsten (CC-BY-NC-SA)',
                CC_license: licenseTypes.CC_BY_NC_SA
            },
            {
                display_text: 'Nickel (CC-BY-ND)',
                CC_license: licenseTypes.CC_BY_ND
            },
            {
                display_text: 'Manganese (CC-ZERO)',
                CC_license: licenseTypes.CC_ZERO
            }
        ],
        correctAnswer: 1
    };
};

const generateLevel3 = () => {
    const blade_license = licenseTypes.CC_BY;

    return {
        type: questionTypes.SELF_GENERATED,
        combination_type: 'composition',
        level: 3,
        context: `After several days of hard working, we forged a fine blade. Our job now is to attach the blade to a hilt.`,
        description_image: null,
        question: `Given that the sword is a COMPOSITION of the blade and the hilt and the blade is ${blade_license}. Our beloved king granted you the freedom to choose
                   any style of hilt you feel suitable.`,
        choices: [
            {
                display_text: 'Italian Style (CC-BY-SA)',
                CC_license: licenseTypes.CC_BY_SA
            },
            {
                display_text: 'Western Europe Style (CC-BY-NC-SA)',
                CC_license: licenseTypes.CC_BY_NC_SA
            },
            {
                display_text: 'Eastern Europe Style (CC-BY-ND)',
                CC_license: licenseTypes.CC_BY_ND
            },
            {
                display_text: 'England Style (CC-ZERO)',
                CC_license: licenseTypes.CC_ZERO
            }
        ],
        correctAnswer: null,
        oer_resources: [blade_license]
    };
};

const generateLevel4 = () => {
    return {
        type: questionTypes.SELF_GENERATED_WITH_TWO_CHOICES,
        level: 4,
        context: `Because the sword is a royal gift, our king would like to add some gems to the sword`,
        description_image: null,
        question: `Please choose two types of gem to attach to the sword. As a special request from the king himself, the final sword must not be CC_BY_ND or CC_BY_NC_ND. This is a COMPOSITION`,
        choices: [
            {
                display_text: 'Ruby (CC-BY-SA)',
                CC_license: licenseTypes.CC_BY_SA
            },
            {
                display_text: 'Diamond (CC-BY-NC-SA)',
                CC_license: licenseTypes.CC_BY_NC_SA
            },
            {
                display_text: 'Sapphire (CC-BY-ND)',
                CC_license: licenseTypes.CC_BY_ND
            },
            {
                display_text: 'Pearl (CC-ZERO)',
                CC_license: licenseTypes.CC_ZERO
            }
        ],
        correctAnswer: null,
        oer_resources: [],
        combination_type: 'composition',
        require_result_of_levels: [3],
        licenses_to_be_excluded_from_answer: [licenseTypes.CC_BY_ND, licenseTypes.CC_BY_NC_ND]
    };
};

const generateLevel5 = () => {
    return {
        type: questionTypes.MULTIPLE_CHOICE,
        level: 5,
        context: `Now we need to prepare a sword box`,
        description_image: null,
        question: `The sword box is built up from three main components: the wooden box (CC-Zero), the lock (CC-BY-NC),
         and the decoration silk inside the box (CC-BY-NC-SA). This is a COLLAGE. What is the license of the box?`,
        choices: [
            {
                display_text: 'CC-BY-SA',
                CC_license: licenseTypes.CC_BY_SA
            },
            {
                display_text: 'CC-BY-NC-SA',
                CC_license: licenseTypes.CC_BY_NC_SA
            },
            {
                display_text: 'CC-BY-ND',
                CC_license: licenseTypes.CC_BY_ND
            },
            {
                display_text: 'CC-ZERO',
                CC_license: licenseTypes.CC_ZERO
            }
        ],
        correctAnswer: 1,
        oer_resources: []
    };
};

const generateLevel6 = () => {
    return {
        type: questionTypes.MULTIPLE_CHOICE,
        level: 6,
        context: `Finally, the gift is completed. Let's put the sword in the box`,
        description_image: null,
        question: `The gift is a COLLAGE of the sword and the box. What license should this gift have?`,
        choices: [
            {
                display_text: null,
                CC_license: null
            },
            {
                display_text: null,
                CC_license: null
            },
            {
                display_text: null,
                CC_license: null
            },
            {
                display_text: null,
                CC_license: null
            }
        ],
        correctAnswer: 0,
        oer_resources: [],
        require_result_of_levels: [4, 5],
        combination_type: 'collage'
    };
};

const challengeGenerator = (level) => {
    let result = {};
    switch (level) {
        case 0:
            result = generateLevel0();
            break;
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
        default:
            break;
    }

    return result;
};

export default challengeGenerator;