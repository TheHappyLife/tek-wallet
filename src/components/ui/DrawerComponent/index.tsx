import { GeneralProps, UnknownFunction } from "../../../types/ui";
import {
  Box,
  Drawer,
  SwipeableDrawer,
  SwipeableDrawerProps,
} from "@mui/material";
import {
  forwardRef,
  ReactEventHandler,
  useImperativeHandle,
  useMemo,
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
    const DrawerComponent = useMemo(
      () => (isOpen !== undefined ? Drawer : SwipeableDrawer),
      [isOpen]
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
      const button = children.find((child) => child.tagName === "BUTTON") as
        | HTMLButtonElement
        | undefined;

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
          anchor={direction || "bottom"}
          open={isOpen ?? isShowDrawerComponent}
          onOpen={onDrawerOpen}
          onClose={onDrawerClose}
        >
          {children}
        </DrawerComponent>
      </>
    );
  }
);

DrawerComponent.displayName = "DrawerComponent";

export default DrawerComponent;

//  export interface Version {
//   name: string;
//   index: number;
//   expired: string;
//   nextVersion: Omit<Version, "nextVersion" | "expired">;
// }

// # Khi vào app sẽ làm 2 việc:
// 1. Load thông tin version app từ server, đặt là version.
// 2. Load thông tin version từ cookie, đặt là versionInCookie.

// # Các trường hợp xảy ra:
//   1. version.index > versionInCookie.index:
//     - Hiển thị popup thông báo cập nhật app (không cho tắt, nếu user không cập nhật sẽ không vào được app)
//     - Tải xuống version mới.
//     - Cập nhật versionInCookie = version.
//   2. version.index = versionInCookie.index:
//     2.1 Nếu nextVersion không tồn tại thì không làm gì hết.
//     2.2 Nếu nextVersion tồn tại thì:
//       - Hiển thị popup thông báo cập nhật app (cho tắt, hiển thị luôn thời gian hết hạn của version hiện tại)
//       2.2.1 Nếu user chọn cập nhật:
//         - Tải xuống version mới.
//         - Cập nhật versionInCookie = version.
//       2.2.2 Nếu user không chọn cập nhật:
//         - Không làm gì hết.
