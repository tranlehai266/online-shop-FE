import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Container, Alert, Typography } from "@mui/material";
import useAuth from "../hooks/useAuth";
import { isValidToken } from "../utils/jwt";

function VerifyPage() {
  const { verify } = useAuth();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  const handleVerify = async () => {
    const token = localStorage.getItem("tokenRegister");
    if (!isValidToken(token)) {
      setError("Token không hợp lệ hoặc đã hết hạn.");
      return; // Không tiếp tục nếu token không hợp lệ
    }
    try {
      await verify({ code, token }, (message) => {
        alert(message);
        window.localStorage.removeItem("tokenRegister");
        navigate("/login");
      });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 5, position: "absolute" }}>
      <Typography variant="h5" textAlign="center">
        Cofirm Code
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <TextField
        fullWidth
        label="Authentication Code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        sx={{ mb: 2, mt: 2 }}
      />
      <Button variant="contained" onClick={handleVerify} fullWidth>
        Submit
      </Button>
    </Container>
  );
}

export default VerifyPage;
