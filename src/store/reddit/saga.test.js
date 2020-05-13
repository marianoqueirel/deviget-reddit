import sagaHelper from "redux-saga-testing";
import {
  getAccessTokenWorker,
  getTopPostsFlow,
  getTopPostsWorker,
} from "./saga";
import * as actions from "./actions";
import { setLoader } from "../loader/actions";
import services from "../../services/services";
import { call, put } from "redux-saga/effects";
// TODO This test file need more work... and more tests.

jest.mock("../../services/services", () => {
  return {
    getAccessToken: jest.fn(() => ({
      response: {},
    })),
  };
});
describe("Reddit Saga", () => {
  const postsMock = {
    posts: [{ author: "MJ" }, { author: "Messi" }],
    after: "afterMock",
  };
  const accessTokenMock = "accessTokenMock";
  describe("Get Access Token Worker", () => {
    const it = sagaHelper(getAccessTokenWorker());

    it("should have called the mock get access token service API", (result) => {
      expect(result).toEqual(call(services.getAccessToken));

      return {
        response: {
          status: 200,
        },
      };
    });
    it("should not have called nothing more", (result) => {
      expect(result).toBeUndefined();
    });
  });

  describe("Get Top Posts Saga when access token does not exists", () => {
    const localStorageGetItemMock = jest.fn(() => null);
    const localStorageSetItemMock = jest.fn(() => null);

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

      return accessTokenMock;
    });

    test("should have called local storage get item", () => {
      expect(localStorageGetItemMock).toHaveBeenCalled();
    });

    it("should have called the getTopPostsWorker method", (result) => {
      expect(result).toEqual(call(getTopPostsWorker, accessTokenMock));

      return {
        ...postsMock,
      };
    });

    test("should have called local storage set item", () => {
      expect(localStorageSetItemMock).toHaveBeenCalled();
    });

    it("should have called setPost action to dispatch to the store", (result) => {
      expect(result).toEqual(put(actions.setPosts({ ...postsMock })));

      return {
        response: {
          status: 200,
        },
      };
    });

    it("should have called the mock get access token service API", (result) => {
      expect(result).toEqual(put(setLoader(false)));
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
        ...postsMock,
      };
    });

    it("should have dispatched setPosts with the posts", (result) => {
      expect(result).toEqual(put(actions.setPosts({ ...postsMock })));

      return {
        response: {
          status: 200,
        },
      };
    });

    it("should have turned off loader", (result) => {
      expect(result).toEqual(put(setLoader(false)));
    });

    it("should have called the mock get access token service API", (result) => {
      expect(result).toBeUndefined();
    });
  });
});
