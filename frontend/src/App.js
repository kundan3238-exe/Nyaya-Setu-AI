import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import LegalPortal from "./components/LegalPortal";
import LegalNotice from "./components/LegalNotice";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Hero from "./components/Hero";
import SearchLaw from "./components/SearchLaw";
import Fir from "./components/Fir";
import Chatbot from "./components/Chatbot";
import Map from "./components/Map";
import Cal from "./components/cal";
import Rti from "./components/rti";
import Edu from "./components/Education";
import Template from "./components/Template";
import ScrollToTop from "./components/scroll";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 transition-all duration-700">
      <Router>
        <ScrollToTop/>
        <Routes>
          {/* Default → Login */}
          <Route
            path="/"
            element={
              !isAuthenticated ? (
                <Login onLoginSuccess={() => setIsAuthenticated(true)} />
              ) : (
                <Navigate to="/portal" replace />
              )
            }
          />

          {/* Signup page */}
          <Route
            path="/signup"
            element={
              !isAuthenticated ? (
                <Signup onSignupSuccess={() => setIsAuthenticated(true)} />
              ) : (
                <Navigate to="/portal" replace />
              )
            }
          />

          {/* Protected Portal */}
          <Route
            path="/portal"
            element={
              isAuthenticated ? <div><Hero/></div> : <Navigate to="/" replace />
            }
          />
          <Route path="/search" element={<SearchLaw />} />
          <Route path="/calculate" element={<Cal />} />
          <Route path="/template" element={<Template />} />
          <Route path="/rti" element={<Rti />} />
          <Route path="/fir" element={<Fir />} />
          <Route path="/chat" element={<Chatbot />} />
          <Route path="/map" element={<Map />} />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
