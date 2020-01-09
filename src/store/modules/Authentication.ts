import Credentials from '../../models/Credentials';
import AuthenticationService from '../../services/AuthenticationService';
import User from '../../models/User';

interface UserState {
  user: User
}

const INITIAL_STATE: UserState = {
  user: new User(),
};

const AUTHENTICATE_USER = 'AUTHENTICATE_USER';
const LOGOUT = 'LOGOUT';

const Reducer = (state: UserState = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case AUTHENTICATE_USER:
      return {
        ...state,
        user: action.user,
      };
    case LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export const authenticateUser = (authentication: Credentials) => async (dispatch: any) => {
  try {
    const user = await AuthenticationService.authenticateUser(authentication);
    dispatch({ type: AUTHENTICATE_USER, user });
  } catch (e) {
    console.error(e);
  }
};

export const logout = () => (dispatch: any) => dispatch({ type: LOGOUT });

export default {
  Reducer,
};
