let BACKEND_BASE_URL_API = '';
if (process.env.NODE_ENV === 'prod') {
    BACKEND_BASE_URL_API = 'http://backend:5000/api/v1';
} else {
    BACKEND_BASE_URL_API = 'http://localhost:5000/api/v1';
}


export {BACKEND_BASE_URL_API};