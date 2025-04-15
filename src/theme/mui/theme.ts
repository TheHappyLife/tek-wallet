import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ffffff",
    },
    secondary: {
      main: "#01FF00",
    },
    whiteBackground: {
      main: "#ffffff",
      _16: "rgba(255, 255, 255, 0.16)",
      _24: "rgba(255, 255, 255, 0.24)",
    },
    whiteText: {
      main: "#ffffff",
      _16: "rgba(255, 255, 255, 0.16)",
      _24: "rgba(255, 255, 255, 0.24)",
      _80: "rgba(255, 255, 255, 0.8)",
    },
    whiteBorder: {
      main: "#ffffff",
      _16: "rgba(255, 255, 255, 0.16)",
      _24: "rgba(255, 255, 255, 0.24)",
    },
    blackBackground: {
      main: "#000000",
      _16: "rgba(0, 0, 0, 0.16)",
      _24: "rgba(0, 0, 0, 0.24)",
    },
    fontSize: {
      _10: "0.625rem",
      _11: "0.6875rem",
      _12: "0.75rem",
      _13: "0.8125rem",
      _14: "0.875rem",
      _15: "0.9375rem",
      _16: "1rem",
      _17: "1.0625rem",
      _18: "1.125rem",
      _19: "1.1875rem",
      _20: "1.25rem",
      _21: "1.3125rem",
      _22: "1.375rem",
      _23: "1.4375rem",
      _24: "1.5rem",
      _25: "1.5625rem",
      _26: "1.625rem",
      _27: "1.6875rem",
      _28: "1.75rem",
      _29: "1.8125rem",
      _30: "1.875rem",
    },
    fontWeight: {
      _400: "400",
      _500: "500",
      _600: "600",
      _700: "700",
      _800: "800",
    },
    lineHeight: {
      _100: "100%",
      _120: "120%",
      _140: "140%",
      _160: "160%",
      _180: "180%",
    },
    padding: {
      pageX: "1rem",
      pageTop: "1rem",
      pageBottom: "2rem",
    },
  },
  spacing: (factor: number) => `${factor * 1}rem`,
});

export default theme;
