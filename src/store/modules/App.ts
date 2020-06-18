import { ActionReducer } from '../../types/ActionReducer';
import User from '../../models/User';
import UserService from '../../services/UserService';

interface AppReducer {
  users: User[];
  error: string | null;
}

const INITIAL_STATE: AppReducer = {
  users: [],
  error: null,
};

const GET_ALL_USERS = 'APP/GET_ALL_USERS';
const ERROR = 'APP/ERROR';

const Reducer = (state: AppReducer = INITIAL_STATE, action: Partial<ActionReducer>) => {
  switch (action.type) {
    case GET_ALL_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default: return state;
  }
};

export const getUsers = () => async (dispatch: any) => {
  try {
    const users: User[] = await UserService.getUsers();
    dispatch({ type: GET_ALL_USERS, payload: users });
  } catch (e) {
    dispatch({ type: ERROR, payload: e.message });
  }
};

export default {
  Reducer,
};
