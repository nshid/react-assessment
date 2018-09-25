import { ADD_TASK, DELETE_TASK, UPDATE_TASK } from "../constants/action-types";

const taskReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TASK:
      return [...state, action.payload];
    case DELETE_TASK:
      return state.filter(item => item.id !== action.id);
    case UPDATE_TASK:
      return state.map((item, index) => {
         if (item.id === action.id) {
           return Object.assign({}, item, action.payload);
         }
         return item;
       });
    default:
      return state;
  }
};

export default taskReducer;
