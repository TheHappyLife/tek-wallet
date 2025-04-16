/* eslint-disable react-hooks/rules-of-hooks */
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
  useTheme,
} from "@mui/material";

export enum BUTTON_STATUS {
  LOADING = "loading",
  DISABLED = "disabled",
  ENABLED = "enabled",
}
export interface ButtonProps extends MuiButtonProps {
  status?: BUTTON_STATUS;
}

const Button: React.FC<ButtonProps> & {
  Primary: React.FC<ButtonProps>;
  Secondary: React.FC<ButtonProps>;
} = (props: ButtonProps) => {
  const { status = BUTTON_STATUS.ENABLED, sx, ...rest } = props;

  return (
    <MuiButton
      disabled={status !== BUTTON_STATUS.ENABLED}
      {...rest}
      sx={{
        textTransform: "capitalize",
        ...sx,
      }}
    >
      {props.children}
    </MuiButton>
  );
};

Button.displayName = "Button";

Button.Primary = (props: ButtonProps) => {
  const { sx, ...rest } = props;
  const theme = useTheme();

  return (
    <Button
      {...rest}
      variant="contained"
      color="primary"
      sx={{
        borderRadius: theme.mixins.theBorderRadius.full,
        ...sx,
      }}
    />
  );
};

Button.Primary.displayName = "Button.Primary";

Button.Secondary = (props: ButtonProps) => {
  const { sx, ...rest } = props;
  const theme = useTheme();

  return (
    <Button
      {...rest}
      variant="outlined"
      color="secondary"
      sx={{
        borderRadius: theme.mixins.theBorderRadius.full,
        ...sx,
      }}
    />
  );
};

Button.Secondary.displayName = "Button.Secondary";

export default Button;
