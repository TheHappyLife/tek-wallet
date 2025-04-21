"use client";
import { GeneralProps } from "../../../types/ui";
import { Box, useTheme } from "@mui/material";
import Button from "../../ui/Button";
import DrawerComponent from "../DrawerComponent";
import ConfirmLayout, { ConfirmLayoutProps } from "../ConfirmLayout";
import { ActionConfirm } from "../ConfirmLayout/type";
import { LockData } from "./type";
import LineValue from "../LineValue";
import Formatter from "../Formatter";
import ConfirmByPasscode from "../ConfirmByPasscode";
interface LockTokenProps extends GeneralProps, ConfirmLayoutProps {
  lockData: LockData;
}

const LockToken = (props: LockTokenProps) => {
  const theme = useTheme();

  const handleLockToken = () => {
    console.warn("🚀 ~ handleLockToken ~ lockData:", props.lockData);
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
          <DrawerComponent trigger={<Button.Primary>Confirm</Button.Primary>}>
            <ConfirmByPasscode
              action={ActionConfirm.LOCK}
              onConfirmSuccess={handleLockToken}
            />
          </DrawerComponent>
        </Box>
      </ConfirmLayout>
    </>
  );
};
export default LockToken;
