import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../src/theme/theme.js";
import "@fontsource/source-serif-pro"; //400
import "@fontsource/source-serif-pro/200.css";
import "@fontsource/source-serif-pro/600.css";
import "@fontsource/source-serif-pro/900.css";
import "@fontsource/source-sans-pro"; //400
import "@fontsource/source-sans-pro/200.css";
import "@fontsource/source-sans-pro/600.css";
import "@fontsource/source-sans-pro/900.css";
import "@fontsource/josefin-slab/"; //400
import "@fontsource/josefin-slab/500.css";
import "@fontsource/josefin-slab/600.css";
import "@fontsource/josefin-slab/700.css";

import { ProfileContextProvider } from "./context/ProfileContext";
import { AuthContextProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <AuthContextProvider>
        <ProfileContextProvider>
          <App />
        </ProfileContextProvider>
      </AuthContextProvider>
    </ChakraProvider>
  </React.StrictMode>
);
