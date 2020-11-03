import * as actionTypes from './types';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { axiosparams } from './axiosparams';
import { getDisplayDate } from '@material-ui/pickers/_helpers/text-field-helper';

//AUTH ACTIONS
export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

export const authSuccess = (token, user, stores) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token,
    user,
    stores
  }
}

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error
  }
}

export const authLogout = () => {
  const cookies = new Cookies;
  cookies.remove('phone');
  cookies.remove('password');
  cookies.remove('account_type');
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}

//OTP ACTIONS
export const otpStart = () => ({
  type: actionTypes.OTP_START
})

export const otpSendSuccess = (otp) => ({
  type: actionTypes.OTP_SEND_SUCCESS,
  otp
})

export const otpVerifySuccess = () => ({
  type: actionTypes.OTP_VERIFY_SUCCESS
})

export const otpFail = (error) => ({
  type: actionTypes.OTP_FAIL,
  error
})

export const otpClear = () => ({
  type: actionTypes.OTP_CLEAR
})



export const authLogin = (phone, password, stay, account_type) => {

  if (account_type === "merchant") {
    return dispatch => {
      dispatch(authStart());
      axios.post(`${axiosparams.url}user/login/vendor`, {
        phone: phone.startsWith('0') ? (phone.replace('0', '+234')) : (phone),
        password: password
      })
        .then(res => {
          if (res.data.authentication.registered) {
            const token = res.data.authentication.token;
            const user = res.data.authentication.user;
            const stores = [res.data.vendor,]
            if (stay) {
              const cookies = new Cookies;
              const cookie_expiration = new Date();

              cookie_expiration.setTime(cookie_expiration.getTime() + (2419200 * 1000));

              cookies.set('phone', phone, { path: `/`, expires: cookie_expiration });
              cookies.set('password', password, { path: '/', expires: cookie_expiration });
              cookies.set('account_type', account_type, { path: `/`, expires: cookie_expiration });
            }

            dispatch(authSuccess(token, user, stores));
          } else {
            dispatch(authFail(res.data))
          }
        })
        .catch(err => {
          dispatch(authFail(err));
        })
    }
  }
}

export const authSignup = (otp, name, dob, password, phone, email) => {
  return dispatch => {
    dispatch(authStart());
    axios.post(`${axiosparams.url}user/signup`, {
      otp,
      name,
      dab: dob,
      password,
      phone: phone.startsWith('0') ? (phone.replace('0', '+234')) : (phone),
      email
    }).then(res => {
      if (!res.data.error) {
        dispatch(authSuccess(res.data.authentication.token, res.data.authentication.user, null));
      } else {
        dispatch(authFail(res.data))
      }
    }).catch(error => {
      dispatch(authFail(error))
    })
  }
}

export const sendOtp = (phone) => {
  return dispatch => {
    dispatch(otpStart());
    axios.post(`${axiosparams.url}user/login`, {
      phone: phone.startsWith('0') ? (phone.replace('0', '+234')) : (phone),
      password: 1234
    }).then(res => {
      if (!res.data.error) {
        if (!res.data.authentication.registered) {
          dispatch(otpSendSuccess(res.data.authentication.timeOtp));
        } else {
          dispatch(otpFail({
            error: true,
            message: "registered"
          }))
        }
      } else {
        dispatch(otpFail(res.data));
      }
    }).catch(error => {
      dispatch(otpFail(error));
    })
  }
}

export const verifyOtp = (otp, phone) => {
  return dispatch => {
    dispatch(otpStart());
    axios.post(`${axiosparams.url}user/authenticate`, {
      otp: otp,
      phone: phone.startsWith('0') ? (phone.replace('0', '+234')) : (phone)
    }).then(res => {
      if ((!res.data.error) && (res.data.message === "You are truly verified.")) {
        dispatch(otpVerifySuccess());
      } else {
        dispatch(otpFail(res.data))
      }
    }).catch(error => {
      dispatch(otpFail(error));
    })
  }
}

export const authCheckState = () => {
  return dispatch => {
    dispatch(authStart());
    const cookies = new Cookies;
    const phone = cookies.get('phone');
    const password = cookies.get('password');
    const account_type = cookies.get('account_type');
    if (!phone && !password && !account_type) {
      dispatch(authFail('not logged in'));
    } else {
      dispatch(authLogin(phone, password, false, account_type));
    }
  }
}


//OTHER ACTIONS

export const redirect = (back) => {
  return {
    type: actionTypes.REDIRECT,
    prevUrl: back
  }
}
