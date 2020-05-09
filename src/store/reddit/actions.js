import * as actionTypes from "./actionTypes";

export const setPosts = ({ posts }) => ({
  type: actionTypes.SET_POSTS,
  payload: { posts },
});
