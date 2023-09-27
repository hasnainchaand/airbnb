import { combineReducers } from "redux";
import mainReducer from "./Reducers";

const rootReducer = combineReducers({
    increamentReducer:mainReducer
})
export default rootReducer