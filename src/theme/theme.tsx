import { createTheme } from "@mui/material/styles";

// Light Theme
export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#f39c4f",
    },
    secondary: {
      main: "#aa6d37",
    },
    background: {
      default: "#F5F5F5",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#333333",
      secondary: "#666666",
    },
    action: {
      active: "#f39c4f",
      hover: "#aa6d37",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    fontSize: 16,
  },
  shape: {
    borderRadius: 8,
  },
  spacing: 8,
});

// Dark Theme
export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#2196F3",
    },
    secondary: {
      main: "#FF4081",
    },
    background: {
      default: "#121212",
      paper: "#1E1E1E",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#B0B0B0",
    },
    action: {
      active: "#2196F3",
      hover: "#FF4081",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    fontSize: 16,
  },
  shape: {
    borderRadius: 8,
  },
  spacing: 8,
});

export default { lightTheme, darkTheme };
