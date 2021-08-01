import { combineReducers } from "redux";
import BallReducer from "./balls/BallReducer";
import BatReducer from "./bats/BatReducer";
import UserReducer from "./users/UserReducer";

const RootReducer = combineReducers({
    ball:BallReducer,
    bat:BatReducer,
    user:UserReducer
})

export default RootReducer;