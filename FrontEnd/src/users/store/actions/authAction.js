import { apiLoginEmail } from '../../apis/authService'
import actionTypes from './actionTypes'

export const loginEmail = (email) => async (dispatch) => {
    try {
        let response = await apiLoginEmail(email);
        if (response?.data.err === 0){
            dispatch({
                type: actionTypes.LOGIN_SUCCESS,
                data: response.data.token
            })
        }else{
            dispatch({
                type: actionTypes.LOGIN_SUCCESS,
                date: null
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.LOGIN_SUCCESS,
            date: null
        })
    }
};

export const logout = () => ({
    type: actionTypes.LOGOUT
})