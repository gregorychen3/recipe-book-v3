import { combineReducers } from "redux";
import dataReducer from "./data";
import uiReducer from "./ui";

const rootReducer = combineReducers({
  data: dataReducer,
  ui: uiReducer
});
export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
