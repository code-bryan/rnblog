import { ActionReducer } from '../../types/ActionReducer';
import DraftsService from '../../services/DraftsService';
import Post from '../../models/Post';

interface DraftReducer {
  drafts: Post[],
  error: string | null,
}

const GET_DRAFTS = 'GET_DRAFTS';
const DRAFT_ERROR = 'DRAFT_ERROR';

const INITIAL_STATE: DraftReducer = {
  drafts: [],
  error: null,
};
const Reducer = (state: DraftReducer = INITIAL_STATE, action: ActionReducer) => {
  switch (action.type) {
    case GET_DRAFTS:
      return {
        ...state,
        drafts: action.payload,
      };
    case DRAFT_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default: return state;
  }
};

export const getAllDrafts = (userId: string) => async (dispatch: any) => {
  try {
    const drafts = await DraftsService.getAllDrafts(userId);
    dispatch({ type: GET_DRAFTS, payload: drafts });
  } catch (e) {
    dispatch({ type: DRAFT_ERROR, payload: e.message });
  }
};

export default {
  Reducer,
};
