import axios from 'axios';
import Constants from 'expo-constants';

import { SIGNIN, SIGNOUT } from '../reducers/types';

export const signIn = (EmailAddress, Password) => {
  return (dispatch) => {
    return axios.post(`${Constants.manifest.extra.apiUrl}/api/users/1.0/AuthToken`, { EmailAddress, Password })
    .then(response => {
      const { Name, Roles, Token, UserToken } = response.data;
      dispatch({
        type: SIGNIN,
        payload:{
          name: Name,
          token: Token,
          userToken: UserToken,
          roles: Roles,
        },
      });
      return response.data;
    });
  };
};

export const signOut = () => {
  return (dispatch) => {
    dispatch({
      type: SIGNOUT,
    });
  }
};
