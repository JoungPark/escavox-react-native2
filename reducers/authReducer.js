import { SIGNIN, SIGNOUT } from '../actions/types';

const initialState = {
  expiresAccessToken: 1,
  expiresRefreshToken: 1,
}

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case SIGNIN:
    {
      const { name, token, userToken, roles } = action.payload;

      return Object.assign({}, state, {
        name, token, userToken, roles
      })
    }
    case SIGNOUT:
      return initialState;
    default:
      return state;
  }
}