import { Dialog, DialogProps } from "@mui/material";

import { forwardRef, useImperativeHandle, useState } from "react";
import { GeneralProps } from "../../../types/ui";

interface AppDialogProps
  extends Omit<DialogProps, "open">,
    Omit<GeneralProps, "sx" | "onClick"> {
  overrideOpen?: boolean;
}

export interface AppDialogRef {
  open: () => void;
  close: () => void;
}

const AppDialog = forwardRef<AppDialogRef, AppDialogProps>((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const { sx, children, overrideOpen, ...rest } = props;

  useImperativeHandle(ref, () => ({
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
  }));

  return (
    <Dialog
      open={overrideOpen ?? isOpen}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Dialog>
  );
});

AppDialog.displayName = "AppDialog";

export default AppDialog;
