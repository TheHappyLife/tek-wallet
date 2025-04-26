import { createTheme, Shadows, ThemeOptions } from "@mui/material/styles";

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
  white80: "rgba(255, 255, 255, 0.8)",
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
  secondary: "#01FFFF",
  successStatus: "#01FF00",
  errorStatus: "#FE6565",
  loadingStatus: "#01FFFF",
  increase: "#01FF00",
  decrease: "#FE6565",
  warningStatus: "#FFA500",
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
  p4: "0.25rem",
  p6: "0.375rem",
  p8: "0.5rem",
  p10: "0.625rem",
  p12: "0.75rem",
  p16: "1rem",
  p20: "1.25rem",
  p24: "1.5rem",
  p32: "2rem",
  p40: "2.5rem",
  p48: "3rem",
};
const customMargin = {
  m4: "0.25rem",
  m6: "0.375rem",
  m8: "0.5rem",
  m10: "0.625rem",
  m12: "0.75rem",
  m16: "1rem",
  m20: "1.25rem",
  m24: "1.5rem",
  m32: "2rem",
  m40: "2.5rem",
  m48: "3rem",
};

const theBorderRadius = {
  full: "999px",
  r12: "0.75rem",
  r16: "1rem",
};

const shadows = [
  "none",
  "inset 0px 0px 50px 8px rgba(255, 255, 255, 0.1)", // 0
  "0px 0px 50px 8px rgba(255, 255, 255, 0.1)", // 1
  "0px 5px 15px rgba(255, 255, 255, 0.1)", // 2
  "0px 5px 15px rgba(255, 255, 255, 0.2)", // 3
  "0px 6px 24px rgba(255, 255, 255, 0.1)", // 4
  "0px 10px 20px rgba(255, 255, 255, 0.1)", // 5
  "0px 12px 24px rgba(255, 255, 255, 0.2)", // 6
  "0px 15px 30px rgba(255, 255, 255, 0.1)", // 7
  "0px 15px 30px rgba(255, 255, 255, 0.2)", // 8
  "0px 18px 36px rgba(255, 255, 255, 0.1)", // 9
  "0px 18px 36px rgba(255, 255, 255, 0.2)", // 10
  "0px 20px 40px rgba(255, 255, 255, 0.1)", // 11
  "0px 20px 40px rgba(0, 0, 0, 0.2)", // 12
  "0px 24px 48px rgba(0, 0, 0, 0.1)", // 13
  "0px 24px 48px rgba(0, 0, 0, 0.2)", // 14
  "0px 30px 60px rgba(0, 0, 0, 0.1)", // 15
  "0px 30px 60px rgba(0, 0, 0, 0.2)", // 16
  "0px 35px 70px rgba(0, 0, 0, 0.1)", // 17
  "0px 35px 70px rgba(0, 0, 0, 0.2)", // 18
  "0px 40px 80px rgba(0, 0, 0, 0.1)", // 19
  "0px 40px 80px rgba(0, 0, 0, 0.2)", // 20
  "0px 45px 90px rgba(0, 0, 0, 0.1)", // 21
  "0px 45px 90px rgba(0, 0, 0, 0.2)", // 22
  "0px 50px 100px rgba(0, 0, 0, 0.1)", // 23
];

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
  shadows: shadows as Shadows,
  mixins: {
    pagePadding,
    customPadding,
    customMargin,
    theBorderRadius,
    gaps,
    row: {
      display: "flex",
      alignItems: "center",
    },
    column: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
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
      color: "text.white80",
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
    validationError: {
      color: text.errorStatus,
      fontWeight: typography.fontWeight400,
      fontSize: typography.fontSize12,
      lineHeight: typography.leading140,
    },
    whiteLoadingOverlay: {
      backgroundColor: "background.white16",
      backdropFilter: "blur(2px)",
      zIndex: 1000,
      position: "absolute",
      inset: 0,
    },
    paper: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      gap: gaps.g12,
      padding: customPadding.p12,
      backgroundColor: "background.white16",
      borderRadius: theBorderRadius.r16,
    },
    listTitle: {
      color: "text.white",
      fontWeight: typography.fontWeight500,
      fontSize: typography.fontSize14,
      lineHeight: typography.leading140,
      textTransform: "capitalize",
    },
    listDescription: {
      color: "text.white64",
      fontWeight: typography.fontWeight400,
      fontSize: typography.fontSize12,
      lineHeight: typography.leading140,
    },
    smallButton: {
      fontSize: typography.fontSize11,
      padding: `${customPadding.p4} ${customPadding.p8}`,
      height: "fit-content",
      minHeight: "unset",
      minWidth: "unset",
      width: "fit-content",
      borderRadius: theBorderRadius.full,
      lineHeight: typography.leading100,
    },
    dialogContent: {
      fontSize: typography.fontSize14,
      lineHeight: typography.leading140,
      color: text.white,
    },
    dialogActionsOk: {
      fontSize: typography.fontSize14,
      lineHeight: typography.leading100,
      color: "#2482ff",
      textAlign: "center",
      padding: `${customPadding.p8} ${customPadding.p16}`,
    },
    dialogActionsCancel: {
      fontSize: typography.fontSize14,
      lineHeight: typography.leading140,
      color: text.white64,
      textAlign: "center",
      padding: `${customPadding.p8} ${customPadding.p16}`,
    },
  },
});

export default theme;
