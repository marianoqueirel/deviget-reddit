import * as actionTypes from "./actionTypes";

const initialState = {
  posts: [],
  selected: {},
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.SET_POSTS:
      return { ...state, posts: [...payload.posts] };
    default:
      return state;
  }
};
