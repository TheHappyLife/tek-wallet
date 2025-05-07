import { forwardRef } from "react";
import { Box, BoxProps } from "@mui/material";
interface TextProps extends BoxProps {}

const Text = forwardRef<HTMLElement, TextProps>(({ children, sx, component, ...rest }: TextProps, ref) => {
  return (
    <Box component={component ?? "span"} ref={ref} sx={sx} {...rest}>
      {children}
    </Box>
  );
});

Text.displayName = "Text";
export default Text;
