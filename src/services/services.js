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
        timeout: 2000,
      })
      .then((response) => ({ response }))
      .catch((error) => ({ error }));
  },

  getTopPosts: (accessToken) => {
    return axios
      .get(REDDIT_OAUTH_API_URL, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        timeout: 2000,
      })
      .then((response) => ({ response }))
      .catch((error) => ({ error }));
  },
};
