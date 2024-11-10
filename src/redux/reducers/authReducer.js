import { REGISTER_SUCCESS, LOGIN_SUCCESS, LOGOUT, GET_PROFILE, GET_PROFILE_ERROR } from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  user: null,
  error: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: true,
        user: action.payload.user,
        error: null,
      };
    case GET_PROFILE:
      return {
        ...state,
        user: action.payload,
        error: null,
      };
    case GET_PROFILE_ERROR:
      return {
        ...state,
        user: null,
        error: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
        error: null,
      };
    default:
      return state;
  }
}
