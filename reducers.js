import * as actionTypes from './types';
import { updateObject } from './src/utility';


export const initialState = {
  token: null,
  user: null,
  error: null,
  prevUrl: '/',
  loading: false,
}


const authStart = (state, action) => {
  return updateObject(state, {
    loading: true
  })
}

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.token,
    user: action.user,
    error: null,
    loading: false
  })
}

const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  })
}

const authLogout = (state, action) => {
  return updateObject(state, {
    token: null,
    user: null,
    error: null,
    loading: false
  })
}

const redirect = (state, action) => {
  return updateObject(state, {
    prevUrl: action.prevUrl
  })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START: return authStart(state, action);
    case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
    case actionTypes.AUTH_FAIL: return authFail(state, action);
    case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
    case actionTypes.REDIRECT: return redirect(state, action);
    default: return state;
  }
}

export default reducer;

