 import { createStore,applyMiddleware } from "redux";
import {composeWithDevTools} from 'redux-devtools-extension'
import RootReducer from "./RootReducer";
import thunk from 'redux-thunk'



// reducers combined form me dalne chahie
const store = createStore(RootReducer,composeWithDevTools(applyMiddleware(thunk)));
export default store;