import sagaHelper from "redux-saga-testing";
import {
  getAccessTokenWorker,
  getTopPostsFlow,
  getTopPostsWorker,
} from "./saga";
import { apiRequestSuccess } from "../events/actions";

import * as actions from "./actions";
import { setLoader } from "../loader/actions";
import { isLoading } from "../loader/selector";
import services from "../../services/services";
import { call, put, select } from "redux-saga/effects";

// TODO This test file need more work... and more tests.

jest.mock("../../services/services", () => {
  return {
    getAccessToken: jest.fn(),
  };
});

describe("Reddit Saga", () => {
  const accessTokenMock = "accessTokenMock";
  const topPostsSuccessRequestMock = {
    data: {
      posts: [{ author: "MJ" }, { author: "Messi" }],
      after: "afterMock",
    },
  };
  const getAccessTokenRequestsSuccessMock = {
    data: {
      access_token: accessTokenMock,
    },
  };
  const localStorageGetItemMock = jest.fn(() => null);
  const localStorageSetItemMock = jest.fn(() => null);

  describe("Get Access Token Worker", () => {
    const it = sagaHelper(getAccessTokenWorker());

    it("should have called the mock get access token service API", (result) => {
      expect(result).toEqual(call(services.getAccessToken));

      return { response: { ...getAccessTokenRequestsSuccessMock } };
    });

    it("should dispatch apiRequestSuccess action", (result) => {
      expect(result).toEqual(
        put(
          apiRequestSuccess({
            feature: "getAccessToken",
            ...getAccessTokenRequestsSuccessMock,
          })
        )
      );
    });

    it("should not have called nothing more", (result) => {
      expect(result).toBeUndefined();
    });
  });

  describe("Get Top Posts Saga when access token does not exists", () => {
    beforeAll(() => {
      Storage.prototype.getItem = localStorageGetItemMock;
      Storage.prototype.setItem = localStorageSetItemMock;
    });

    jest.mock("./saga", () => {
      return {
        getAccessTokenWorker: jest.fn(),
        getTopPostsWorker: jest.fn(),
      };
    });
    const it = sagaHelper(getTopPostsFlow());

    it("should have called getAccessTokenWorker", (result) => {
      expect(result).toEqual(call(getAccessTokenWorker));

      return {
        payload: { ...getAccessTokenRequestsSuccessMock },
      };
    });

    test("should have called local storage get item", () => {
      expect(localStorageGetItemMock).toHaveBeenCalled();
    });

    it("should have called the getTopPostsWorker method", (result) => {
      expect(result).toEqual(call(getTopPostsWorker, accessTokenMock));

      return {
        payload: {
          ...topPostsSuccessRequestMock,
        },
      };
    });

    test("should have called local storage set item", () => {
      expect(localStorageSetItemMock).toHaveBeenCalled();
    });

    it("should have called setPost action to dispatch to the store", (result) => {
      const {
        data: { posts, after },
      } = topPostsSuccessRequestMock;
      expect(result).toEqual(put(actions.setPosts({ posts, after })));
    });

    it("should select the current username from the state", (result) => {
      expect(result).toEqual(select(isLoading));
      return false;
    });

    it("should have called the mock get access token service API", (result) => {
      expect(result).toBeUndefined();
    });
  });

  describe("Get Top Posts Saga  when access token does exists", () => {
    const localStorageGetItemMock = jest.fn(() => accessTokenMock);
    const localStorageSetItemMock = jest.fn();

    beforeAll(() => {
      Storage.prototype.getItem = localStorageGetItemMock;
      Storage.prototype.setItem = localStorageSetItemMock;
    });

    jest.mock("./saga", () => {
      return {
        getAccessTokenWorker: jest.fn(),
        getTopPostsWorker: jest.fn(),
      };
    });

    const it = sagaHelper(getTopPostsFlow());

    it("should have called getTopPostsWorker method", (result) => {
      expect(result).toEqual(call(getTopPostsWorker, accessTokenMock));

      return {
        payload: {
          ...topPostsSuccessRequestMock,
        },
      };
    });

    test("should not have called local storage set item", () => {
      expect(localStorageSetItemMock).not.toHaveBeenCalled();
    });

    it("should have called setPost action to dispatch to the store", (result) => {
      const {
        data: { posts, after },
      } = topPostsSuccessRequestMock;
      expect(result).toEqual(put(actions.setPosts({ posts, after })));
    });

    it("should select the current username from the state", (result) => {
      expect(result).toEqual(select(isLoading));
      return true;
    });

    it("should have called the mock get access token service API", (result) => {
      expect(result).toEqual(put(setLoader(false)));
    });

    it("should have called the mock get access token service API", (result) => {
      expect(result).toBeUndefined();
    });
  });
});
