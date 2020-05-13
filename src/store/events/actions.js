import { API_REQUESTS_SUCCESS, API_REQUESTS_FAILURE } from "./actionTypes";
// EVENT ACTIONS

export const apiRequestSuccess = ({
  feature,
  data,
  status,
  statusText,
  headers,
  config,
  request,
}) => ({
  type: API_REQUESTS_SUCCESS,
  payload: {
    feature,
    data,
    status,
    statusText,
    headers,
    config,
    request,
  },
});

export const apiRequestsFailure = ({ data, status, headers, feature }) => ({
  type: API_REQUESTS_FAILURE,
  payload: {
    feature,
    data,
    status,
    headers,
  },
});
