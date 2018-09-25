import { UPDATE_FORM } from "../constants/action-types";

const formReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_FORM:
      return {...state, [action.id]: action.payload };
    default:
      return state;
  }
};

export default formReducer;
