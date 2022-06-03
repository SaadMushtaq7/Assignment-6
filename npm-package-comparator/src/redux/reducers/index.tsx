import { combineReducers } from "redux";
import { packageReducer } from "./filesReducer";
const reducers = combineReducers({
  bothPackages: packageReducer,
});
export default reducers;
