import { BackdropProps, CircularProgress, useTheme } from "@mui/material";

import { Backdrop } from "@mui/material";
import { forwardRef, useImperativeHandle, useState } from "react";

interface AppBackDropProps extends Omit<BackdropProps, "open"> {}

export interface AppBackDropRef {
  open: () => void;
  close: () => void;
}

const AppBackDrop = forwardRef<AppBackDropRef, AppBackDropProps>(
  (props, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const theme = useTheme();
    const { sx, ...rest } = props;

    useImperativeHandle(ref, () => ({
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
    }));

    return (
      <Backdrop
        sx={{
          color: "text.white",
          zIndex: theme.zIndex.drawer + 1,
          "& .MuiBackdrop-root": {
            backdropFilter: "blur(12px)",
          },
          ...sx,
        }}
        {...rest}
        open={isOpen}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }
);

AppBackDrop.displayName = "AppBackDrop";

export default AppBackDrop;
