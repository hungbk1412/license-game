import {licenseTypes, resourceTypes, practiceTypes} from "../Types";

const generatePracticeTheoryLevel0 = () => {
    const licenses = [licenseTypes.CC_ZERO, licenseTypes.CC_BY, licenseTypes.CC_BY_SA, licenseTypes.CC_BY_NC];
    const definitions = [
        `No constraints`,
        `Original authors must be credited`,
        `Original authors must be credited; redistribution with the exact same license`,
        `Original authors must be credited; commercial use is NOT allowed`
    ];
    return {
        type: practiceTypes.THEORY,
        level: 0,
        symbols: licenses,
        meanings: definitions,
        numberOfMatches: 4
    };
};

const generatePracticeTheoryLevel1 = () => {
    const licenses = [licenseTypes.CC_BY_NC_SA, licenseTypes.CC_BY_ND, licenseTypes.CC_BY_NC_ND];
    const definitions = [
        `Original authors must be credited; commercial use is NOT allowed; redistribution with the exact same license`,
        `Original authors must be credited; modification is NOT allowed`,
        `Original authors must be credited; modification is NOT allowed; commercial use is NOT allowed`
    ];
    return {
        type: practiceTypes.THEORY,
        level: 1,
        symbols: licenses,
        meanings: definitions,
        numberOfMatches: 3
    };
};

const generatePracticeTheoryLevel2 = () => {
    return {
        type: practiceTypes.THEORY,
        level: 2,
        symbols: ['Composition', 'Collage'],
        meanings: [
            'Resources are blended into the other and cannot be differentiated from each other',
            'Resources can be clearly differentiated from each other'
        ],
        numberOfMatches: 2
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

const generatePracticeEditingLevel0 = () => {
    const resource_types = [resourceTypes.AUDIO, resourceTypes.DOCUMENT, resourceTypes.VIDEO, resourceTypes.PICTURE];
    const licenses = [licenseTypes.CC_ZERO, licenseTypes.CC_BY, licenseTypes.CC_BY_SA, licenseTypes.CC_BY_NC, licenseTypes.CC_BY_NC_SA, licenseTypes.CC_BY_ND, licenseTypes.CC_BY_NC_ND];
    let result = {
        type: practiceTypes.EDITING,
        level: 0,
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
        return generatePracticeEditingLevel0();
    }
    return result;
};

const generatePracticeEditingLevel1 = () => {
    const resource_types = [resourceTypes.AUDIO, resourceTypes.DOCUMENT, resourceTypes.VIDEO, resourceTypes.PICTURE];
    const licenses = [licenseTypes.CC_ZERO, licenseTypes.CC_BY, licenseTypes.CC_BY_SA, licenseTypes.CC_BY_NC, licenseTypes.CC_BY_NC_SA, licenseTypes.CC_BY_ND, licenseTypes.CC_BY_NC_ND];

    let result = {
        type: practiceTypes.EDITING,
        level: 1,
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
    const resource_types = [resourceTypes.AUDIO, resourceTypes.DOCUMENT, resourceTypes.VIDEO, resourceTypes.PICTURE];
    const licenses = [licenseTypes.CC_ZERO, licenseTypes.CC_BY, licenseTypes.CC_BY_SA, licenseTypes.CC_BY_NC, licenseTypes.CC_BY_NC_SA, licenseTypes.CC_BY_ND, licenseTypes.CC_BY_NC_ND];

    let result = {
        type: practiceTypes.EDITING,
        level: 2,
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
        return generatePracticeEditingLevel2();
    }
    return result;
};

const practiceTheoryGenerator = (level) => {
    switch (level) {
        case 0:
            return generatePracticeTheoryLevel0();
        case 1:
            return generatePracticeTheoryLevel1();
        case 2:
            return generatePracticeTheoryLevel2();
        default:
            return null;
    }
};

const practiceEditingGenerator = (level) => {
    switch (level) {
        case 0:
            return generatePracticeEditingLevel0();
        case 1:
            return generatePracticeEditingLevel1();
        case 2:
            return generatePracticeEditingLevel2();
        default:
            return null;
    }
};

export {practiceTheoryGenerator, practiceEditingGenerator};