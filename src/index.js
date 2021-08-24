import React from "react";
import ReactDOM from "react-dom";
import "./style/index.css";
import { createStore, applyMiddleware } from "redux";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import allReducers from "./store/Reducers";
import Router from "./components/router";
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const composeEnhancers = composeWithDevTools({
	__REDUX_DEVTOOLS_EXTENSION__: window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
});
const store = createStore(allReducers, composeEnhancers(
	applyMiddleware(thunk)
));

ReactDOM.render(
  <Provider store={store}>
    <Router />
  </Provider>,

  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
