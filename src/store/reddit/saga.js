import { take } from "redux-saga/effects";
import * as actionTypes from "./actionTypes";

function* startRedditFlow() {
  return null;
}

export default function* redditSaga() {
  yield take(actionTypes.START_REDDIT_APP, startRedditFlow);
}
