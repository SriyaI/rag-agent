import axios from 'axios';
import { REGISTER_SUCCESS, LOGIN_SUCCESS, LOGOUT, GET_PROFILE, GET_PROFILE_ERROR, GOOGLE_LOGIN_SUCCESS, GOOGLE_LOGIN_FAILURE } from './types';

//const apiBaseUrl = 'https://secure-saas-service.azurewebsites.net/users';
const apiBaseUrl = 'http://localhost:8000/users';

export const register = (userData) => async dispatch => {
  try {
    const res = await axios.post(`${apiBaseUrl}/register`, userData);
    dispatch({ type: REGISTER_SUCCESS, payload: res.data });
    localStorage.setItem('token', res.data.token);
  } catch (err) {
    console.error('Registration error:', err);
  }
};

export const login = (userData) => async dispatch => {
  try {
    const res = await axios.post(`${apiBaseUrl}/login`, userData);
    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    localStorage.setItem('token', res.data.token);
  } catch (err) {
    console.error('Login error:', err);
  }
};

export const googleLogin = (idToken) => async (dispatch) => {
  try {
    const response = await axios.post(`${apiBaseUrl}/google-signin`, { idToken });
    console.log(response.data);
    localStorage.setItem('token', response.data.token);
    dispatch({ type: GOOGLE_LOGIN_SUCCESS, payload: response.data.token });
  } catch (error) {
    console.error('Google login failed:', error);
    dispatch({ type: GOOGLE_LOGIN_FAILURE, payload: error.response?.data || error.message });
  }
};




export const getProfile = () => async dispatch => {
  try {
    const res = await axios.get(`${apiBaseUrl}/profile`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    dispatch({ type: GET_PROFILE, payload: res.data });
  } catch (err) {
    console.error('Get profile error:', err);
    dispatch({ type: GET_PROFILE_ERROR, payload: err.response?.data || err.message });
  }
};


export const logout = () => {
  localStorage.removeItem('token');
  return { type: LOGOUT };
};