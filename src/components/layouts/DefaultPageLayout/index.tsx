"use client";
import { GeneralProps } from "../../../types/ui";
import { Box, useTheme } from "@mui/material";

interface DefaultPageLayoutProps extends GeneralProps {}

const DefaultPageLayout = (props: DefaultPageLayoutProps) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        ...theme.mixins.pagePadding,
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
