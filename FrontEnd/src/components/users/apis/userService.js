import axios from 'axios';
import { config } from "../../../config";

export const apiGetOne = (token) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url: `${config.API_ROOT}/api/v1/user/getOne`,
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
