import { GeneralProps, UnknownFunction } from "../../../types/ui";
import { Box, SwipeableDrawer, SwipeableDrawerProps } from "@mui/material";
import {
  forwardRef,
  ReactEventHandler,
  useImperativeHandle,
  useRef,
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
    const isOpen = useRef<boolean | undefined>(undefined);

    const handleOpen = () => {
      setIsShowDrawerComponent(true);
    };

    const handleClose = () => {
      setIsShowDrawerComponent(false);
    };

    const toggle = () => {
      setIsShowDrawerComponent(!isShowDrawerComponent);
      onToggle?.(!isShowDrawerComponent);
    };

    useImperativeHandle(ref, () => ({
      open: handleOpen,
      close: handleClose,
      lockStatus: () => {
        isOpen.current = isShowDrawerComponent;
      },
      unlockStatus: () => {
        isOpen.current = undefined;
      },
    }));

    const onDrawerClose: ReactEventHandler = (e) => {
      console.warn("🚀 ~ onDrawerClose ~ e:", e);
      setIsShowDrawerComponent(false);
      onClose?.(e);
    };

    const onDrawerOpen: ReactEventHandler = (e) => {
      console.warn("🚀 ~ onDrawerOpen ~ e:", e);
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
          open={isOpen.current ?? isShowDrawerComponent}
          onOpen={onDrawerOpen}
          onClose={onDrawerClose}
        >
          {children}
        </SwipeableDrawer>
      </>
    );
  }
);

DrawerComponent.displayName = "DrawerComponent";

export default DrawerComponent;
