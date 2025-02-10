import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Chat from "./components/Chat";
import { useState } from "react";

function App() {
  const [token, setToken] = useState<string | null>(null);

  return (
    <Router>
      <Routes>
        {/* Route vers la page de Login */}
        <Route path="/login" element={<Login setToken={setToken} />} />
        
        {/* Route vers la page de Chat */}
        <Route path="/chat" element={token ? <Chat token={token} /> : <Navigate to="/login" />} />

        {/* Redirection par défaut */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
