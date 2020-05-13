import axios from "axios";
import { CLIENT_ID, CLIENT_SECRET } from "./redditCredentials";
import { REDDIT_API_URL, REDDIT_OAUTH_API_URL, TIMEOUT } from "./env";

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
        timeout: TIMEOUT,
      })
      .then((response) => ({ response }))
      .catch((error) => ({ error }));
  },

  // TODO use a timeout generic unless the services needs a different one
  getTopPosts: ({ accessToken, limit, after, count }) => {
    return axios
      .get(`${REDDIT_OAUTH_API_URL}/top?`, {
        params: {
          ...(limit && { limit }),
          ...(after && { after }),
          ...(count && { count }),
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        timeout: TIMEOUT,
      })
      .then((response) => response);
  },
};
