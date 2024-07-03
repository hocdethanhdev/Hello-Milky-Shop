import axios from 'axios';

export const apiGetOne = (token) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url: 'http://localhost:5000/api/v1/user/getOne',
            headers: {
                Authorization: token
            }
        })
        .then(response => {
            resolve(response);
        })
        .catch(error => {
            reject(error);
        });
    });
};
