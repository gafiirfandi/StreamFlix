import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { moneyReducer } from "./money/money-reducer";
import { moviesReducer } from "./movies/movies-reducer";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["movies"],
};

const persistMoviesConfig = {
  key: "movies",
  storage,
};

const rootReducer = combineReducers({
  money: moneyReducer,
  moviesReducer: persistReducer(persistMoviesConfig, moviesReducer),
});

export default persistReducer(persistConfig, rootReducer);
