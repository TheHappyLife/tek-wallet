import cn from "../../../utils/cn";
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from "@mui/material";

export enum BUTTON_STATUS {
  LOADING = "loading",
  DISABLED = "disabled",
  ENABLED = "enabled",
}
export interface ButtonProps extends MuiButtonProps {
  className?: string;
  status?: BUTTON_STATUS;
}

const Button: React.FC<ButtonProps> & {
  Primary: React.FC<ButtonProps>;
  Secondary: React.FC<ButtonProps>;
} = (props: ButtonProps) => {
  const { status = BUTTON_STATUS.ENABLED, className, ...rest } = props;

  return (
    <MuiButton
      className={cn("", className)}
      disabled={status !== BUTTON_STATUS.ENABLED}
      {...rest}
    >
      {props.children}
    </MuiButton>
  );
};

Button.displayName = "Button";

Button.Primary = (props: ButtonProps) => {
  const { sx, ...rest } = props;

  return (
    <Button
      {...rest}
      variant="contained"
      color="primary"
      sx={{
        borderRadius: "999px",
        color: "#000000",
        ...sx,
      }}
    />
  );
};

Button.Primary.displayName = "Button.Primary";

Button.Secondary = (props: ButtonProps) => {
  const { className, sx, ...rest } = props;

  return (
    <Button
      {...rest}
      variant="contained"
      color="secondary"
      className={cn(
        "text-16 leading-120 !capitalize font-500 px-4 py-2.5",
        className
      )}
      sx={{
        borderRadius: "999px",
        ...sx,
      }}
    />
  );
};

Button.Secondary.displayName = "Button.Secondary";

export default Button;
