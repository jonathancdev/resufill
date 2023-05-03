import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import { Box } from "@chakra-ui/react";

import Home from "./pages/Home";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Account from "./pages/Account";
import Print from "./pages/Print";
import Navbar from "./components/Navbar";

function App() {
  const { user } = useAuthContext();
  return (
    <Box minH="100vh" pos="rel" className="App">
      <BrowserRouter>
        <Box bgGradient="linear(to-br, gray.50, blue.50)" pos="rel">
          <Navbar />
          <Box className="pages" pos="rel">
            <Routes>
              <Route
                path="/"
                element={user ? <Home /> : <Navigate to="/welcome" />}
              />
              <Route
                path="/welcome"
                element={!user ? <Welcome /> : <Navigate to="/" />}
              />
              <Route
                path="/login"
                element={!user ? <Login /> : <Navigate to="/" />}
              />
              <Route
                path="/signup"
                element={!user ? <Signup /> : <Navigate to="/" />}
              />
              <Route
                path="/account"
                element={user ? <Account /> : <Navigate to="/welcome" />}
              />
              <Route
                path="/print"
                element={user ? <Print /> : <Navigate to="/welcome" />}
              />
            </Routes>
          </Box>
        </Box>
      </BrowserRouter>
    </Box>
  );
}

export default App;
