//import { Container, Row, Col } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Adminhome from "./components/adminhome";
import ProtectedRoute from "./components/ProtectedRoute";
import Temp from "./components/temp";
import { UserAuthContextProvider } from "./context/UserAuthContext";


function App() {
  return (
          <UserAuthContextProvider>
            <Routes>
              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/temp" element={<Temp />} />
              <Route path="/admin" element={<Adminhome />} />
            </Routes>
          </UserAuthContextProvider>
  );
}

export default App;
