import { jwtDecode } from 'jwt-decode';
import actionTypes from './actionTypes';
import axios from 'axios';
import config from '../../config/config';

const getRoleFromToken = (token) => {
    try {
        const decoded = jwtDecode(token);
        return decoded.role;
    } catch (error) {
        return 0;
    }
};

export const getUserIdFromToken = (token) => {
    try {
        const decoded = jwtDecode(token);
        return decoded.id;
    } catch (error) {
        return 0;
    }
};

export const loginEmail = (email) => async (dispatch) => {
    try {
        let response = await axios({
            method: 'post',
            url: `${config.API_ROOT}/api/v1/auth/loginEmail`,
            data: { email }
        })
        if (response?.data.err === 0) {
            const role = getRoleFromToken(response.data.token);
            dispatch({
                type: actionTypes.LOGIN_SUCCESS,
                data: response.data.token,
                role: role
            })
        } else {
            dispatch({
                type: actionTypes.LOGIN_SUCCESS,
                date: null,
                role: 0
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.LOGIN_SUCCESS,
            date: null,
            role: 0
        })
    }
};

export const login = (token) => async (dispatch) => {
    try {
        if (token) {
            const role = getRoleFromToken(token);
            dispatch({
                type: actionTypes.LOGIN_SUCCESS,
                data: token,
                role: role
            })
        } else {
            dispatch({
                type: actionTypes.LOGIN_SUCCESS,
                date: null,
                role: 0
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.LOGIN_SUCCESS,
            date: null,
            role: 0
        })
    }
};

export const logout = () => ({
    type: actionTypes.LOGOUT
})
