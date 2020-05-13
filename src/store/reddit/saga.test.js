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

jest.mock("../../services/services", () => {
  return {
    getAccessToken: jest.fn(() => ({
      response: {},
    })),
  };
});
describe("Reddit Saga", () => {
  describe("saga", () => {
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
    beforeAll(() => {
      Storage.prototype.getItem = jest.fn(() => null);
    });

    const postsMock = {
      posts: [{ author: "MJ" }, { author: "Messi" }],
      after: "afterMock",
    };
    Storage.prototype.getItem = jest.fn(() => null);

    jest.mock("./saga", () => {
      return {
        getAccessTokenWorker: jest.fn(),
        getTopPostsWorker: jest.fn(),
      };
    });
    const it = sagaHelper(getTopPostsFlow());

    it("should have called getAccessTokenWorker", (result) => {
      expect(result).toEqual(call(getAccessTokenWorker));

      return "accessTokenMock";
    });

    it("should have called the mock get access token service API", (result) => {
      expect(result).toEqual(call(getTopPostsWorker, "accessTokenMock"));

      return {
        ...postsMock,
      };
    });

    it("should have called the mock get access token service API", (result) => {
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
    const postsMock = {
      posts: [{ author: "MJ" }, { author: "Messi" }],
      after: "afterMock",
    };
    beforeAll(() => {
      Storage.prototype.getItem = jest.fn(() => "accessTokenMock");
    });

    jest.mock("./saga", () => {
      return {
        getAccessTokenWorker: jest.fn(),
        getTopPostsWorker: jest.fn(),
      };
    });

    const it = sagaHelper(getTopPostsFlow());

    it("should have called the mock get access token service API", (result) => {
      expect(result).toEqual(call(getTopPostsWorker, "accessTokenMock"));

      return {
        ...postsMock,
      };
    });

    it("should have called the mock get access token service API", (result) => {
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
});
