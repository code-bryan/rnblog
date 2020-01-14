import Category from '../../models/Category';
import Post from '../../models/Post';
import Categories from '../../constants/Categories';
import PostService from '../../services/PostService';

interface UserState {
  categories: Category[];
  posts: Post[];
  error: string | null;
  refreshing: boolean;
  post: Post | null;
}

const INITIAL_STATE: UserState = {
  categories: Categories,
  posts: [],
  error: null,
  refreshing: false,
  post: null,
};

const UPDATE_CATEGORIES = 'UPDATE_CATEGORIES';
const GET_ALL_POSTS = 'GET_ALL_POSTS';
const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE';
const SET_REFRESHING = 'SET_REFRESHING';
const POST_DETAILS = 'POST_DETAILS';

const Reducer = (state: UserState = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case UPDATE_CATEGORIES:
      return {
        ...state,
        categories: Categories,
      };
    case GET_ALL_POSTS:
      return {
        ...state,
        posts: action.posts,
      };
    case SET_ERROR_MESSAGE:
      return {
        ...state,
        error: action.error,
      };
    case SET_REFRESHING:
      return {
        ...state,
        refreshing: action.refreshing,
      };
    case POST_DETAILS:
      return {
        ...state,
        post: action.payload,
      };
    default:
      return state;
  }
};

export const updateCategories = () => (dispatch: any) => dispatch({ type: UPDATE_CATEGORIES });

export const getAllPosts = () => async (dispatch: any) => {
  try {
    const posts = await PostService.getALLPosts();
    dispatch({ type: GET_ALL_POSTS, posts });
  } catch (e) {
    dispatch({ type: SET_ERROR_MESSAGE, error: e.message });
  }

  dispatch({ type: SET_REFRESHING, refreshing: false });
};

export const postDetails = (post: Post) => async (dispatch: any) => {
  dispatch({ type: POST_DETAILS, payload: post });
};

export const setRefreshing = (isRefreshing: boolean) => async (dispatch: any) => dispatch({
  type: SET_REFRESHING, refreshing: isRefreshing,
});

export const setErrorMessage = (error: string | null) => (dispatch: any) => dispatch(
  { type: SET_ERROR_MESSAGE, error },
);

export default {
  Reducer,
};
