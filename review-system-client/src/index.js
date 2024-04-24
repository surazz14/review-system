import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "mobx-react";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "./theme";
import store from "./entities/setUpStore";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

function WrapThemeProvider(props) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {props.children}
    </ThemeProvider>
  );
}

ReactDOM.render(
  <Provider {...store}>
    <WrapThemeProvider>
      <App />
    </WrapThemeProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
