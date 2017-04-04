import { applyMiddleware, createStore } from "redux";

import thunk from "redux-thunk";
import reducer from "./reducers";
import promise from "redux-promise-middleware";

const middleware = applyMiddleware(promise(), thunk);

// Can also take in some middleware here as the second argument
export default createStore(reducer, middleware)
