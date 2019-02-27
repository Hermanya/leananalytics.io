import { call, takeLatest } from "redux-saga/effects";
import Auth from "@aws-amplify/auth";

function* logout(action) {
  yield call(Auth.signOut);
}

function* mySaga() {
  yield takeLatest("LOGOUT", logout);
}

export default mySaga;
