import { API_CALL_INIT, API_CALL_FAILURE, API_CALL_COMPLETE, API_CALL_CREATE, API_CALL_DELETE, API_CALL_REQUEST, API_CALL_SUCCESS, API_CALL_UPDATE } from "../constants/action-types";

const initialState = {
  fetching: false,
  result: null,
  initialized: false,
  error: null
};

const apiReducer = (state = initialState, action) => {
  switch (action.type) {
    case API_CALL_INIT:
      return { ...state, fetching: true, initialized: true, error: null };
    case API_CALL_COMPLETE:
    case API_CALL_CREATE:
    case API_CALL_DELETE:
    case API_CALL_REQUEST:
    case API_CALL_UPDATE:
      return { ...state, fetching: true, error: null };
    case API_CALL_SUCCESS:
      return { ...state, fetching: false, result: action.result };
    case API_CALL_FAILURE:
      return { ...state, fetching: false, result: null, error: action.error };
    default:
      return state;
  }
};

export default apiReducer;
