import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface TypeText {
    white: string;
    white64: string;
    white24: string;
  }

  interface Mixins {
    sessionTitle: React.CSSProperties;
    sessionDescription: React.CSSProperties;
    headerTitle: React.CSSProperties;
    noteContent: React.CSSProperties;
    pagePadding: React.CSSProperties;
    theBorderRadius: Record<string, string>;
    center: React.CSSProperties;
  }

  interface TypeBackground {
    white: string;
    white64: string;
    white24: string;
    white16: string;
    black: string;
    black64: string;
    black24: string;
    black16: string;
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
    fontWeight300?: number;
    fontWeight400?: number;
    fontWeight500?: number;
    fontWeight600?: number;
    fontWeight700?: number;
  }
}
