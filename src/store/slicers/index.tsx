import { combineReducers } from "redux";
import common from "./common";
import auth from "./auth";
import company from "./company";
import product from "./product";

const reducers = { common, auth, company, product: product };

const combinedReducers = combineReducers(reducers);
export default combinedReducers;
