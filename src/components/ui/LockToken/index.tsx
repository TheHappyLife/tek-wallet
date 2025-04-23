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
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import useLockTokenData from "../../../hooks/useLockTokenData";
import Text from "../Text";
import { LockCurrency } from "../../../services/axios/get-lock-tokens-list-service/type";
import RequireConnect from "../RequireConnect";
import useWalletData from "../../../hooks/useWalletData";
import lockTokenService from "../../../services/axios/lock-token-service";
interface LockTokenProps extends Omit<ConfirmLayoutProps, "action"> {
  lockData: LockData;
}

export interface LockTokenRef {
  open: () => void;
  close: () => void;
}

export enum LockTokenError {
  TOKEN_NOT_FOUND = "Token not found",
  NOT_ENOUGH_BALANCE = "Not enough balance",
  MAX_AMOUNT = "Max amount",
  MIN_AMOUNT = "Min amount",
  FAILED = "Failed",
}

const LockToken = forwardRef<LockTokenRef, LockTokenProps>((props, ref) => {
  const theme = useTheme();
  const { lockTokens } = useLockTokenData();
  const { isAuthenticated } = useWalletData();
  const confirmByPasscodeDrawerRef = useRef<DrawerComponentRef>(null);
  const [token, setToken] = useState<LockCurrency | undefined>(undefined);
  const [error, setError] = useState<LockTokenError | undefined>(undefined);
  const [errorAmount, setErrorAmount] = useState<string | number | undefined>(
    undefined
  );
  const [buttonStatus, setButtonStatus] = useState<BUTTON_STATUS>(
    BUTTON_STATUS.ENABLED
  );

  const validateAmount = useCallback(
    (lockData: LockData) => {
      const token = lockTokens?.find(
        (token) => token.slug === lockData.tokenSlug
      );
      console.warn(
        "🚀 ~ validateAmount ~ lockData:",
        lockData,
        lockTokens,
        token
      );
      setToken(token);
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
    },
    [lockTokens, props.lockData?.amount, props.lockData?.tokenSlug]
  );

  const handleLockToken = async (passcode: string) => {
    console.warn("🚀 ~ handleLockToken ~ lockData:", props.lockData, passcode);

    setButtonStatus(BUTTON_STATUS.LOADING);
    const response = await lockTokenService({
      passcode,
      locked_balances: [
        {
          locked_currency_slug: token?.slug || "",
          locked_amount: props.lockData.amount.toString() || "",
        },
      ],
    });
    console.warn("🚀 ~ handleLockToken ~ response:", response);
    if (response.success) {
      confirmByPasscodeDrawerRef.current?.close();
    } else {
      setError(LockTokenError.FAILED);
    }
    setButtonStatus(BUTTON_STATUS.ENABLED);
  };

  const handleOpen = () => {
    if (!isAuthenticated) throw new Error("Please connect your wallet");
    confirmByPasscodeDrawerRef.current?.open();
  };

  const handleClose = () => {
    if (!isAuthenticated) throw new Error("Please connect your wallet");
    confirmByPasscodeDrawerRef.current?.close();
  };

  useImperativeHandle(ref, () => ({
    open: handleOpen,
    close: handleClose,
  }));

  useEffect(() => {
    validateAmount(props.lockData);
  }, [validateAmount]);

  return (
    <RequireConnect>
      <ConfirmLayout
        ref={confirmByPasscodeDrawerRef}
        action={ActionConfirm.LOCK}
        trigger={props.children}
      >
        <Box sx={{ ...theme.mixins.column, gap: theme.mixins.gaps.g12 }}>
          <Box
            sx={{
              ...theme.mixins.paper,
            }}
          >
            <LineValue
              field="Amount"
              value={
                <Formatter value={props.lockData.amount} unit={token?.name} />
              }
            />
          </Box>
          {!!error && (
            <Text
              sx={{
                ...theme.mixins.validationError,
                mt: theme.mixins.gaps.g6,
              }}
            >
              {error}{" "}
              {!!errorAmount && (
                <Formatter value={errorAmount} unit={` ${token?.name}`} />
              )}
            </Text>
          )}
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
    </RequireConnect>
  );
});
LockToken.displayName = "LockToken";
export default LockToken;
