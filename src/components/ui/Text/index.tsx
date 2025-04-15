import { GeneralProps } from "../../../types/ui";
import { ElementType, forwardRef } from "react";
import { styled } from "@mui/system";
interface TextProps
  extends Omit<GeneralProps, "onClick">,
    React.HTMLAttributes<HTMLElement> {
  tag?: ElementType;
  onClick?:
    | GeneralProps["onClick"]
    | React.HTMLAttributes<HTMLElement>["onClick"];
}

const StyledText = styled("span")(() => ({}));

const Text = forwardRef<HTMLElement, TextProps>(
  ({ children, sx, ...rest }: TextProps, ref) => {
    return (
      <StyledText ref={ref} sx={sx} {...rest}>
        {children}
      </StyledText>
    );
  }
);

Text.displayName = "Text";
export default Text;
