import { LOAD_COURIER_START, LOAD_COURIER_END } from "../types";

const initialState = {
    loading: false,
    loaded: false,
    error: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOAD_COURIER_START:
            return {
                ...state,
                loading: true
            };


        case LOAD_COURIER_END:
            return {
                ...state,
                data: action.response,
                loading: false,
                loaded: true
            };

        default:
            return state;
    }
};