import { GeneralProps } from "../../../types/ui";
import { Box, SwipeableDrawer } from "@mui/material";
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

interface DrawerComponentProps extends GeneralProps {
  onOpen?: ReactEventHandler;
  onClose?: ReactEventHandler;
  trigger?: React.ReactNode;
  onToggle?: (status?: boolean) => unknown;
  direction?: DRAWER_DIRECTION;
}

export interface DrawerComponentRef {
  open: () => void;
  close: () => void;
}

const DrawerComponent = forwardRef<DrawerComponentRef, DrawerComponentProps>(
  (props, ref) => {
    const [isShowDrawerComponent, setIsShowDrawerComponent] = useState(false);

    const handleOpen = () => {
      setIsShowDrawerComponent(true);
    };

    const handleClose = () => {
      setIsShowDrawerComponent(false);
    };

    const toggle = () => {
      setIsShowDrawerComponent(!isShowDrawerComponent);
      props.onToggle?.(!isShowDrawerComponent);
    };

    useImperativeHandle(ref, () => ({
      open: handleOpen,
      close: handleClose,
    }));

    const onClose: ReactEventHandler = (e) => {
      setIsShowDrawerComponent(false);
      props.onClose?.(e);
    };

    const onOpen: ReactEventHandler = (e) => {
      setIsShowDrawerComponent(true);
      props.onOpen?.(e);
    };

    return (
      <>
        <Box sx={props.sx} onClick={toggle}>
          {props.trigger}
        </Box>
        <SwipeableDrawer
          sx={{
            "& .MuiDrawer-paper": {
              backgroundColor: "transparent",
              overflow: "hidden",
              boxShadow: "none",
            },
          }}
          onOpen={onOpen}
          anchor={props.direction || "bottom"}
          open={isShowDrawerComponent}
          onClose={onClose}
        >
          {props.children}
        </SwipeableDrawer>
      </>
    );
  }
);

DrawerComponent.displayName = "DrawerComponent";

export default DrawerComponent;
