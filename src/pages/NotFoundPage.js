import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

function NotFoundPage() {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: "10rem",
            fontWeight: "bold",
            mb: 2,
          }}
        >
          404
        </Typography>
        <Typography variant="h4" gutterBottom>
          Oops! That page can't be found.
        </Typography>
        <Typography variant="body1" color="text.secondary">
          We're really sorry but we can't seem to find the page you were looking
          for.
        </Typography>
        <Button
          variant="contained"
          component={RouterLink}
          to="/"
          sx={{ mt: 4 }}
        >
          Back The Homepage →
        </Button>
      </Box>
    </Container>
  );
}

export default NotFoundPage;
