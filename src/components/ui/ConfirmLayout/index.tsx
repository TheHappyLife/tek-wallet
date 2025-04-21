"use client";
import { GeneralProps } from "../../../types/ui";
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
import { forwardRef } from "react";

export interface ConfirmLayoutProps extends GeneralProps, DrawerComponentProps {
  action: ActionConfirm;
}

const ConfirmLayout = forwardRef<DrawerComponentRef, ConfirmLayoutProps>(
  (props, ref) => {
    const theme = useTheme();

    return (
      <DrawerComponent
        ref={ref}
        trigger={props.trigger}
        onOpen={props.onOpen}
        onClose={props.onClose}
      >
        <ModalLayout>
          <Box
            sx={{
              ...theme.mixins.column,
              alignItems: "center",
              gap: theme.mixins.gaps.g16,
            }}
          >
            <Box sx={{ ...theme.mixins.column, gap: theme.mixins.gaps.g12 }}>
              <Icon width={64} sx={{}} src={getIcon("wallet_logo")} />
              <Text
                sx={{ ...theme.mixins.sessionDescription }}
              >{`Confirm action`}</Text>
              <Text sx={{ ...theme.mixins.sessionTitle }}>{props.action}</Text>
            </Box>
            {props.children}
          </Box>
        </ModalLayout>
      </DrawerComponent>
    );
  }
);

ConfirmLayout.displayName = "ConfirmLayout";

export default ConfirmLayout;
