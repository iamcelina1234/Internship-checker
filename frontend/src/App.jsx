
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Checker from "./pages/Checker";
import "./App.css";
import History from "./pages/History";
import Settings from "./pages/Setting";

function ProtectedRoute({ children }) {
  const token = sessionStorage.getItem("token");

  if (!token) {
    window.location.href = "/login";
    return null;
  }

  return children;
}


function App() {
  
  return (
  <BrowserRouter>
    <Routes>

      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/checker"
  element={
    <ProtectedRoute>
      <Checker />
    </ProtectedRoute>
  }
/>

<Route
  path="/history"
  element={
    <ProtectedRoute>
      <History />
    </ProtectedRoute>
  }
/>

<Route
  path="/settings"
  element={
    <ProtectedRoute>
      <Settings />
    </ProtectedRoute>
  }
/>
    </Routes>
  </BrowserRouter>
);
}

export default App;