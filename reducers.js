import * as actionTypes from './types';
import { updateObject } from './src/utility';


export const initialState = {
  token: null,
  user: null,
  otp: null,
  otpVerified: false,
  stores: [],
  error: null,
  otpError: null,
  prevUrl: '/',
  loading: false,
  otpLoading: false
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
    stores: action.stores,
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
    stores: [],
    error: null,
    loading: false
  })
}

const redirect = (state, action) => {
  return updateObject(state, {
    prevUrl: action.prevUrl
  })
}

const otpStart = (state, action) => {
  return updateObject(state, {
    otpLoading: true
  })
}

const otpSendSuccess = (state, action) => {
  return updateObject(state, {
    otpLoading: false,
    otp: action.otp,
    otpError: null
  })
}

const otpVerifySuccess = (state, action) => {
  return updateObject(state, {
    otpLoading: false,
    otpVerified: true,
    otpError: null
  })
}

const otpFail = (state, action) => {
  return updateObject(state, {
    otpLoading: false,
    otpError: action.error
  })
}

const otpClear = (state, action) => {
  return updateObject(state, {
    otp: null,
    otpError: null,
    otpLoading: false,
    otpVerified: false
  })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START: return authStart(state, action);
    case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
    case actionTypes.AUTH_FAIL: return authFail(state, action);
    case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
    case actionTypes.REDIRECT: return redirect(state, action);
    case actionTypes.OTP_START: return otpStart(state, action);
    case actionTypes.OTP_SEND_SUCCESS: return otpSendSuccess(state, action);
    case actionTypes.OTP_VERIFY_SUCCESS: return otpVerifySuccess(state, action);
    case actionTypes.OTP_FAIL: return otpFail(state, action);
    case actionTypes.OTP_CLEAR: return otpClear(state, action);
    default: return state;
  }
}

export default reducer;

