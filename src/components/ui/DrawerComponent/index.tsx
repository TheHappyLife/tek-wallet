import { styled } from "@mui/system";
import { GeneralProps } from "../../../types/ui";
import { Box, SwipeableDrawer } from "@mui/material";
import { forwardRef, useImperativeHandle, useState } from "react";

export enum DRAWER_DIRECTION {
  LEFT = "left",
  RIGHT = "right",
}

interface DrawerComponentProps extends GeneralProps {
  className?: string;
  onOpen?: () => void;
  onClose?: () => void;
  trigger?: React.ReactNode;
  onToggle?: (status?: boolean) => unknown;
  direction?: DRAWER_DIRECTION;
}

export interface DrawerComponentRef {
  open: () => void;
  close: () => void;
}

const CustomDrawer = styled(SwipeableDrawer)({
  "& .MuiDrawer-paper": {
    backgroundColor: "transparent",
    overflow: "hidden",
    boxShadow: "none",
  },
});
const DrawerComponent = forwardRef<DrawerComponentRef, DrawerComponentProps>(
  (props, ref) => {
    const [isShowDrawerComponent, setIsShowDrawerComponent] = useState(false);

    const handleOpen = () => {
      setIsShowDrawerComponent(true);
      props.onOpen?.();
    };

    const handleClose = () => {
      setIsShowDrawerComponent(false);
      props.onClose?.();
    };

    const toggle = () => {
      setIsShowDrawerComponent(!isShowDrawerComponent);
      props.onToggle?.(!isShowDrawerComponent);
    };

    useImperativeHandle(ref, () => ({
      open: handleOpen,
      close: handleClose,
    }));

    return (
      <>
        <Box sx={props.sx} onClick={toggle}>
          {props.trigger}
        </Box>
        <CustomDrawer
          onOpen={() => {}}
          anchor={props.direction || "bottom"}
          open={isShowDrawerComponent}
          onClose={handleClose}
        >
          {props.children}
        </CustomDrawer>
      </>
    );
  }
);

DrawerComponent.displayName = "DrawerComponent";

export default DrawerComponent;
