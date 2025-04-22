"use client";
import { Box, useTheme } from "@mui/material";
import Button, { BUTTON_STATUS } from "../../ui/Button";
import { DrawerComponentRef } from "../DrawerComponent";
import ConfirmLayout, { ConfirmLayoutProps } from "../ConfirmLayout";
import { ActionConfirm } from "../ConfirmLayout/type";
import { LockData } from "./type";
import LineValue from "../LineValue";
import Formatter from "../Formatter";
import ConfirmByPasscode from "../ConfirmByPasscode";
import { useEffect, useRef, useState } from "react";
import useLockTokenData from "../../../hooks/useLockTokenData";
import Text from "../Text";
interface LockTokenProps extends Omit<ConfirmLayoutProps, "action"> {
  lockData: LockData;
}

export enum LockTokenError {
  TOKEN_NOT_FOUND = "Token not found",
  NOT_ENOUGH_BALANCE = "Not enough balance",
  MAX_AMOUNT = "Max amount",
  MIN_AMOUNT = "Min amount",
}

const LockToken = (props: LockTokenProps) => {
  const theme = useTheme();
  const { lockTokens } = useLockTokenData();
  const confirmByPasscodeDrawerRef = useRef<DrawerComponentRef>(null);
  const [error, setError] = useState<LockTokenError | undefined>(undefined);
  const [errorAmount, setErrorAmount] = useState<string | number | undefined>(
    undefined
  );
  const [buttonStatus, setButtonStatus] = useState<BUTTON_STATUS>(
    BUTTON_STATUS.ENABLED
  );
  const validateAmount = (lockData: LockData) => {
    const token = lockTokens?.find(
      (token) => token.slug === lockData.tokenSlug
    );
    if (!token) {
      setError(LockTokenError.TOKEN_NOT_FOUND);

      return;
    }
    if (lockData.amount > token.max_value) {
      setError(LockTokenError.MAX_AMOUNT);
      setErrorAmount(token.max_value);

      return;
    }
    if (lockData.amount < token.min_value) {
      setError(LockTokenError.MIN_AMOUNT);
      setErrorAmount(token.min_value);

      return;
    }

    if (lockData.amount > +token.balance) {
      setError(LockTokenError.NOT_ENOUGH_BALANCE);
      setErrorAmount(token.balance);

      return;
    }

    setError(undefined);
    setErrorAmount(undefined);
  };

  const handleLockToken = (passcode: string) => {
    console.warn("🚀 ~ handleLockToken ~ lockData:", props.lockData, passcode);
    setButtonStatus(BUTTON_STATUS.LOADING);
    setTimeout(() => {
      setButtonStatus(BUTTON_STATUS.ENABLED);
      confirmByPasscodeDrawerRef.current?.close();
    }, 1000);
  };

  useEffect(() => {
    validateAmount(props.lockData);
  }, [props.lockData?.amount, props.lockData?.tokenSlug]);

  return (
    <>
      <ConfirmLayout
        ref={confirmByPasscodeDrawerRef}
        action={ActionConfirm.LOCK}
        trigger={props.trigger}
      >
        <Box sx={{ ...theme.mixins.column, gap: theme.mixins.gaps.g16 }}>
          <Box
            sx={{
              ...theme.mixins.paper,
            }}
          >
            <Box sx={{ ...theme.mixins.column, gap: theme.mixins.gaps.g6 }}>
              <LineValue
                field="Amount"
                value={
                  <Formatter
                    value={props.lockData.amount}
                    unit={props.lockData.tokenSlug}
                  />
                }
              />
              <Text sx={{ ...theme.mixins.validationError }}>
                {error}{" "}
                {!!errorAmount && (
                  <Formatter
                    value={errorAmount}
                    unit={props.lockData.tokenSlug}
                  />
                )}
              </Text>
            </Box>
          </Box>
          <ConfirmByPasscode
            action={ActionConfirm.LOCK}
            onConfirmSuccess={handleLockToken}
          >
            <Button.Primary
              status={!!error ? BUTTON_STATUS.DISABLED : buttonStatus}
              sx={{ width: "100%" }}
            >
              Confirm
            </Button.Primary>
          </ConfirmByPasscode>
        </Box>
      </ConfirmLayout>
    </>
  );
};
export default LockToken;
