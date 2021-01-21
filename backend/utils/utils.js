const self = this;

exports.COMPATIBILITY_TABLE = {
    'cc_zero': {
        'cc_zero': 'cc_zero',
        'cc_by': 'cc_by',
        'cc_by_sa': 'cc_by_sa',
        'cc_by_nc': 'cc_by_nc',
        'cc_by_nd': false,
        'cc_by_nc_sa': 'cc_by_nc_sa',
        'cc_by_nc_nd': false,
    },
    'cc_by': {
        'cc_zero': 'cc_by',
        'cc_by': 'cc_by',
        'cc_by_sa': 'cc_by_sa',
        'cc_by_nc': 'cc_by_nc',
        'cc_by_nd': false,
        'cc_by_nc_sa': 'cc_by_nc_sa',
        'cc_by_nc_nd': false,
    },
    'cc_by_sa': {
        'cc_zero': 'cc_by_sa',
        'cc_by': 'cc_by_sa',
        'cc_by_sa': 'cc_by_sa',
        'cc_by_nc': false,
        'cc_by_nd': false,
        'cc_by_nc_sa': false,
        'cc_by_nc_nd': false,
    },
    'cc_by_nc': {
        'cc_zero': 'cc_by_nc',
        'cc_by': 'cc_by_nc',
        'cc_by_sa': false,
        'cc_by_nc': 'cc_by_nc',
        'cc_by_nd': false,
        'cc_by_nc_sa': 'cc_by_nc_sa',
        'cc_by_nc_nd': false,
    },
    'cc_by_nd': {
        'cc_zero': false,
        'cc_by': false,
        'cc_by_sa': false,
        'cc_by_nc': false,
        'cc_by_nd': false,
        'cc_by_nc_sa': false,
        'cc_by_nc_nd': false,
    },
    'cc_by_nc_sa': {
        'cc_zero': 'cc_by_nc_sa',
        'cc_by': 'cc_by_nc_sa',
        'cc_by_sa': false,
        'cc_by_nc': 'cc_by_nc',
        'cc_by_nd': false,
        'cc_by_nc_sa': 'cc_by_nc_sa',
        'cc_by_nc_nd': false,
    },
    'cc_by_nc_nd': {
        'cc_zero': false,
        'cc_by': false,
        'cc_by_sa': false,
        'cc_by_nc': false,
        'cc_by_nd': false,
        'cc_by_nc_sa': false,
        'cc_by_nc_nd': false,
    },
};

exports.LICENSE_POWER_LEVEL = {
    'cc_zero': 1,
    'cc_by': 2,
    'cc_by_sa': 3,
    'cc_by_nc': 4,
    'cc_by_nd': 5,
    'cc_by_nc_sa': 6,
    'cc_by_nc_nd': 7,
};

exports.checkCompatibilityComposition = ({licenseArray, clientLicenseAnswer}) => {
    clientLicenseAnswer = clientLicenseAnswer.toLowerCase();
    if (clientLicenseAnswer === 'none') {
        return {
            error_message: 'The answer cannot be none'
        }
    }
    const NC_LICENSES = ['cc_by_nc', 'cc_by_nc_nd', 'cc_by_nc_sa'];
    let checker = false;
    let response = {
        error_message: null,
        result: true
    };

    for (let i = 0; i < licenseArray.length; i++) {
        licenseArray[i] = licenseArray[i].toLowerCase();
        if (NC_LICENSES.includes(licenseArray[i])) {
            checker = true;
        }
    }

    if (checker && !NC_LICENSES.includes(clientLicenseAnswer)) {
        response.error_message = 'The answer must contain NC license';
        response.result = false;
    } else {
        response.result = true;
    }
    return response;
};

exports.checkCompatibilityCollage = ({licenseArray, clientLicenseAnswer}) => {
    clientLicenseAnswer = clientLicenseAnswer.toLowerCase();
    console.log(clientLicenseAnswer);
    for (let i = 0; i < licenseArray.length; i++) {
        licenseArray[i] = licenseArray[i].toLowerCase();
    }

    let response = {
        correctAnswer: licenseArray[0],
        lastSource: [licenseArray[0]],
        error_message: null,
        result: true
    };

    if (licenseArray.length === 1) {
        if (response.correctAnswer !== clientLicenseAnswer) {
            response.error_message = `${response.correctAnswer} !== ${clientLicenseAnswer}`;
            response.result = false;
        }
        return response;
    }

    for (let i = 1; i < licenseArray.length; i++) {
        response.lastSource = [response.correctAnswer, licenseArray[i]];
        response.correctAnswer = self.COMPATIBILITY_TABLE[response.correctAnswer][licenseArray[i]] ? self.COMPATIBILITY_TABLE[response.correctAnswer][licenseArray[i]] : 'none';
        if (response.correctAnswer === 'none' || self.LICENSE_POWER_LEVEL[response.correctAnswer] > self.LICENSE_POWER_LEVEL[clientLicenseAnswer]) {
            break;
        }
    }

    if (response.correctAnswer !== clientLicenseAnswer) {
        response.error_message = `${response.lastSource[0]} + ${response.lastSource[1]} = ${response.correctAnswer} instead of ${clientLicenseAnswer}`;
        response.result = false;
    }

    return response;
};