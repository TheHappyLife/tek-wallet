/* eslint-disable react-hooks/rules-of-hooks */
import {
  CircularProgress,
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
  SxProps,
  useTheme,
} from "@mui/material";

export enum BUTTON_STATUS {
  LOADING = "loading",
  ERROR = "error",
  DISABLED = "disabled",
  ENABLED = "enabled",
}
export interface ButtonProps extends MuiButtonProps {
  status?: BUTTON_STATUS;
}

const Button: React.FC<ButtonProps> & {
  Primary: React.FC<ButtonProps>;
  Secondary: React.FC<ButtonProps>;
  Text: React.FC<ButtonProps>;
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
  const { sx, children, status = BUTTON_STATUS.ENABLED, ...rest } = props;
  const theme = useTheme();

  const disabledStyles: Record<string, SxProps> = {
    [BUTTON_STATUS.LOADING]: {
      backgroundColor: theme.palette.background.secondary16,
      color: theme.palette.background.secondary,
    },
    [BUTTON_STATUS.ERROR]: {
      backgroundColor: theme.palette.background.error16,
      color: theme.palette.background.error,
    },
    [BUTTON_STATUS.DISABLED]: {
      backgroundColor: theme.palette.background.white16,
      color: theme.palette.text.white24,
    },
  };

  return (
    <Button
      {...rest}
      variant="contained"
      color="primary"
      status={status}
      sx={{
        borderRadius: theme.mixins.theBorderRadius.full,
        "&.Mui-disabled": {
          ...(disabledStyles[status] as any),
        },
        ...sx,
      }}
    >
      {status === BUTTON_STATUS.LOADING && <CircularProgress size={20} />}
      {status === BUTTON_STATUS.ERROR && <>{"Error"}</>}
      {status === BUTTON_STATUS.ENABLED && <>{children}</>}
    </Button>
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
        borderColor: "currentColor",
        ...sx,
      }}
    />
  );
};

Button.Secondary.displayName = "Button.Secondary";

Button.Text = (props: ButtonProps) => {
  const { sx, ...rest } = props;
  const theme = useTheme();

  return (
    <Button
      {...rest}
      variant="text"
      color="secondary"
      sx={{
        width: "fit-content",
        height: "fit-content",
        px: theme.mixins.customPadding.p16,
        py: theme.mixins.customPadding.p8,
        ...sx,
      }}
    />
  );
};

Button.Text.displayName = "Button.Text";

export default Button;
