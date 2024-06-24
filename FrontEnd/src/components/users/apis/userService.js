import axios from 'axios';

export const apiGetOne = (token) => new Promise(async(resolve, reject) => {
    try {
        let response = await axios({
            method: 'get',
            url: 'http://localhost:5000/api/v1/user/getOne',
            headers: {
                Authorization: token
            }
        })
        resolve(response);
    } catch (error) {
        reject(error);
    }
})