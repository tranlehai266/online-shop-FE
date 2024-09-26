import { createTheme } from "@mui/material/styles";

const loginTheme = createTheme({
  palette: {
    primary: {
      lighter: "#6d6d6d", // Màu xanh nhạt
      light: "#6d6d62", // Màu xanh sáng
      main: "#000", // Màu xanh chính
      dark: "#6d6d6d", // Màu xanh đậm
      darker: "#6d6d6d", // Màu xanh đậm hơn
      contrastText: "#fff", // Màu chữ đối lập
    },
    secondary: {
      main: "#0023", // Màu phụ
    },
  },
  shape: {
    borderRadius: 8, // Bo góc
  },
});

export default loginTheme;
