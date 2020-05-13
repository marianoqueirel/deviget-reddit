import { createSelector } from "reselect";
// So far we are safe to have this selector without default values, but we should take care of it.
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
