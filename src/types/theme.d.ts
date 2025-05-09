import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface TypeText {
    white: string;
    white80: string;
    white64: string;
    white24: string;
    successStatus: string;
    errorStatus: string;
    loadingStatus: string;
    increase: string;
    decrease: string;
    warningStatus: string;
  }

  interface BorderType {
    white: string;
    white64: string;
    white24: string;
    white16: string;
    black: string;
    black64: string;
    black24: string;
    black16: string;
    secondary: string;
    secondary16: string;
  }

  interface PaletteOptions {
    border?: Partial<BorderType>;
  }

  interface Palette {
    border: BorderType;
  }

  interface Mixins {
    sessionTitle: React.CSSProperties;
    sessionDescription: React.CSSProperties;
    headerTitle: React.CSSProperties;
    noteContent: React.CSSProperties;
    pagePadding: React.CSSProperties;
    customRadius: Record<string, string>;
    center: React.CSSProperties;
    fieldTitle: React.CSSProperties;
    value: React.CSSProperties;
    valueDescription: React.CSSProperties;
    customPadding: Record<string, string>;
    customMargin: Record<string, string>;
    gaps: Record<string, string>;
    row: React.CSSProperties;
    column: React.CSSProperties;
    validationError: React.CSSProperties;
    whiteLoadingOverlay: React.CSSProperties;
    paper: React.CSSProperties;
    listTitle: React.CSSProperties;
    listDescription: React.CSSProperties;
    smallButton: React.CSSProperties;
    dialogContent: React.CSSProperties;
    dialogActionsOk: React.CSSProperties;
    dialogActionsCancel: React.CSSProperties;
    warning: React.CSSProperties;
    activityTitle: React.CSSProperties;
    activityDescription: React.CSSProperties;
  }

  interface TypeBackground {
    white: string;
    white80: string;
    white64: string;
    white24: string;
    white16: string;
    black: string;
    black64: string;
    black24: string;
    black16: string;
    secondary: string;
    secondary16: string;
    error: string;
    error16: string;
  }

  interface TypographyVariants {
    fontSize10: string;
    fontSize11: string;
    fontSize12: string;
    fontSize13: string;
    fontSize14: string;
    fontSize15: string;
    fontSize16: string;
    fontSize17: string;
    fontSize18: string;
    fontSize19: string;
    fontSize20: string;
    fontSize21: string;
    fontSize22: string;
    fontSize24: string;
    leading100: string;
    leading120: string;
    leading140: string;
    leading160: string;
    leading180: string;
    leading200: string;
    fontWeight300: number;
    fontWeight400: number;
    fontWeight500: number;
    fontWeight600: number;
    fontWeight700: number;
  }

  interface TypographyVariantsOptions {
    fontSize10?: string;
    fontSize11?: string;
    fontSize12?: string;
    fontSize13?: string;
    fontSize14?: string;
    fontSize15?: string;
    fontSize16?: string;
    fontSize17?: string;
    fontSize18?: string;
    fontSize19?: string;
    fontSize20?: string;
    fontSize21?: string;
    fontSize22?: string;
    fontSize24?: string;
    leading100?: string;
    leading120?: string;
    leading140?: string;
    leading160?: string;
    leading180?: string;
    leading200?: string;
    fontWeight300?: number;
    fontWeight400?: number;
    fontWeight500?: number;
    fontWeight600?: number;
    fontWeight700?: number;
  }
}
