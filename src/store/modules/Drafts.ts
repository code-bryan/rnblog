import { ActionReducer } from '../../types/ActionReducer';
import DraftsService from '../../services/DraftsService';
import Post from '../../models/Post';

interface DraftReducer {
  drafts: Post[],
  error: string | null,
  refreshing: boolean,
  selectedDraft: Post | null,
}

const GET_DRAFTS = 'DRAFT/GET_DRAFTS';
const SAVE_DRAFTS = 'DRAFT/SAVE_DRAFTS';
const DRAFT_ERROR = 'DRAFT/DRAFT_ERROR';
const REFRESHING_DRAFTS = 'DRAFT/REFRESHING_DRAFTS';
const CLEAN_DRAFT_ERROR = 'DRAFT/CLEAN_DRAFT_ERROR';
const SELECT_DRAFT = 'DRAFT/SELECT_DRAFT';

const INITIAL_STATE: DraftReducer = {
  drafts: [],
  error: null,
  refreshing: false,
  selectedDraft: null,
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
    case REFRESHING_DRAFTS:
      return {
        ...state,
        refreshing: action.payload,
      };
    case CLEAN_DRAFT_ERROR:
      return {
        ...state,
        error: null,
      };
    case SELECT_DRAFT:
      return {
        ...state,
        selectedDraft: action.payload,
      };
    default:
      return state;
  }
};

export const getAllDrafts = (userId: string) => async (dispatch: any) => {
  try {
    const drafts = await DraftsService.getAllDrafts(userId);
    dispatch({ type: GET_DRAFTS, payload: drafts });
  } catch (e) {
    dispatch({ type: DRAFT_ERROR, payload: e.message });
  }

  dispatch({ type: REFRESHING_DRAFTS, payload: false });
};

export const saveDraft = (post: Post) => async (dispatch: any) => {
  try {
    const drafts = await DraftsService.saveDraft(post);
    dispatch({ type: SAVE_DRAFTS, payload: drafts });
  } catch (e) {
    dispatch({ type: DRAFT_ERROR, payload: e.message });
  }
};

export const editDraft = (post: Post) => async (dispatch: any) => {
  try {
    const drafts = await DraftsService.editDraft(post);
    dispatch({ type: SAVE_DRAFTS, payload: drafts });
  } catch (e) {
    dispatch({ type: DRAFT_ERROR, payload: e.message });
  }
};

export const refreshDrafts = (isRefreshing: boolean) => (dispatch: any) => dispatch(
  { type: REFRESHING_DRAFTS, payload: isRefreshing },
);

export const cleanDraftError = () => (dispatch: any) => dispatch(
  { type: CLEAN_DRAFT_ERROR },
);

export const selectDraft = (post: Post) => (dispatch: any) => dispatch(
  { type: SELECT_DRAFT, payload: post },
);

export const publishDraft = (post: Post) => async (dispatch: any) => {
  try {
    const drafts = await DraftsService.publishDraft(post);
    dispatch({ type: SAVE_DRAFTS, payload: drafts });
  } catch (e) {
    dispatch({ type: DRAFT_ERROR, payload: e.message });
  }
};

export default {
  Reducer,
};
