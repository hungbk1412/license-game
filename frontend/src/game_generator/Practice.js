import {licenseTypes, resourceTypes, practiceTypes} from "../Types";

const generatePracticeTheoryLevel0 = () => {
    let data = [
        {[licenseTypes.CC_ZERO]: `No constraints`},
        {[licenseTypes.CC_BY]: `Original authors must be credited`},
        {[licenseTypes.CC_BY_SA]: `Original authors must be credited; redistribution with the exact same license`},
        {[licenseTypes.CC_BY_NC]: `Original authors must be credited; commercial use is NOT allowed`}
    ];
    return {
        type: practiceTypes.THEORY,
        level: 0,
        data: data,
        numberOfMatches: 4
    };
};

const generatePracticeTheoryLevel1 = () => {
    let data = [
        {[licenseTypes.CC_BY_NC_SA]: `Original authors must be credited; commercial use is NOT allowed; redistribution with the exact same license`},
        {[licenseTypes.CC_BY_ND]: `Original authors must be credited; modification is NOT allowed`},
        {[licenseTypes.CC_BY_NC_ND]: `Original authors must be credited; modification is NOT allowed; commercial use is NOT allowed`},
    ];
    return {
        type: practiceTypes.THEORY,
        level: 1,
        data: data,
        numberOfMatches: 3
    };
};

const generatePracticeTheoryLevel2 = () => {
    let data = [
        {Composition: 'Resources are blended into the other and cannot be differentiated from each other'},
        {Collage: 'Resources can be clearly differentiated from each other'}
    ];
    return {
        type: practiceTypes.THEORY,
        level: 2,
        data: data,
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

const generatePracticeEditingLevel0 = (type) => {
    const resource_types = [resourceTypes.AUDIO, resourceTypes.DOCUMENT, resourceTypes.VIDEO, resourceTypes.PICTURE];
    const licenses = [licenseTypes.CC_ZERO, licenseTypes.CC_BY, licenseTypes.CC_BY_SA, licenseTypes.CC_BY_NC, licenseTypes.CC_BY_NC_SA, licenseTypes.CC_BY_ND, licenseTypes.CC_BY_NC_ND];
    let result = {
        type: type,
        level: 0,
        description: `Pick two resources and drop into the rectangle ${type}`,
        resources: []
    };

    for (let i = 0; i < 3; i++) {
        const resource = resource_types[Math.floor(Math.random() * 4)];
        const license = licenses[Math.floor(Math.random() * 7)];
        result.resources.push({
            resource_type: resource,
            license: license,
            resource_id: i + '-' + resource + '-' + license
        });
    }

    if (containOnlyNDLicenses(result.resources)) {
        return generatePracticeEditingLevel0();
    }

    return result;
};

const generatePracticeEditingLevel1 = (type) => {
    const resource_types = [resourceTypes.AUDIO, resourceTypes.DOCUMENT, resourceTypes.VIDEO, resourceTypes.PICTURE];
    const licenses = [licenseTypes.CC_ZERO, licenseTypes.CC_BY, licenseTypes.CC_BY_SA, licenseTypes.CC_BY_NC, licenseTypes.CC_BY_NC_SA, licenseTypes.CC_BY_ND, licenseTypes.CC_BY_NC_ND];

    let result = {
        type: type,
        level: 1,
        description: `Pick three resources and drop into the rectangle ${type}`,
        resources: []
    };

    for (let i = 0; i < 4; i++) {
        const resource = resource_types[Math.floor(Math.random() * 4)];
        const license = licenses[Math.floor(Math.random() * 7)];
        result.resources.push({
            resource_type: resource,
            license: license,
            resource_id: i + '-' + resource + '-' + license
        });
    }

    if (containOnlyNDLicenses(result.resources)) {
        return generatePracticeEditingLevel1();
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

const practiceEditingGenerator = (level, type) => {
    switch (level) {
        case 0:
            return generatePracticeEditingLevel0(type);
        case 1:
            return generatePracticeEditingLevel1(type);
        default:
            return null;
    }
};

export {practiceTheoryGenerator, practiceEditingGenerator};