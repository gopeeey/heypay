import * as actionTypes from './types';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { axiosparams } from './axiosparams';

//AUTH ACTIONS
export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

export const authSuccess = (token, user, stores) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    user: user,
    stores: stores
  }
}

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
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



export const authLogin = (phone, password, stay, account_type) => {

  if (account_type === "merchant") {
    return dispatch => {
      dispatch(authStart());
      axios.post(`${axiosparams.url}user/login/vendor`, {
        phone: phone.replace('0', '+234'),
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

export const verifyOtp = (otp, phone) => {
  return dispatch => {
    dispatch(authStart());
    axios.post(`${axiosparams.url}user/authenticate`, {
      otp: otp,
      phone: phone
    }).then(res => {
      if ((!res.data.error) && (res.data.message === "you are truly verified")) {
        dispatch(authSuccess(null, null));
      }
    }).catch(error => {
      dispatch(authFail(error))
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
