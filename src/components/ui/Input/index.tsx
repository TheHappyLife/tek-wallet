import {
  Box,
  TextField,
  useTheme,
  TextFieldProps,
  BoxProps,
  SxProps,
} from "@mui/material";
import { forwardRef } from "react";
interface InputProps extends BoxProps {
  inputRest?: TextFieldProps;
  leftPart?: React.ReactNode;
  rightPart?: React.ReactNode;
  inputSx?: SxProps;
}

export type InputRef = HTMLInputElement;

const Input = forwardRef<InputRef, InputProps>((props, inputRef) => {
  const { inputRest, leftPart, rightPart, sx, inputSx, ...rest } = props;
  const theme = useTheme();

  return (
    <Box
      ref={inputRef}
      sx={{
        ...theme.mixins.row,
        gap: theme.mixins.gaps.g12,
        borderRadius: theme.mixins.theBorderRadius.r12,
        padding: 0,
        backgroundColor: "background.white16",
        border: `1px solid ${theme.palette.border.white24}`,
        backdropFilter: "blur(10px)",
        ...sx,
      }}
      {...rest}
    >
      {leftPart}
      <TextField
        {...inputRest}
        // variant="outlined"
        sx={{
          // backgroundColor: "transparent",
          // border: "none",
          // outline: "none",
          // flex: 1,
          // height: "fit-content",
          // minHeight: "unset",
          // "& .MuiInputBase-input": {
          //   border: "none",
          //   outline: "none",
          //   color: theme.palette.text.white,
          //   fontSize: theme.typography.fontSize16,
          //   lineHeight: theme.typography.leading140,
          //   fontWeight: theme.typography.fontWeight400,
          //   padding: `${theme.mixins.customPadding.p8} ${theme.mixins.customPadding.p12}`,
          //   height: "fit-content",
          //   minHeight: "unset",
          // },
          // "& .Mui-focused": {
          //   border: "none !important",
          //   outline: "none !important",
          // },
          // "& .MuiInputBase-input::placeholder": {
          //   color: theme.palette.text.white64,
          //   fontSize: theme.typography.fontSize14,
          // },
          // ...inputSx,
          backgroundColor: "transparent",
          flex: 1,
          height: "fit-content",
          minHeight: "unset",
          "& .MuiOutlinedInput-root": {
            // Chỉnh sửa root của input (outlined)
            border: "none", // Xóa border
            outline: "none", // Xóa outline
            "&:hover": {
              // Xóa border khi hover
              border: "none !important",
            },
            "&.Mui-focused": {
              // Xóa border và outline khi focused
              border: "none !important",
              outline: "none !important",
            },
          },
          "& .MuiInputBase-input": {
            border: "none", // Xóa border của input
            outline: "none", // Xóa outline của input
            color: theme.palette.text.white,
            fontSize: theme.typography.fontSize16,
            lineHeight: theme.typography.leading140,
            fontWeight: theme.typography.fontWeight400,
            padding: `${theme.mixins.customPadding.p8} ${theme.mixins.customPadding.p12}`,
            height: "fit-content",
            minHeight: "unset",
          },
          "& .MuiInputBase-input::placeholder": {
            color: theme.palette.text.white64,
            fontSize: theme.typography.fontSize14,
          },
          ...inputSx,
        }}
      />
      {rightPart}
    </Box>
  );
});

Input.displayName = "Input";

export default Input;
