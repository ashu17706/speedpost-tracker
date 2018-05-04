import {  call, put, takeLatest } from "redux-saga/effects";
import {
    LOAD_COURIER_END,
    LOAD_COURIER_START
} from "../types";

import axios from "axios";

function* getCourierInfo(action) {
    try {
        const { tracker_id, tracking_type } = action.payload;
        const response = yield call(fetchCourier,tracker_id,tracking_type);
        let data = response.data;
        
        // dispatch a success action to the store with the new dog
        yield put({ type: LOAD_COURIER_END, response: data });

    } catch (error) {
        // dispatch a failure action to the store with the error
        yield put({ type: "API_CALL_FAILURE", error });
    }
}

// function that makes the api request and returns a Promise for response
function fetchCourier(tracker_id, tracking_type) {
    return axios.post('/api',{
        tracker_id: tracker_id,
        tracking_type: tracking_type
    });
}

export const courierSaga = [
    takeLatest(LOAD_COURIER_START, getCourierInfo),
];