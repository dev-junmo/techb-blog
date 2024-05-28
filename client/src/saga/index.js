import axios from "axios";
import { all, fork } from "redux-saga/effects";
import postSaga from "./post";
import userSaga from "./user";

// import dotenv from "dotenv";

// dotenv.config();

axios.defaults.baseURL = process.env.REACT_APP_URL;
axios.defaults.withCredentials = true;

export default function* rootSaga() {
  yield all([
    fork(postSaga),
    fork(userSaga),
  ]);
}