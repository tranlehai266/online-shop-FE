import { createTheme } from "@mui/material/styles";

const loginTheme = createTheme({
  palette: {
    primary: {
      lighter: "#6d6d6d",
      main: "#000",
      dark: "#6d6d6d",
      darker: "#6d6d6d",
      contrastText: "#fff",
    },
    secondary: {
      main: "#0023",
    },
  },
  shape: {
    borderRadius: 8,
  },
});

export default loginTheme;
