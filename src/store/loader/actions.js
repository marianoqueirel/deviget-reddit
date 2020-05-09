import { SET_LOADER } from "./actionTypes";

export const setLoader = (loading) => ({
  type: SET_LOADER,
  payload: loading,
});
