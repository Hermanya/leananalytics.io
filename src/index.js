import React from "react";
import ReactDOM from "react-dom";
import { Provider, connect } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import { withAuthenticator } from "aws-amplify-react/dist/Auth";
import "./index.scss";
import App from "./App";
import Amplify from "aws-amplify";
import awsconfig from "./aws-exports";
import * as serviceWorker from "./serviceWorker";

Amplify.configure(awsconfig);

const AppWithAuthentication = withAuthenticator(App);
const Root = connect(state => state)(props => {
  if (props.authenticationRequired) {
    return <AppWithAuthentication {...props} />;
  } else {
    return <App {...props} />;
  }
});

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Root />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
