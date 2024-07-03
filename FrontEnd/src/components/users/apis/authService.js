import axios from 'axios';

export const apiLoginEmail = (email) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url: 'http://localhost:5000/api/v1/auth/loginEmail',
            data: { email }
        })
        .then(response => {
            resolve(response);
        })
        .catch(error => {
            reject(error);
        });
    });
};
