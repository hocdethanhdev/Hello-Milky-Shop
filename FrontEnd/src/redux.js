import rootReducer from "./components/store/reducers/rootReducer";
import { createStore, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";
import { thunk } from 'redux-thunk'

const reduxStore = () => {
  const store = createStore(rootReducer, applyMiddleware(thunk));
  const persistor = persistStore(store);

  return { store, persistor };
};

export default reduxStore;
