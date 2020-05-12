import { createSelector } from "reselect";

const getReddit = (state) => state.reddit;

export const getPosts = createSelector(getReddit, (reddit) => reddit.posts);

export const getSelectedPost = createSelector(
  getReddit,
  (reddit) => reddit.selected
);

export const isUndoDismissAllPosts = createSelector(
  getReddit,
  (reddit) => reddit.showUndoDismissAllPosts
);

export const getPostsAfterParam = createSelector(
  getReddit,
  (reddit) => reddit.after
);

export const getPostCount = createSelector(getPosts, (posts) => posts.length);
