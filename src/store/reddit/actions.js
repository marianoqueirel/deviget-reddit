import * as actionTypes from "./actionTypes";

export const setPosts = ({ posts }) => ({
  type: actionTypes.SET_POSTS,
  payload: { posts },
});

export const selectPost = ({ id }) => ({
  type: actionTypes.SELECT_POST,
  payload: { id },
});

export const undoDismissAllPosts = () => ({
  type: actionTypes.UNDO_DISMISS_ALL_POSTS,
});

export const showUndoDismissAllPosts = ({ show }) => ({
  type: actionTypes.SHOW_UNDO_DISMISS_ALL_POSTS,
  payload: { show },
});

export const setDismissAllPosts = () => ({
  type: actionTypes.SET_DISMISS_ALL_POSTS,
});

export const dismissPost = ({ id }) => ({
  type: actionTypes.DISMISS_POST,
  payload: { id },
});

export const dismissAllPosts = () => ({
  type: actionTypes.DISMISS_ALL_POSTS,
});
