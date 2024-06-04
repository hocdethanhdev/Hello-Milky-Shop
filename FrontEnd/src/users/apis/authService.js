import axios from 'axios';

export const apiLoginEmail = (email) => new Promise(async(resolve, reject) => {
    try {
        let response = await axios({
            method: 'post',
            url: 'http://localhost:5000/api/v1/auth/loginEmail',
            data: { email }
        })
        resolve(response);
    } catch (error) {
        reject(error);
    }
})