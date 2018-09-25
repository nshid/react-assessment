import { ADD_TASK, API_CALL_INIT, API_CALL_REQUEST, API_CALL_COMPLETE, API_CALL_CREATE, API_CALL_DELETE, API_CALL_UPDATE, DELETE_TASK, UPDATE_FORM, UPDATE_TASK } from "../constants/action-types";

export const addTask = task => ({ type: ADD_TASK, payload: task });
export const deleteTask = tid => ({ type: DELETE_TASK, id: tid });
export const initTask = () => ({ type: API_CALL_INIT });
export const requestTask = task => ({ type: API_CALL_REQUEST, payload: task });
export const requestCompleteTask = task => ({ type: API_CALL_COMPLETE, payload: task });
export const requestCreateTask = task => ({ type: API_CALL_CREATE, payload: task });
export const requestDeleteTask = task => ({ type: API_CALL_DELETE, payload: task });
export const requestUpdateTask = task => ({ type: API_CALL_UPDATE, payload: task });
export const updateTask = (tid, task) => ({ type: UPDATE_TASK, id: tid, payload: task });
export const updateForm = (fid, form) => ({ type: UPDATE_FORM, id: fid, payload: form });
