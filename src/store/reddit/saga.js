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
import { getPosts, getPostsAfterParam, getPostCount } from "./selector";
import {
  DISMISS_ALL_POSTS,
  UNDO_DISMISS_ALL_POSTS,
  GET_POSTS_NEXT_PAGE,
} from "./actionTypes";
import normalizePostsData from "./normalizer";
import { setLoader } from "../loader/actions";
import { REDDIT_ACCESS_TOKEN_KEY } from "./constants";

export function* getAccessTokenWorker() {
  const { response, error } = yield call(services.getAccessToken);
  if (response) {
    // TODO trigger success action instead of returning just an object
    return response.data && response.data.access_token;
  } else if (error) {
    // Dispatch Error Action
  }
}

export function* getTopPostsWorker(accessToken) {
  const after = yield select(getPostsAfterParam);
  const count = yield select(getPostCount);
  try {
    const response = yield call(services.getTopPosts, {
      accessToken,
      limit: 50,
      after,
      count,
    });
    const { data } = response;

    return {
      posts: normalizePostsData(data),
      after: data.data.after,
    };
  } catch (error) {
    if (error) {
      const {
        response: { status },
      } = error;

      if (status === 401) {
        localStorage.removeItem(REDDIT_ACCESS_TOKEN_KEY);
        yield call(getTopPostsFlow);
      }
      // Dispatch Error Action
    }
  }
}

export function* getTopPostsFlow() {
  let accessToken = localStorage.getItem(REDDIT_ACCESS_TOKEN_KEY);
  if (!accessToken) {
    accessToken = yield call(getAccessTokenWorker);
    localStorage.setItem(REDDIT_ACCESS_TOKEN_KEY, accessToken);
  }

  const posts = yield call(getTopPostsWorker, accessToken);

  if (posts) {
    yield put(actions.setPosts({ posts: posts.posts, after: posts.after }));
    yield put(setLoader(false));
  }
}

export function* dismissAllPostsFlow() {
  const currentPosts = yield select(getPosts);

  yield put(actions.setDismissAllPosts());
  yield put(actions.showUndoDismissAllPosts({ show: true }));

  const { undo } = yield race({
    undo: take(UNDO_DISMISS_ALL_POSTS),
    dismiss: delay(5000),
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
    yield takeLatest(GET_POSTS_NEXT_PAGE, getTopPostsFlow),
  ]);
}
