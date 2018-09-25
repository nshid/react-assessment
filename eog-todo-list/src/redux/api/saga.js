import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { API_CALL_FAILURE, API_CALL_CREATE, API_CALL_COMPLETE, API_CALL_DELETE, API_CALL_REQUEST, API_CALL_SUCCESS, API_CALL_UPDATE } from "../constants/action-types";
import fetch from 'isomorphic-fetch';

const API_URL = 'https://practiceapi.devmountain.com/api/tasks';

export function* watcherSaga(action) {
  yield all([
    takeLatest(API_CALL_REQUEST, workerSaga, 'FETCH'),
    takeEvery(API_CALL_DELETE, workerSaga, 'DELETE'),
    takeLatest(API_CALL_CREATE, workerSaga, 'CREATE'),
    takeEvery(API_CALL_COMPLETE, workerSaga, 'COMPLETE'),
    takeEvery(API_CALL_UPDATE, workerSaga, 'UPDATE')
  ]);
}

function performTask(url, params) {
  return fetch(url, params).then(res => {
    if (res.ok) {
      return res.json();
    }
  });
}

function fetchTask() {
  return performTask(API_URL);
}

function createTask(task) {
  return performTask(API_URL, { method: "POST", headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }, body: JSON.stringify(task) });
}

function deleteTask(task) {
  return performTask(API_URL + '/' + task.id, { method: "DELETE" });
}

function updateTask(task) {
  return performTask(API_URL + '/' + task.id, { method: "PATCH", headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }, body: JSON.stringify(task) });
}

function completeTask(task) {
  return performTask(API_URL + '/' + task.id, { method: "PUT" });
}

function* workerSaga(requestType, action) {
  try {
    let taskFunc;
    switch (requestType) {
      case 'UPDATE':
        taskFunc = updateTask;
        break;
      case 'DELETE':
        taskFunc = deleteTask;
        break;
      case 'CREATE':
        taskFunc = createTask;
        break;
      case 'COMPLETE':
        taskFunc = completeTask;
        break;
      case 'FETCH':
      default:
        taskFunc = fetchTask;
        break;
    }

    const response = yield call(taskFunc, action.payload);
    const result = response;
    yield put({ type: API_CALL_SUCCESS, result });
  } catch (error) {
    console.error(error, [requestType, action], 'workerSaga');
    yield put({ type: API_CALL_FAILURE, error });
  }
}
