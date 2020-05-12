import * as actionTypes from "./actionTypes";

const initialState = {
  posts: [],
  selected: {},
  showUndoDismissAllPosts: false,
  after: "",
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.SET_POSTS:
      return {
        ...state,
        posts: [...payload.posts],
        after: payload.after ? payload.after : state.after,
      };
    case actionTypes.SET_POSTS_NEXT_PAGE:
      return {
        ...state,
        posts: [...state.posts, ...payload.posts],
        after: payload.after,
      };
    case actionTypes.DISMISS_POST:
      const { posts } = state;
      const index = posts.findIndex((post) => post.id === payload.id);
      const filteredPosts =
        index > -1
          ? [...posts.slice(0, index), ...posts.slice(index + 1, posts.length)]
          : [...posts];
      return { ...state, posts: filteredPosts };
    case actionTypes.SELECT_POST:
      const i = state.posts.findIndex((post) => post.id === payload.id);
      const updatedPosts =
        i > -1
          ? [
              ...state.posts.slice(0, i),
              { ...state.posts[i], read: true },
              ...state.posts.slice(i + 1, state.posts.length),
            ]
          : [...state.posts];

      const postSelected = {
        ...state.posts.find((post) => post.id === payload.id),
      };
      return { ...state, posts: updatedPosts, selected: postSelected };
    case actionTypes.SET_DISMISS_ALL_POSTS:
      return { ...state, posts: [] };
    case actionTypes.SHOW_UNDO_DISMISS_ALL_POSTS:
      return { ...state, showUndoDismissAllPosts: payload.show };
    default:
      return state;
  }
};
