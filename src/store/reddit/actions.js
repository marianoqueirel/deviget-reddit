import * as actionTypes from "./actionTypes";

// COMMAND ACTIONS
export const dismissAllPosts = () => ({
  type: actionTypes.DISMISS_ALL_POSTS,
});

export const getPostsNextPage = () => ({
  type: actionTypes.GET_POSTS_NEXT_PAGE,
});

// DOCUMENT ACTIONS
export const dismissPost = ({ id }) => ({
  type: actionTypes.DISMISS_POST,
  payload: { id },
});

export const selectPost = ({ id }) => ({
  type: actionTypes.SELECT_POST,
  payload: { id },
});

export const setPosts = ({ posts, after }) => ({
  type: actionTypes.SET_POSTS,
  payload: { posts, after },
});

export const setDismissAllPosts = () => ({
  type: actionTypes.SET_DISMISS_ALL_POSTS,
});

export const showUndoDismissAllPosts = ({ show }) => ({
  type: actionTypes.SHOW_UNDO_DISMISS_ALL_POSTS,
  payload: { show },
});

export const undoDismissAllPosts = () => ({
  type: actionTypes.UNDO_DISMISS_ALL_POSTS,
});
