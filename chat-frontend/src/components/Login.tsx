import React, { useState } from "react";
import axios from "axios";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface LoginProps {
  setToken: (token: string) => void;
}

const Login: React.FC<LoginProps> = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username) return alert("Veuillez entrer un pseudo.");

    try {
      const response = await axios.post("http://localhost:8080/login", { username });
      setToken(response.data.token);
      navigate("/chat");
    } catch (error) {
      alert("Erreur d'authentification");
      console.error(error);
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 4, maxWidth: 400, margin: "100px auto" }}>
      <Typography variant="h4" gutterBottom>
        Connexion au Chat
      </Typography>
      <Box display="flex" flexDirection="column" gap={2}>
        <TextField
          label="Pseudo"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleLogin}>
          Se connecter
        </Button>
      </Box>
    </Paper>
  );
};

export default Login;
