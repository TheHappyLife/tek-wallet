"use client";
import theme from "../../../theme/mui/theme";
import { GeneralProps } from "../../../types/ui";
import { Box } from "@mui/material";

interface DefaultPageLayoutProps extends GeneralProps {}

const DefaultPageLayout = (props: DefaultPageLayoutProps) => {
  return (
    <Box
      sx={{
        padding: theme.palette.padding.pageX,
        paddingTop: theme.palette.padding.pageTop,
        paddingBottom: theme.palette.padding.pageBottom,
        minHeight: "100%",
        width: "100%",
        ...props.sx,
      }}
    >
      {props.children}
    </Box>
  );
};

export default DefaultPageLayout;
