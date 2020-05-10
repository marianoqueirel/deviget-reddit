import * as actionTypes from "./actionTypes";

export const setPosts = ({ posts }) => ({
  type: actionTypes.SET_POSTS,
  payload: { posts },
});

export const dismissPost = ({ id }) => ({
  type: actionTypes.DISMISS_POST,
  payload: { id },
});

export const dismissAllPosts = () => ({
  type: actionTypes.DISMISS_ALL_POSTS,
});
