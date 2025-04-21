import { GeneralProps } from "../../../types/ui";
import { ElementType, forwardRef } from "react";
import { Box } from "@mui/material";
interface TextProps
  extends Omit<GeneralProps, "onClick">,
    React.HTMLAttributes<HTMLElement> {
  tag?: ElementType;
  onClick?:
    | GeneralProps["onClick"]
    | React.HTMLAttributes<HTMLElement>["onClick"];
}

const Text = forwardRef<HTMLElement, TextProps>(
  ({ children, sx, tag, ...rest }: TextProps, ref) => {
    return (
      <Box component={tag ?? "span"} ref={ref} sx={sx} {...rest}>
        {children}
      </Box>
    );
  }
);

Text.displayName = "Text";
export default Text;
