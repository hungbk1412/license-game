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
    return fetch('http://localhost:5000/', requestOptions)
        .then(res => res.json())
        .catch(e => console.log(e));
};

export {checkCompatible}