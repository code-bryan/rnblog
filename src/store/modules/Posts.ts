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
  selectedCategoryId: number;
}

const INITIAL_STATE: UserState = {
  categories: Categories,
  posts: [],
  error: null,
  refreshing: false,
  post: null,
  selectedCategoryId: 1,
};

const UPDATE_CATEGORIES = 'UPDATE_CATEGORIES';
const GET_ALL_POSTS = 'GET_ALL_POSTS';
const ADD_LIKES = 'ADD_LIKES';
const GET_BY_CATEGORY = 'GET_BY_CATEGORY';
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
    case ADD_LIKES:
      return {
        ...state,
        posts: action.payload.posts,
        post: action.payload.post,
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
    case GET_BY_CATEGORY:
      return {
        ...state,
        posts: action.payload.posts,
        selectedCategoryId: action.payload.categoryId,
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

export const addLike = (post: Post) => async (dispatch: any) => {
  try {
    const posts = await PostService.AddLike(post);
    const postUpdated = posts.find((p) => p.id === post.id);
    dispatch({ type: ADD_LIKES, payload: { posts, post: postUpdated } });
  } catch (e) {
    dispatch({ type: SET_ERROR_MESSAGE, error: e.message });
  }
};

export const getByCategory = (categoryId: number) => async (dispatch: any) => {
  try {
    const posts = await PostService.getByCategory(categoryId);
    dispatch({ type: GET_BY_CATEGORY, payload: { posts, categoryId } });
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
