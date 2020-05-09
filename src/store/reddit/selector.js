import { createSelector } from "reselect";

const getReddit = (state) => state.reddit;

export const getPosts = createSelector(getReddit, (reddit) => reddit.posts);

export const getSelectedPost = createSelector(
  getReddit,
  (reddit) => reddit.selected
);
