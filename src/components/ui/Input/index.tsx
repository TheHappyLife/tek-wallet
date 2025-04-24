import { Box, TextField, useTheme, TextFieldProps } from "@mui/material";
import { forwardRef } from "react";
interface InputProps {
  className?: string;
  inputRest?: TextFieldProps;
  inputStyles?: React.CSSProperties;
  leftPart?: React.ReactNode;
  rightPart?: React.ReactNode;
}

export type InputRef = HTMLInputElement;

const Input = forwardRef<InputRef, InputProps>((props, inputRef) => {
  const {
    inputRest,
    inputStyles: inputClassName,
    leftPart,
    rightPart,
    ...rest
  } = props;
  const theme = useTheme();

  return (
    <Box
      ref={inputRef}
      sx={{
        ...theme.mixins.row,
        gap: theme.mixins.gaps.g12,
        borderRadius: theme.mixins.theBorderRadius.r12,
        px: theme.mixins.customPadding.p16,
        backgroundColor: "background.white16",
        border: `1px solid ${theme.palette.border.white24}`,
        backdropFilter: "blur(10px)",
      }}
      {...rest}
    >
      {leftPart}
      <TextField
        {...inputRest}
        variant="outlined"
        sx={{
          backgroundColor: "transparent",
          border: "none",
          outline: "none",
          fontSize: theme.typography.fontSize16,
          lineHeight: theme.typography.leading140,
          fontWeight: theme.typography.fontWeight400,
          color: theme.palette.text.white,
          py: theme.mixins.customPadding.p12,
          flex: 1,
          "& ::placeholder": {
            color: theme.palette.text.white64,
            fontSize: theme.typography.fontSize14,
          },
          ...inputClassName,
        }}
      />
      <input style={{}} />
      {rightPart}
    </Box>
  );
});

Input.displayName = "Input";

export default Input;
