import * as React from "react";
import * as ReactDOM from "react-dom";
import "glamor-reset";
import { css } from "glamor";
import App from "./app";

css.global("body", {
  color: "#666",
  fontFamily: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif`,
  fontSize: 16,
  fontWeight: 200
});

ReactDOM.render(
  <App />,
  document.getElementById("root")
);
