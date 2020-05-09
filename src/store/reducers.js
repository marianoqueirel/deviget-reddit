import { combineReducers } from "redux";
import redditReducer from "./reddit/reducer";
import loaderReducer from "./loader/reducer";

export default combineReducers({
  reddit: redditReducer,
  loader: loaderReducer,
});
