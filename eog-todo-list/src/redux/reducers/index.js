import { combineReducers, applyMiddleware, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { watcherSaga } from "../api/saga";
import taskReducer from "./taskReducer";
import formReducer from "./formReducer";
import apiReducer from "./apiReducer";

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = (initialState) => {
  const reducers = combineReducers({ tasks: taskReducer, forms: formReducer, apis: apiReducer });
  const store = createStore(
    reducers,
    initialState,
    composeEnhancers(applyMiddleware(sagaMiddleware))
  );
  sagaMiddleware.run(watcherSaga);

  return store;
};

export default configureStore;
