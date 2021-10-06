import React from "react";
import ReactDOM from "react-dom";
import App from "App";

import {
  ThemeProvider,
  unstable_createMuiStrictModeTheme as createTheme,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import AuthLayer from "components/AuthLayer";
import theme from "styles/theme";
import "styles/index.scss";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={createTheme(theme)}>
      <CssBaseline />
      <AuthLayer>
        <App />
      </AuthLayer>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
