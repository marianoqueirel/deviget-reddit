import {
  all,
  call,
  put,
  take,
  takeLatest,
  select,
  delay,
  race,
} from "redux-saga/effects";
import services from "../../services/services";
import * as actions from "./actions";
import { getPosts } from "./selector";
import { DISMISS_ALL_POSTS, UNDO_DISMISS_ALL_POSTS } from "./actionTypes";
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

function* dismissAllPostsFlow() {
  const currentPosts = yield select(getPosts);

  yield put(actions.setDismissAllPosts());
  yield put(actions.showUndoDismissAllPosts({ show: true }));

  const { undo } = yield race({
    undo: take(UNDO_DISMISS_ALL_POSTS),
    dismiss: delay(10000),
  });

  yield put(actions.showUndoDismissAllPosts({ show: false }));

  if (undo) {
    yield put(actions.setPosts({ posts: currentPosts }));
  }
}

export default function* redditSaga() {
  yield all([
    getTopPostsFlow(),
    yield takeLatest(DISMISS_ALL_POSTS, dismissAllPostsFlow),
  ]);
}
