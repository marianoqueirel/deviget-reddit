import axios from "axios";
import { CLIENT_ID, CLIENT_SECRET } from "./redditCredentials";
import { REDDIT_API_URL, REDDIT_OAUTH_API_URL } from "./urls";

export default {
  getAccessToken: () => {
    // TODO: URLSearchParams is not supported by all browsers, polyfill it.
    const body = new URLSearchParams();
    body.append("grant_type", "client_credentials");

    return axios
      .post(REDDIT_API_URL, body, {
        auth: {
          username: CLIENT_ID,
          password: CLIENT_SECRET,
        },
        timeout: 4000,
      })
      .then((response) => ({ response }))
      .catch((error) => ({ error }));
  },

  getTopPosts: ({ accessToken, limit }) => {
    return axios
      .get(`${REDDIT_OAUTH_API_URL}/top?limit=${limit}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        timeout: 4000,
      })
      .then((response) => response);
  },
  getTopPostsNextPage: ({ accessToken, limit, after, count }) => {
    return axios
      .get(
        `${REDDIT_OAUTH_API_URL}/top?limit=${limit}&after=${after}&count=${count}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          timeout: 4000,
        }
      )
      .then((response) => response);
  },
};
