import { GeneralProps, UnknownFunction } from "../../../types/ui";
import { Box, Drawer, SwipeableDrawer, SwipeableDrawerProps } from "@mui/material";
import { forwardRef, ReactEventHandler, useImperativeHandle, useMemo, useState } from "react";

export enum DRAWER_DIRECTION {
  LEFT = "left",
  RIGHT = "right",
  TOP = "top",
  BOTTOM = "bottom",
}

export interface DrawerComponentProps
  extends Omit<GeneralProps, "onClick" | "sx">,
    Omit<SwipeableDrawerProps, "onClose" | "onToggle" | "onOpen"> {
  onOpen?: UnknownFunction;
  onClose?: UnknownFunction;
  trigger?: React.ReactNode;
  onToggle?: (status?: boolean) => unknown;
  direction?: DRAWER_DIRECTION;
  disableSwipe?: boolean;
}

export interface DrawerComponentRef {
  open: () => void;
  close: () => void;
  lockStatus: () => void;
  unlockStatus: () => void;
}

const DrawerComponent = forwardRef<DrawerComponentRef, DrawerComponentProps>((props, ref) => {
  const { onOpen, onClose, onToggle, sx, trigger, direction, children, disableSwipe, ...rest } = props;
  const [isShowDrawerComponent, setIsShowDrawerComponent] = useState(false);
  const [isOpen, setIsOpen] = useState<boolean | undefined>(undefined);
  const DrawerComponent = useMemo(
    () => (isOpen !== undefined || disableSwipe ? Drawer : SwipeableDrawer),
    [isOpen, disableSwipe]
  );
  const lockStatus = () => {
    setIsOpen(isShowDrawerComponent);
  };
  const unlockStatus = () => {
    setIsOpen(undefined);
  };
  const handleOpen = () => {
    unlockStatus();
    setIsShowDrawerComponent(true);
    onOpen?.();
  };

  const handleClose = () => {
    unlockStatus();
    setIsShowDrawerComponent(false);
    onClose?.();
  };

  const toggle: React.MouseEventHandler<HTMLElement> = (e) => {
    const children = Array.from(e.currentTarget.children);
    const button = children.find((child) => child.tagName === "BUTTON") as HTMLButtonElement | undefined;

    if (button?.disabled) {
      e.stopPropagation();

      return;
    }

    unlockStatus();
    const newState = !isShowDrawerComponent;
    setIsShowDrawerComponent(newState);
    onToggle?.(newState);
  };

  useImperativeHandle(ref, () => ({
    open: handleOpen,
    close: handleClose,
    lockStatus,
    unlockStatus,
  }));

  const onDrawerClose: ReactEventHandler = (e) => {
    setIsShowDrawerComponent(false);
    onClose?.(e);
  };

  const onDrawerOpen: ReactEventHandler = (e) => {
    setIsShowDrawerComponent(true);
    onOpen?.(e);
  };

  return (
    <>
      <Box
        sx={{
          ...sx,
        }}
        onClick={toggle}
      >
        {trigger}
      </Box>
      <DrawerComponent
        {...rest}
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor: "transparent",
            overflow: "hidden",
            boxShadow: "none",
          },
        }}
        anchor={direction || DRAWER_DIRECTION.BOTTOM}
        open={isOpen ?? isShowDrawerComponent}
        onOpen={onDrawerOpen}
        onClose={onDrawerClose}
      >
        {children}
      </DrawerComponent>
    </>
  );
});

DrawerComponent.displayName = "DrawerComponent";

export default DrawerComponent;
