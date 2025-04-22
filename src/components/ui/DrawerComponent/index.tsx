import { GeneralProps, UnknownFunction } from "../../../types/ui";
import { Box, SwipeableDrawer, SwipeableDrawerProps } from "@mui/material";
import {
  forwardRef,
  ReactEventHandler,
  useImperativeHandle,
  useState,
} from "react";

export enum DRAWER_DIRECTION {
  LEFT = "left",
  RIGHT = "right",
}

export interface DrawerComponentProps
  extends Omit<GeneralProps, "onClick" | "sx">,
    Omit<SwipeableDrawerProps, "onClose" | "onToggle" | "onOpen"> {
  onOpen?: UnknownFunction;
  onClose?: UnknownFunction;
  trigger?: React.ReactNode;
  onToggle?: (status?: boolean) => unknown;
  direction?: DRAWER_DIRECTION;
}

export interface DrawerComponentRef {
  open: () => void;
  close: () => void;
  lockStatus: () => void;
  unlockStatus: () => void;
}

const DrawerComponent = forwardRef<DrawerComponentRef, DrawerComponentProps>(
  (props, ref) => {
    const {
      onOpen,
      onClose,
      onToggle,
      sx,
      trigger,
      direction,
      children,
      ...rest
    } = props;
    const [isShowDrawerComponent, setIsShowDrawerComponent] = useState(false);
    const [isOpen, setIsOpen] = useState<boolean | undefined>(undefined);
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

    const toggle = () => {
      unlockStatus();
      setIsShowDrawerComponent(!isShowDrawerComponent);
      onToggle?.(!isShowDrawerComponent);
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
        <Box sx={sx} onClick={toggle}>
          {trigger}
        </Box>
        <SwipeableDrawer
          {...rest}
          sx={{
            "& .MuiDrawer-paper": {
              backgroundColor: "transparent",
              overflow: "hidden",
              boxShadow: "none",
            },
          }}
          anchor={direction || "bottom"}
          open={isOpen ?? isShowDrawerComponent}
          onOpen={onDrawerOpen}
          onClose={onDrawerClose}
          disableSwipeToOpen={isOpen !== undefined}
          disableDiscovery={isOpen !== undefined}
        >
          {children}
        </SwipeableDrawer>
      </>
    );
  }
);

DrawerComponent.displayName = "DrawerComponent";

export default DrawerComponent;
