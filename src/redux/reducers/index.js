import { combineReducers } from "redux";

//redux
import CatReducer from "./CatReducer";

export default combineReducers({
  cats: CatReducer,
});
