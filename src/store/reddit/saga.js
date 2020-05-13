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
import { apiRequestSuccess, apiRequestsFailure } from "../events/actions";
import { REDDIT_ACCESS_TOKEN_KEY } from "./constants";

export function* getAccessTokenWorker() {
  const { response = null, error = null } = yield call(services.getAccessToken);
  if (response) {
    return yield put(
      apiRequestSuccess({
        feature: "getAccessToken",
        ...response,
      })
    );
  } else if (error) {
    if (error.response) {
      const { response } = error;
      yield put(
        apiRequestsFailure({
          feature: "getAccessToken",
          ...response,
        })
      );
    } else if (error.request) {
      // HANDLING BAD REQUESTS ERRORS
    } else {
      // HANDLING OTHER KIND OF ERRORS
    }
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

    return yield put(
      apiRequestSuccess({
        feature: "getTopPosts",
        ...response,
        data: {
          posts: normalizePostsData(data),
          after: data.data.after,
        },
      })
    );
  } catch (error) {
    if (error.response) {
      const { response } = error;
      const { status } = response;
      if (status === 401) {
        // IMPORTANT TODO: Here we need to add logic to just try n times this block.
        yield delay(500);
        localStorage.removeItem(REDDIT_ACCESS_TOKEN_KEY);
        yield call(getTopPostsFlow);
      } else {
        yield put(
          apiRequestsFailure({
            feature: "getTopPosts",
            ...response,
          })
        );
      }
    } else if (error.request) {
      // HANDLING BAD REQUESTS ERRORS
    } else {
      // HANDLING OTHER KIND OF ERRORS
    }
  }
}

export function* getTopPostsFlow() {
  let accessToken = localStorage.getItem(REDDIT_ACCESS_TOKEN_KEY);
  if (!accessToken) {
    const {
      payload: {
        data: { access_token },
      },
    } = yield call(getAccessTokenWorker);
    accessToken = access_token;

    localStorage.setItem(REDDIT_ACCESS_TOKEN_KEY, accessToken);
  }

  const {
    payload: {
      data: { posts, after },
    },
  } = yield call(getTopPostsWorker, accessToken);

  if (posts) {
    yield put(actions.setPosts({ posts, after }));
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
