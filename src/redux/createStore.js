import { legacy_createStore as createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";
import { thunk } from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import { persistStore } from "redux-persist";

const sagaMiddleware = createSagaMiddleware();
export const middlewares = [thunk, sagaMiddleware, logger];

export const store = createStore(rootReducer, applyMiddleware(...middlewares));
sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

export default { store, persistor };
