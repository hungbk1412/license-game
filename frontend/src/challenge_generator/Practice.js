const generatePracticeTheoryLevel1 = () => {
    const licenses = ['CC_ZERO', 'CC_BY', 'CC_BY_SA', 'CC_BY_NC', 'CC_BY_NC_SA', 'CC_BY_ND', 'CC_BY_NC_ND'];
    const definitions = [
        `No constraints`,
        `Original authors must be credited`,
        `Original authors must be credited; redistribution with the exact same license`,
        `Original authors must be credited; commercial use is NOT allowed`,
        `Original authors must be credited; commercial use is NOT allowed; redistribution with the exact same license`,
        `Original authors must be credited; modification is NOT allowed`,
        `Original authors must be credited; modification is NOT allowed; commercial use is NOT allowed`
    ];
    return {
        symbols: licenses,
        meanings: definitions,
        numberOfMatches: 7,
        type: 'THEORY'
    };
};

const generatePracticeTheoryLevel2 = () => {
    return {
        symbols: ['Composition', 'Collage'],
        meanings: [
            'Resources are blended into the other and cannot be differentiated from each other',
            'Resources can be clearly differentiated from each other'
        ],
        numberOfMatches: 2,
        type: 'THEORY'
    }
};

// helper function for generatePracticeEditingLevel1
const containOnlyNDLicenses = (generated_result) => {
    for (let i = 0; i < generated_result.length; i++) {

        // check if the generated resource is licensed with ND license
        if (generated_result[i]['resource_type'] !== 'CC_BY_ND' && generated_result[i]['resource_type'] !== 'CC_BY_NC_ND') {
            return false;
        }
    }
    return true;
};

const generatePracticeEditingLevel1 = () => {
    const resource_types = ['audio', 'document', 'video', 'picture'];
    const licenses = ['CC_ZERO', 'CC_BY', 'CC_BY_SA', 'CC_BY_NC', 'CC_BY_NC_SA', 'CC_BY_ND', 'CC_BY_NC_ND'];
    let result = {
        type: 'EDITING',
        resources: []
    };
    for (let i = 0; i < 8; i++) {
        const resource = resource_types[Math.floor(Math.random() * 4)];
        const license = licenses[Math.floor(Math.random() * 7)];
        result.resources.push({
            resource_type: resource,
            license: license,
            has_been_chosen: false,
            resource_id: i
        });
    }
    if (containOnlyNDLicenses(result.resources)) {
        return generatePracticeEditingLevel1();
    }
    return result;
};

const generatePracticeEditingLevel2 = () => {
    const resource_types = ['audio', 'document', 'video', 'picture'];
    const licenses = ['CC_ZERO', 'CC_BY', 'CC_BY_SA', 'CC_BY_NC', 'CC_BY_NC_SA', 'CC_BY_ND', 'CC_BY_NC_ND'];
    let result = {
        type: 'EDITING',
        resources: []
    };
    for (let i = 0; i < 8; i++) {
        const resource = resource_types[Math.floor(Math.random() * 4)];
        const license = licenses[Math.floor(Math.random() * 7)];
        result.resources.push({
            resource_type: resource,
            license: license,
            has_been_chosen: false,
            resource_id: i
        });
    }
    if (containOnlyNDLicenses(result.resources)) {
        return generatePracticeEditingLevel1();
    }
    return result;
};

const generatePracticeEditingLevel3 = () => {
    const resource_types = ['audio', 'document', 'video', 'picture'];
    const licenses = ['CC_ZERO', 'CC_BY', 'CC_BY_SA', 'CC_BY_NC', 'CC_BY_NC_SA', 'CC_BY_ND', 'CC_BY_NC_ND'];
    let result = {
        type: 'EDITING',
        resources: []
    };
    for (let i = 0; i < 8; i++) {
        const resource = resource_types[Math.floor(Math.random() * 4)];
        const license = licenses[Math.floor(Math.random() * 7)];
        result.resources.push({
            resource_type: resource,
            license: license,
            has_been_chosen: false,
            resource_id: i
        });
    }
    if (containOnlyNDLicenses(result.resources)) {
        return generatePracticeEditingLevel1();
    }
    return result;
};

const practiceGenerator = ({type, level}) => {
    if (type === "THEORY") {
        switch (level) {
            case 1:
                return generatePracticeTheoryLevel1();
            case 2:
                return generatePracticeTheoryLevel2();
            default:
                return null;
        }
    } else if (type === "EDITING") {
        switch (level) {
            case 1:
                return generatePracticeEditingLevel1();
            case 2:
                return generatePracticeEditingLevel2();
            case 3:
                return generatePracticeEditingLevel3();
            default:
                return null;
        }
    }
};

export default practiceGenerator;