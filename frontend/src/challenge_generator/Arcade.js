const containOnlyNDLicenses = (generated_result) => {
    for (let i = 0; i < generated_result.length; i++) {

        // check if the generated resource is licensed with ND license
        if (generated_result[i]['resource_type'] !== 'CC_BY_ND' && generated_result[i]['resource_type'] !== 'CC_BY_NC_ND') {
            return false;
        }
    }
    return true;
};

const challengeGenerator = () => {
    const resource_types = ['audio', 'document', 'video', 'picture'];
    const licenses = ['CC_ZERO', 'CC_BY', 'CC_BY_SA', 'CC_BY_NC', 'CC_BY_NC_SA', 'CC_BY_ND', 'CC_BY_NC_ND'];
    let result = [];
    for (let i = 0; i < 8; i++) {
        const resource = resource_types[Math.floor(Math.random() * 4)];
        const license = licenses[Math.floor(Math.random() * 7)];
        result.push({
            resource_type: resource,
            license: license,
            has_been_chosen: false,
            resource_id: i
        });
    }
    if (containOnlyNDLicenses(result)) {
        return challengeGenerator();
    }
    return result;
};

export default challengeGenerator;