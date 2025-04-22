"use client";
import { GeneralProps } from "../../../types/ui";
import { Box, useTheme } from "@mui/material";
import Button from "../../ui/Button";
import { DrawerComponentRef } from "../DrawerComponent";
import ConfirmLayout, { ConfirmLayoutProps } from "../ConfirmLayout";
import { ActionConfirm } from "../ConfirmLayout/type";
import { LockData } from "./type";
import LineValue from "../LineValue";
import Formatter from "../Formatter";
import ConfirmByPasscode from "../ConfirmByPasscode";
import { useRef } from "react";
interface LockTokenProps
  extends GeneralProps,
    Omit<ConfirmLayoutProps, "action"> {
  lockData: LockData;
}

const LockToken = (props: LockTokenProps) => {
  const theme = useTheme();
  const confirmByPasscodeDrawerRef = useRef<DrawerComponentRef>(null);

  const handleLockToken = (passcode: string) => {
    confirmByPasscodeDrawerRef.current?.close();
    console.warn("🚀 ~ handleLockToken ~ lockData:", props.lockData, passcode);
  };

  return (
    <>
      <ConfirmLayout action={ActionConfirm.LOCK} trigger={props.trigger}>
        <Box sx={{ ...theme.mixins.column, gap: theme.mixins.gaps.g16 }}>
          <LineValue
            field="Amount"
            value={
              <Formatter
                value={props.lockData.amount}
                unit={props.lockData.tokenSlug}
              />
            }
          />
          <ConfirmByPasscode
            action={ActionConfirm.LOCK}
            onConfirmSuccess={handleLockToken}
          >
            <Button.Primary sx={{ width: "100%" }}>Confirm</Button.Primary>
          </ConfirmByPasscode>
        </Box>
      </ConfirmLayout>
    </>
  );
};
export default LockToken;
