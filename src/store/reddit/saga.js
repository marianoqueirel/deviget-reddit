import { call, put } from "redux-saga/effects";
import services from "../../services/services";
import * as actions from "./actions";
import normalizePostsData from "./normalizer";
import { setLoader } from "../loader/actions";

function* getAccessTokenWorker() {
  const { response, error } = yield call(services.getAccessToken);
  if (response) {
    return response.data && response.data.access_token;
  } else {
    // Handle error
  }
}

function* getTopPostsWorker(accessToken) {
  const { response, error } = yield call(services.getTopPosts, accessToken);
  if (response) {
    return normalizePostsData(response.data);
  } else {
    if (error.response.status === 401) {
      localStorage.removeItem("REDDIT_ACCESS_TOKEN");
      yield call(getTopPostsFlow);
    }
  }
}

function* getTopPostsFlow() {
  let accessToken = localStorage.getItem("REDDIT_ACCESS_TOKEN");

  if (!accessToken) {
    accessToken = yield call(getAccessTokenWorker);
    localStorage.setItem("REDDIT_ACCESS_TOKEN", accessToken);
  }

  const posts = yield call(getTopPostsWorker, accessToken);
  if (posts) {
    yield put(actions.setPosts({ posts }));
    yield put(setLoader(false));
  }
}

export default function* redditSaga() {
  yield call(getTopPostsFlow);
}
