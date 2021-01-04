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
        .then(res => {
            return res.json();
        })
        .catch(e => {
            throw (e);
        });
};

const getProgress = (token, level) => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    };
    return fetch(BASE_URL_API + API_PATH.PROGRESS_GET, requestOptions)
        .then(res => {
            return res;
        })
        .catch(e => {
            throw (e);
        });
};

const postProgress = (token, level) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            level
        })
    };
    console.log('requestOptions :>> ', requestOptions);
    return fetch(BASE_URL_API + API_PATH.PROGRESS_POST, requestOptions)
        .then(res => {
            return res;
        })
        .catch(e => {
            throw (e);
        });
};

export {checkCompatible, getProgress, postProgress}