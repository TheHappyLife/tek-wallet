import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    whiteBackground: PaletteColor;
    whiteText: PaletteColor;
    whiteBorder: PaletteColor;
    blackBackground: PaletteColor;
    fontSize: PaletteFontSize;
    fontWeight: PaletteFontWeight;
    lineHeight: PaletteLineHeight;
    padding: PalettePadding;
  }

  interface PaletteOptions {
    whiteBackground?: PaletteColorOptions;
    whiteText?: PaletteColorOptions;
    whiteBorder?: PaletteColorOptions;
    blackBackground?: PaletteColorOptions;
    fontSize?: PaletteFontSizeOptions;
    fontWeight?: PaletteFontWeightOptions;
    lineHeight?: PaletteLineHeightOptions;
    padding?: PalettePaddingOptions;
  }

  interface SpacingOptions {
    pageX?: string;
    pageTop?: string;
    pageBottom?: string;
  }
}
