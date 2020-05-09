import { SET_LOADER } from "./actionTypes";

export default (state = true, { type, payload }) => {
  switch (type) {
    case SET_LOADER:
      return payload;
    default:
      return state;
  }
};
