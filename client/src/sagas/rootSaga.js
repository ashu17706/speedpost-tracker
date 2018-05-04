import { all } from "redux-saga/effects";
import { courierSaga } from "./courier";

export default function* rootSaga() {
    yield all([
        ...courierSaga
    ]);
}