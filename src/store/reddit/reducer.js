import * as actionTypes from "./actionTypes";

const initialState = {
  posts: [],
  selected: {},
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.SET_POSTS:
      return { ...state, posts: [...payload.posts] };
    case actionTypes.DISMISS_POST:
      const { id } = payload;
      const { posts } = state;
      const index = posts.findIndex((post) => post.id === id);
      const filteredPosts =
        index > -1
          ? [...posts.slice(0, index), ...posts.slice(index + 1, posts.length)]
          : [...posts];
      return { ...state, posts: filteredPosts };
    case actionTypes.DISMISS_ALL_POSTS:
      return { ...initialState };
    default:
      return state;
  }
};
