import { BASE_URL_API } from './definitions/config';
import { API_PATH } from './definitions/api';

const checkCompatible = (token, combinationType, licenseArray, finalLicense) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            type: combinationType,
            clientLicenseAnswer: finalLicense,
            licenseArray: licenseArray
        })
    };
    return fetch(BASE_URL_API + API_PATH.CHECK_COMPATIBLE, requestOptions)
        .then(res => res.json())
        .catch(e => console.log(e));
};

export {checkCompatible}