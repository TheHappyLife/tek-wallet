import { createTheme, ThemeOptions } from "@mui/material/styles";

const theme: ThemeOptions = createTheme({
  palette: {
    primary: {
      main: "#ffffff",
      light: "rgba(255, 255, 255, 0.64)",
      dark: "rgba(255, 255, 255, 0.24)",
      contrastText: "#ff0000",
    },
    secondary: {
      main: "#01FF00",
      contrastText: "#0000ff",
    },
    background: {
      white: "#ffffff",
      white64: "rgba(255, 255, 255, 0.64)",
      white24: "rgba(255, 255, 255, 0.24)",
      white16: "rgba(255, 255, 255, 0.16)",
      black: "#000000",
      black64: "rgba(0, 0, 0, 0.64)",
      black24: "rgba(0, 0, 0, 0.24)",
      black16: "rgba(0, 0, 0, 0.16)",
    },
    text: {
      white: "#ffffff",
      white64: "rgba(255, 255, 255, 0.64)",
      white24: "rgba(255, 255, 255, 0.24)",
    },
    divider: "rgba(255, 255, 255, 0.16)",
  },
  typography: {
    fontSize10: "0.625rem",
    fontSize11: "0.6875rem",
    fontSize12: "0.75rem",
    fontSize13: "0.8125rem",
    fontSize14: "0.875rem",
    fontSize15: "0.9375rem",
    fontSize16: "1rem",
    fontSize17: "1.0625rem",
    fontSize18: "1.125rem",
    fontSize19: "1.1875rem",
    fontSize20: "1.25rem",
    fontSize21: "1.3125rem",
    fontSize22: "1.375rem",
    fontSize24: "1.5rem",
    fontWeight300: 300,
    fontWeight400: 400,
    fontWeight500: 500,
    fontWeight600: 600,
    fontWeight700: 700,
  },
  spacing: 8,
  mixins: {
    pagePadding: {
      paddingLeft: "1rem",
      paddingRight: "1rem",
      paddingTop: "1rem",
      paddingBottom: "2rem",
    },
    sessionTitle: {
      color: "#ffffff",
      fontWeight: 600,
      fontSize: "1.125rem",
      textAlign: "center",
    },
    sessionDescription: {
      color: "text.white64",
      fontWeight: 400,
      fontSize: "0.875rem",
      textAlign: "center",
    },
    headerTitle: {
      color: "text.white",
      fontWeight: 600,
      fontSize: "1rem",
      textAlign: "center",
    },
    noteContent: {
      color: "text.white64",
      fontWeight: 400,
      fontSize: "0.75rem",
    },
    theBorderRadius: {
      full: "50%",
    },
    center: {
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)",
    },
  },
});

export default theme;
