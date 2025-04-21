"use client";
import { GeneralProps } from "../../../types/ui";
import OTP, { OtpInputType } from "../../../components/ui/OTP";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import Text from "../../../components/ui/Text";
import { ActionConfirm } from "../ConfirmLayout/type";
import ModalLayout from "../ModalLayout";
import { Box, useTheme } from "@mui/material";
import LoadingLayout, { LoadingLayoutRef } from "../LoadingLayout";

interface ConfirmByPasscodeProps extends GeneralProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onConfirmSuccess?: (value: string) => any;
  action: ActionConfirm;
  onClose?: () => void;
}

const passcodeLength = 6;

export interface ConfirmByPasscodeRef {
  clearData: () => void;
}

const ConfirmByPasscode = forwardRef<
  ConfirmByPasscodeRef,
  ConfirmByPasscodeProps
>((props: ConfirmByPasscodeProps, ref) => {
  const { action, onConfirmSuccess } = props;
  const theme = useTheme();
  const [otp, setOtp] = useState("");
  const loadingRef = useRef<LoadingLayoutRef>(null);

  useImperativeHandle(ref, () => ({
    clearData: () => {
      setOtp("");
    },
  }));

  const handleOtpChange = async (value: string) => {
    /**
     * validate otp here
     */
    try {
      setOtp(value);
      if (value.length === passcodeLength) {
        loadingRef.current?.startLoading();
        await new Promise((resolve) => setTimeout(resolve, 1000));
        onConfirmSuccess?.(value);
        loadingRef.current?.endLoading();
        ref;
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ModalLayout title={"Authentication"} onClose={props.onClose}>
      <Box
        sx={{
          ...theme.mixins.column,
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem",
          width: "100%",
        }}
      >
        <Text
          sx={{
            ...theme.mixins.sessionTitle,
          }}
        >
          Enter your passcode to confirm{" "}
          <Text sx={{ fontWeight: theme.typography.fontWeight600 }}>
            {action}
          </Text>
        </Text>

        <LoadingLayout initLoading={false} ref={loadingRef}>
          <OTP
            value={otp}
            onChange={handleOtpChange}
            numInputs={passcodeLength}
            otpInputType={OtpInputType.PASSWORD}
          />
        </LoadingLayout>
      </Box>
    </ModalLayout>
  );
});

ConfirmByPasscode.displayName = "ConfirmByPasscode";
export default ConfirmByPasscode;
