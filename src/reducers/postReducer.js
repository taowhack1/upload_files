import {
  GET_POSTS,
  ADD_POST,
  SET_LOADING,
  POSTS_ERROR,
} from '../actions/types';

const initialState = {
  posts: null,
  current: null,
  loading: null,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
        loading: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case POSTS_ERROR:
      console.error(action.payload);
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
