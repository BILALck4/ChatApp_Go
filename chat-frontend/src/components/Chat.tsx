import React, { useEffect, useState, useRef } from "react";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";

interface ChatProps {
  token: string;
}

const Chat: React.FC<ChatProps> = ({ token }) => {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const ws = useRef<WebSocket | null>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  
  useEffect(() => {
    // Connexion WebSocket avec le token JWT
    ws.current = new WebSocket(`ws://localhost:8080/ws?token=${token}`);

    ws.current.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
    };

    return () => {
      ws.current?.close();
    };
  }, [token]);

  const sendMessage = () => {
    if (inputMessage.trim() === "") return;
    ws.current?.send(inputMessage);
    setInputMessage("");
  };

  return (
    <Paper
      elevation={5}
      sx={{
        padding: 4,
        maxWidth: 600,
        margin: "50px auto",
        backgroundColor: "#f0f4f8",
        borderRadius: "16px",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        color="#1565c0"
        fontWeight="bold"
      >
        💬 Chat en Direct
      </Typography>
      <Box
        sx={{
          border: "1px solid #ddd",
          height: 300,
          overflowY: "auto",
          backgroundColor: "#ffffff",
          padding: 2,
          marginBottom: 2,
          borderRadius: "12px",
        }}
      >
        {messages.map((msg, index) => (
          <Typography
            key={index}
            variant="body1"
            sx={{
              backgroundColor: index % 2 === 0 ? "#e3f2fd" : "#ffecb3",
              padding: "8px",
              borderRadius: "8px",
              margin: "4px 0",
              color: "#333",
            }}
          >
            {msg}
          </Typography>
        ))}
        <div ref={chatEndRef} />
      </Box>

      <Box display="flex" gap={1}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Tapez un message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          sx={{
            borderRadius: "8px",
            backgroundColor: "#ffffff",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={sendMessage}
          sx={{
            backgroundColor: "#1565c0",
            color: "#ffffff",
            fontWeight: "bold",
            textTransform: "none",
            borderRadius: "8px",
            "&:hover": {
              backgroundColor: "#0d47a1",
            },
          }}
        >
          Envoyer 🚀
        </Button>
      </Box>
    </Paper>
  );
};

export default Chat;
