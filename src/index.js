import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Card, ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import ApiContext from "./context/ApiContext";
import { DetailsProvider } from "./context/DetailsContext";
import { CartContextProvider } from "./context/CartContext";
import "bootstrap/dist/css/bootstrap.min.css";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <ApiContext>
        <DetailsProvider>
        {/* <Provider store={mystore(rootStore)}> */}
          <App />
        {/* </Provider> */}
        </DetailsProvider>
      </ApiContext>
    </ThemeProvider>
  </BrowserRouter>
);
