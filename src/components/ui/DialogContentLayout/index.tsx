import { Box, BoxProps, Divider, useTheme } from "@mui/material";
import { ReactNode } from "react";

interface DialogContentLayoutProps
  extends Omit<BoxProps, "content" | "actions"> {
  content?: ReactNode;
  actions?: ReactNode;
}

function DialogContentLayout(props: DialogContentLayoutProps) {
  const { content, actions, sx, ...rest } = props;
  const theme = useTheme();

  return (
    <Box
      sx={{
        ...theme.mixins.column,
        gap: theme.mixins.gaps.g12,
        padding: theme.mixins.customPadding.p12,
        borderRadius: theme.mixins.theBorderRadius.r12,
        backgroundColor: theme.palette.background.black,
        boxShadow: theme.shadows[1],
        ...theme.mixins.dialogContent,
        ...sx,
      }}
      {...rest}
    >
      {content}
      {!!actions && <Divider />}
      {actions}
    </Box>
  );
}

export default DialogContentLayout;
