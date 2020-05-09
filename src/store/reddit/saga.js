import { call, take } from "redux-saga/effects";
import * as actionTypes from "./actionTypes";
import axios from "axios";

export const CLIENT_ID = "oYJdtHww6zmYvg";
export const CLIENT_SECRET = "qSwRYa7JYWkdrhPZhX3q230KyII";

function getTokenWorker() {
  /* TODO: URLSearchParams is not supported by all browsers, so we need either to  
           polyfill or use another method. 
  */
  const body = new URLSearchParams();
  body.append("grant_type", "client_credentials");

  axios
    .post("https://www.reddit.com/api/v1/access_token", body, {
      auth: {
        username: CLIENT_ID,
        password: CLIENT_SECRET,
      },
      timeout: 2000,
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
}

function getTopPostsWorker() {
  // NEW -YnNexV9ZTyRmIVlC57doZ4aHhzA
  // OLD -va9HC4vZhMmUJbXBX3MsY2XP1_c
  axios
    .get("https://oauth.reddit.com/top?limit=25", {
      headers: {
        Authorization: `Bearer -va9HC4vZhMmUJbXBX3MsY2XP1_c`,
      },
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
}

export default function* redditSaga() {
  yield call(getTokenWorker);
  yield call(getTopPostsWorker);
}
