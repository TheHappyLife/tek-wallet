import { createTheme, ThemeOptions } from "@mui/material/styles";

const typography = {
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
  leading100: "100%",
  leading120: "120%",
  leading140: "140%",
  leading160: "160%",
  leading180: "180%",
  leading200: "200%",
  fontWeight300: 300,
  fontWeight400: 400,
  fontWeight500: 500,
  fontWeight600: 600,
  fontWeight700: 700,
};

const background = {
  white: "#ffffff",
  white64: "rgba(255, 255, 255, 0.64)",
  white24: "rgba(255, 255, 255, 0.24)",
  white16: "rgba(255, 255, 255, 0.16)",
  black: "#000000",
  black64: "rgba(0, 0, 0, 0.64)",
  black24: "rgba(0, 0, 0, 0.24)",
  black16: "rgba(0, 0, 0, 0.16)",
  secondary: "#01FFFF",
  secondary16: "rgba(1, 255, 255, 0.16)",
};

const border = {
  white: "#ffffff",
  white64: "rgba(255, 255, 255, 0.64)",
  white24: "rgba(255, 255, 255, 0.24)",
  white16: "rgba(255, 255, 255, 0.16)",
  black: "#000000",
  black64: "rgba(0, 0, 0, 0.64)",
  black24: "rgba(0, 0, 0, 0.24)",
  black16: "rgba(0, 0, 0, 0.16)",
  secondary: "#01FFFF",
  secondary16: "rgba(1, 255, 255, 0.16)",
};

const text = {
  white: "#ffffff",
  white80: "rgba(255, 255, 255, 0.8)",
  white64: "rgba(255, 255, 255, 0.64)",
  white24: "rgba(255, 255, 255, 0.24)",
  successStatus: "#01FF00",
  errorStatus: "#FE6565",
  loadingStatus: "#01FFFF",
};

const gaps = {
  g2: "0.125rem",
  g4: "0.25rem",
  g6: "0.375rem",
  g8: "0.5rem",
  g10: "0.625rem",
  g12: "0.75rem",
  g16: "1rem",
  g20: "1.25rem",
  g24: "1.5rem",
  g32: "2rem",
  g40: "2.5rem",
};

const pagePadding = {
  paddingLeft: "1rem",
  paddingRight: "1rem",
  paddingTop: "1rem",
  paddingBottom: "2rem",
};

const customPadding = {
  p12: "0.75rem",
  p16: "1rem",
  p20: "1.25rem",
  p24: "1.5rem",
  p32: "2rem",
  p40: "2.5rem",
  p48: "3rem",
};

const theBorderRadius = {
  full: "999px",
  r12: "0.75rem",
};

const theme: ThemeOptions = createTheme({
  palette: {
    primary: {
      main: "#ffffff",
      contrastText: "#000000",
    },
    secondary: {
      main: "#01FFFF",
      contrastText: "#01FFFF",
    },
    background,
    border,
    text,
    divider: "rgba(255, 255, 255, 0.16)",
  },
  typography,
  mixins: {
    pagePadding,
    customPadding,
    theBorderRadius,
    gaps,
    row: {
      display: "flex",
      alignItems: "center",
    },
    column: {
      display: "flex",
      flexDirection: "column",
    },
    headerTitle: {
      color: "text.white",
      fontWeight: typography.fontWeight500,
      fontSize: typography.fontSize16,
      textAlign: "center",
    },
    sessionTitle: {
      color: "#ffffff",
      fontWeight: typography.fontWeight600,
      fontSize: typography.fontSize18,
      textAlign: "center",
    },
    sessionDescription: {
      color: text.white64,
      fontWeight: typography.fontWeight400,
      fontSize: typography.fontSize14,
      textAlign: "center",
    },
    noteContent: {
      color: text.white64,
      fontWeight: typography.fontWeight400,
      fontSize: typography.fontSize12,
    },
    fieldTitle: {
      color: "text.white",
      fontWeight: typography.fontWeight500,
      fontSize: typography.fontSize14,
    },

    center: {
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)",
    },
    value: {
      color: "text.white",
      fontWeight: typography.fontWeight500,
      fontSize: typography.fontSize14,
      lineHeight: typography.leading140,
    },
    valueDescription: {
      color: text.white64,
      fontWeight: typography.fontWeight400,
      fontSize: typography.fontSize12,
      lineHeight: typography.leading140,
    },
  },
});

export default theme;
