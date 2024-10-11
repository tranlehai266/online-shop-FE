import { CssBaseline } from "@mui/material";
import {
  alpha,
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";

const PRIMARY = {
  lighter: "#ffee58",
  light: "#fab950",
  main: "#303038",
  dark: "#808080",
  darker: "#f57f17",
  contrastText: "#fff",
};

const SECONDARY = {
  lighter: "#fff3e0",
  light: "#ffcc80",
  main: "#fb8c00",
  dark: "#ef6c00",
  darker: "#e65100",
  contrastText: "#fff",
};

const SUCCESS = {
  lighter: "#e8f5e9",
  light: "#81c784",
  main: "#4caf50",
  dark: "#388e3c",
  darker: "#2e7d32",
  contrastText: "#fff",
};

const GREY = {
  0: "#ffffff",
  100: "#f5f5f5",
  200: "#eeeeee",
  300: "#e0e0e0",
  400: "#bdbdbd",
  500: "#9e9e9e",
  600: "#757575",
  700: "#616161",
  800: "#424242",
  900: "#212121",
  500_8: alpha("#9e9e9e", 0.08),
  500_12: alpha("#9e9e9e", 0.12),
  500_16: alpha("#9e9e9e", 0.16),
  500_24: alpha("#9e9e9e", 0.24),
  500_32: alpha("#9e9e9e", 0.32),
  500_48: alpha("#9e9e9e", 0.48),
  500_56: alpha("#9e9e9e", 0.56),
  500_80: alpha("#9e9e9e", 0.8),
};

function ThemeProvider({ children }) {
  const themeOptions = {
    palette: {
      primary: PRIMARY,
      secondary: SECONDARY,
      success: SUCCESS,
      text: { primary: GREY[900], secondary: GREY[800], disabled: GREY[500] },
      background: { paper: "#fff", default: "#f5f5f5", neutral: GREY[200] },
      action: {
        active: GREY[600],
        hover: GREY[500_8],
        selected: GREY[500_16],
        disabled: GREY[500_80],
        disabledBackground: GREY[500_24],
        focus: GREY[500_24],
        hoverOpacity: 0.08,
        disabledOpacity: 0.48,
      },
    },
    shape: { borderRadius: 8 },
  };

  const theme = createTheme(themeOptions);

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}

export default ThemeProvider;
