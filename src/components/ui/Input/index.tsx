import { Box, useTheme } from "@mui/material";
import { forwardRef } from "react";
interface InputProps {
  className?: string;
  inputRest?: React.InputHTMLAttributes<HTMLInputElement>;
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
        padding: theme.mixins.customPadding.p3,
        backgroundColor: "background.white16",
      }}
      {...rest}
    >
      {leftPart}
      <input
        {...inputRest}
        style={{
          backgroundColor: "transparent",
          border: "none",
          outline: "none",
          fontSize: theme.typography.fontSize16,
          lineHeight: theme.typography.leading140,
          fontWeight: theme.typography.fontWeight400,
          color: theme.palette.text.white,
          ...inputClassName,
        }}
      />
      {rightPart}
    </Box>
  );
});

Input.displayName = "Input";

export default Input;
