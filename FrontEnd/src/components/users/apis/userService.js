import axios from 'axios';

export const apiGetOne = (token) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url: 'https://hellomilkyshop123.azurewebsites.net/api/v1/user/getOne',
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
