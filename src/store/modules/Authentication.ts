import Credentials from '../../models/Credentials';
import AuthenticationService from '../../services/AuthenticationService';
import User from '../../models/User';
import BasicRegistration from '../../models/BasicRegistration';

interface UserState {
  user: User,
  error: string,
  isNewUser: boolean,
}

const INITIAL_STATE: UserState = {
  user: new User(),
  error: '',
  isNewUser: false,
};

const AUTHENTICATE_USER = 'AUTHENTICATE_USER';
const REGISTER_AUTH_USER = 'REGISTER_AUTH_USER';
const COMPLETE_AUTH_USER = 'COMPLETE_AUTH_USER';
const REGISTER_ERROR = 'REGISTER_ERROR';
const LOGOUT = 'LOGOUT';
const CLEAN_AUTH_ERROR = 'CLEAN_AUTH_ERROR';

const Reducer = (state: UserState = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case AUTHENTICATE_USER:
      return {
        ...state,
        user: action.user,
      };
    case REGISTER_AUTH_USER:
      return {
        ...state,
        user: action.user,
        isNewUser: true,
      };
    case COMPLETE_AUTH_USER:
      return {
        ...state,
        user: action.user,
        isNewUser: false,
      };
    case REGISTER_ERROR:
      return {
        ...state,
        error: action.errorMessage,
      };
    case CLEAN_AUTH_ERROR:
      return {
        ...state,
        error: '',
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
    dispatch({ type: REGISTER_ERROR, errorMessage: e.message });
  }
};

export const logout = () => (dispatch: any) => dispatch({ type: LOGOUT });

export const registerAuthUser = (basicRegistration: BasicRegistration) => async (dispatch: any) => {
  try {
    const user = await AuthenticationService.registerAuthUser(basicRegistration);
    dispatch({ type: REGISTER_AUTH_USER, user });
  } catch (e) {
    dispatch({ type: REGISTER_ERROR, errorMessage: e.message });
  }
};

export const completeRegistration = (newUser: User) => async (dispatch: any) => {
  try {
    const user = await AuthenticationService.completeUserRegistration(newUser);
    dispatch({ type: COMPLETE_AUTH_USER, user });
  } catch (e) {
    dispatch({ type: REGISTER_ERROR, errorMessage: e.message });
  }
};

export const cleanAuthError = () => (dispatch: any) => dispatch({ type: CLEAN_AUTH_ERROR });

export default {
  Reducer,
};
