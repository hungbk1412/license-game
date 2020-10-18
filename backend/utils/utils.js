const self = this;

exports.COMPATIBILITY_TABLE = {
  "cc_zero": {
    "cc_zero": "cc_zero",
    "cc_by": "cc_by",
    "cc_by_sa": "cc_by_sa",
    "cc_by_nc": "cc_by_nc",
    "cc_by_nd": false,
    "cc_by_nc_sa": "cc_by_nc_sa",
    "cc_by_nc_nd": false,
  },
  "cc_by": {
    "cc_zero": "cc_by",
    "cc_by": "cc_by",
    "cc_by_sa": "cc_by_sa",
    "cc_by_nc": "cc_by_nc",
    "cc_by_nd": false,
    "cc_by_nc_sa": "cc_by_nc_sa",
    "cc_by_nc_nd": false,
  },
  "cc_by_sa": {
    "cc_zero": "cc_by_sa",
    "cc_by": "cc_by_sa",
    "cc_by_sa": "cc_by_sa",
    "cc_by_nc": false,
    "cc_by_nd": false,
    "cc_by_nc_sa": false,
    "cc_by_nc_nd": false,
  },
  "cc_by_nc": {
    "cc_zero": "cc_by_nc",
    "cc_by": "cc_by_nc",
    "cc_by_sa": false,
    "cc_by_nc": "cc_by_nc",
    "cc_by_nd": false,
    "cc_by_nc_sa": "cc_by_nc_sa",
    "cc_by_nc_nd": false,
  },
  "cc_by_nd": {
    "cc_zero": false,
    "cc_by": false,
    "cc_by_sa": false,
    "cc_by_nc": false,
    "cc_by_nd": false,
    "cc_by_nc_sa": false,
    "cc_by_nc_nd": false,
  },
  "cc_by_nc_sa": {
    "cc_zero": "cc_by_nc_sa",
    "cc_by": "cc_by_nc_sa",
    "cc_by_sa": false,
    "cc_by_nc": "cc_by_nc",
    "cc_by_nd": false,
    "cc_by_nc_sa": "cc_by_nc_sa",
    "cc_by_nc_nd": false,
  },
  "cc_by_nc_nd": {
    "cc_zero": false,
    "cc_by": false,
    "cc_by_sa": false,
    "cc_by_nc": false,
    "cc_by_nd": false,
    "cc_by_nc_sa": false,
    "cc_by_nc_nd": false,
  },
};

exports.LICENSE_POWER_LEVEL = {
  "cc_zero": 1,
  "cc_by": 2,
  "cc_by_sa": 3,
  "cc_by_nc": 4,
  "cc_by_nd": 5,
  "cc_by_nc_sa": 6,
  "cc_by_nc_nd": 7,
}

exports.checkCompatibilityComposition = ({licenseArray, clientLicenseAnswer}) => {
  if (clientLicenseAnswer === false) {
    return {
      message: "The answer cannot be false"
    }
  }
  const NC_LICENSES = ["cc_by_nc", "cc_by_nc_nd"];
  let response = {
    message: null
  };
  for (let i = 0; i < licenseArray.length; i++) {
    response.licenseFinal = licenseArray[i];
    if (NC_LICENSES.includes(response.licenseFinal)) {
      break;
    }
  }
  if (NC_LICENSES.includes(response.licenseFinal) && !NC_LICENSES.includes(clientLicenseAnswer)) {
    response.message = "The answer must be cc_by_nc or cc_by_nc_nd";    
  }
  return response;
};

exports.checkCompatibilityCollage = ({licenseArray, clientLicenseAnswer}) => {
  let response = {
    licenseFinal: licenseArray[0],
    lastSource: [licenseArray[0]],    
    message: null
  };
  if (licenseArray.length === 1) {
    if (response.licenseFinal !== clientLicenseAnswer) {
      response.message = `${response.licenseFinal} !== ${clientLicenseAnswer}`
    }
    return response;
  }
  for (let i = 1; i < licenseArray.length; i++) {
    response.lastSource = [response.licenseFinal, licenseArray[i]];
    response.licenseFinal = self.COMPATIBILITY_TABLE[response.licenseFinal][licenseArray[i]];
    if (response.licenseFinal === false || self.LICENSE_POWER_LEVEL[response.licenseFinal] > self.LICENSE_POWER_LEVEL[clientLicenseAnswer]) {      
      break;
    }
  }
  if (response.licenseFinal !== clientLicenseAnswer) {
    response.message = `${response.lastSource[0]} + ${response.lastSource[1]} = ${response.licenseFinal} instead of ${clientLicenseAnswer}`;
  }
  return response;
};

console.log('object :>> ', self.checkCompatibilityCollage({
  licenseArray: ["cc_zero", "cc_by_sa"],
  clientLicenseAnswer: "cc_by"
}));