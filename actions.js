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

export const authSuccess = (token, user) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    user: user
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
  cookies.remove('token');
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}



export const authLogin = (phone, password, stay) => {
  return dispatch => {
    dispatch(authStart());
    axios.post(`${axiosparams.url}user/login`, {
      phone: phone,
      password: password
    })
      .then(res => {
        if (!res.data.error) {
          if (res.data.authentication.registered) {
            if (stay) {
              const cookies = new Cookies;
              const token = res.data.authentication.token;
              const user = res.data.authentication.user;

              const cookie_expiration = new Date();

              cookie_expiration.setTime(cookie_expiration.getTime() + (2419200 * 1000));

              cookies.set('token', token, { path: `/`, expires: cookie_expiration });
              cookies.set('user', user, { path: '/', expires: cookie_expiration });
            }

            dispatch(authSuccess(token, user));
          } else {
            dispatch(authFail('unregistered'))
          }
        } else {
          dispatch(authFail(res.data))
        }

      })
      .catch(err => {
        dispatch(authFail(err));
      })
  }
}

export const authCheckState = () => {
  return dispatch => {
    const cookies = new Cookies;
    const token = cookies.get('token');
    if ((token === null) || (token === undefined)) {
      dispatch(authFail('not logged in'));
    } else {
      const user = cookies.get('user');
      if (!user) {
        dispatch(authFail('not logged in'));
      } else {
        dispatch(authSuccess(token, user));
      }
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
