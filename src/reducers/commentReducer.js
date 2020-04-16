import {
  GET_COMMENTS,
  ADD_COMMENT,
  DELETE_COMMENT,
  SET_LOADING,
  COMMENTS_ERROR,
} from '../actions/types';

const initialState = {
  comments: null,
  current: null,
  loading: null,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_COMMENTS:
      return {
        ...state,
        comments: action.payload,
        loading: false,
      };
    case ADD_COMMENT:
      return {
        ...state,
        comments: [action.payload, ...state.comments],
        loading: false,
      };
    case DELETE_COMMENT:
      const newState = {
        ...state,
        comments: state.comments.filter(
          (item) => item.comment_id !== action.payload
        ),
      };
      return newState;
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case COMMENTS_ERROR:
      console.error(action.payload);
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
