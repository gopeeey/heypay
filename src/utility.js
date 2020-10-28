import { redirect as stateRedirect } from '../actions';

export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    }
}

export const redirect = (back) => {
    return dispatch => {
        dispatch(stateRedirect(back));
    }
}