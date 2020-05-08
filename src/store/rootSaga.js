import { spawn } from "redux-saga/effects";
import redditSaga from "./reddit/saga";

export default function* rootSaga() {
  yield spawn(redditSaga);
}
