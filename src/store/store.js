import { createStore, applyMiddleware } from "redux";
import createSagaMiddleWare from "redux-saga";
import rootSaga from "../sagas/tasksaga";
import { TaskReducer } from "../reducers/taskreducer";

const sagaMiddleWare = createSagaMiddleWare();

const store = createStore(TaskReducer, applyMiddleware(sagaMiddleWare));
sagaMiddleWare.run(rootSaga);

export default store;
