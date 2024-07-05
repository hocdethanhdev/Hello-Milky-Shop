import axios from 'axios';
import config from "../../config/config";

export const apiLoginEmail = (email) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url: `${config.API_ROOT}/api/v1/auth/loginEmail`,
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
