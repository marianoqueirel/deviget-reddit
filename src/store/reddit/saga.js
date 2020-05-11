import { call, put } from "redux-saga/effects";
import services from "../../services/services";
import * as actions from "./actions";
import normalizePostsData from "./normalizer";
import { setLoader } from "../loader/actions";

function* getAccessTokenWorker() {
  const { response, error } = yield call(services.getAccessToken);
  if (response) {
    return response.data && response.data.access_token;
  } else if (error) {
    // Handle error
  }
}

function* getTopPostsWorker(accessToken) {
  try {
    const response = yield call(services.getTopPosts, accessToken);

    return normalizePostsData(response.data);
  } catch (error) {
    if (error) {
      const {
        response: { status },
      } = error;

      if (status === 401) {
        localStorage.removeItem("REDDIT_ACCESS_TOKEN");
        yield call(getTopPostsFlow);
      }
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
