"use client";
import Text from "../Text";
import { Box, useTheme } from "@mui/material";
import Icon from "../Icon";
import getIcon from "../../../utils/getIcon";
import ModalLayout from "../ModalLayout";
import DrawerComponent, {
  DrawerComponentProps,
  DrawerComponentRef,
} from "../DrawerComponent";
import { ActionConfirm } from "./type";
import { forwardRef, useImperativeHandle, useRef } from "react";

export interface ConfirmLayoutProps extends DrawerComponentProps {
  action: ActionConfirm;
}

const ConfirmLayout = forwardRef<DrawerComponentRef, ConfirmLayoutProps>(
  (props, ref) => {
    const { children, ...rest } = props;
    const theme = useTheme();

    const confirmByPasscodeDrawerRef = useRef<DrawerComponentRef>(null);

    const handleOnClose = () => {
      confirmByPasscodeDrawerRef.current?.close();
    };

    useImperativeHandle(ref, () => ({
      open: () => {
        confirmByPasscodeDrawerRef.current?.open();
      },
      close: () => {
        confirmByPasscodeDrawerRef.current?.close();
      },
      lockStatus: () => {
        confirmByPasscodeDrawerRef.current?.lockStatus();
      },
      unlockStatus: () => {
        confirmByPasscodeDrawerRef.current?.unlockStatus();
      },
    }));

    return (
      <DrawerComponent ref={confirmByPasscodeDrawerRef} {...rest}>
        <ModalLayout onClose={handleOnClose}>
          <Box
            sx={{
              ...theme.mixins.column,
              alignItems: "center",
              gap: theme.mixins.gaps.g16,
            }}
          >
            <Box
              sx={{
                ...theme.mixins.column,
                alignItems: "center",
                gap: theme.mixins.gaps.g12,
              }}
            >
              <Icon width={64} sx={{}} src={getIcon("wallet_logo")} />
              <Text
                sx={{ ...theme.mixins.sessionDescription }}
              >{`Confirm action`}</Text>
              <Text
                sx={{
                  ...theme.mixins.sessionTitle,
                  textTransform: "capitalize",
                }}
              >
                {props.action}
              </Text>
            </Box>
            {children}
          </Box>
        </ModalLayout>
      </DrawerComponent>
    );
  }
);

ConfirmLayout.displayName = "ConfirmLayout";

export default ConfirmLayout;
