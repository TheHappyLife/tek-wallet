"use client";
import { GeneralProps } from "../../../types/ui";
import OTP, { OtpInputType } from "../../../components/ui/OTP";
import { forwardRef, useRef, useState } from "react";
import Text from "../../../components/ui/Text";
import { ActionConfirm } from "../ConfirmLayout/type";
import DrawerComponent, {
  DrawerComponentProps,
  DrawerComponentRef,
} from "../DrawerComponent";
import ModalLayout from "../ModalLayout";
import { Box, useTheme } from "@mui/material";
import LoadingLayout, { LoadingLayoutRef } from "../LoadingLayout";

interface ConfirmByPasscodeProps extends GeneralProps, DrawerComponentProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onConfirmSuccess?: (value: string) => any;
  action: ActionConfirm;
}

const passcodeLength = 6;

const ConfirmByPasscode = forwardRef<
  DrawerComponentRef,
  ConfirmByPasscodeProps
>((props: ConfirmByPasscodeProps, ref) => {
  const { action, onConfirmSuccess, onClose, ...rest } = props;
  const theme = useTheme();
  const [otp, setOtp] = useState("");
  const loadingRef = useRef<LoadingLayoutRef>(null);

  const resetValue = () => {
    setOtp("");
  };
  const handleClose = () => {
    onClose?.();
    resetValue();
  };

  const handleOtpChange = async (value: string) => {
    setOtp(value);
    /**
     * validate otp here
     */
    if (value.length === passcodeLength) {
      loadingRef.current?.startLoading();
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onConfirmSuccess?.(value);
      loadingRef.current?.endLoading();
      if (ref && typeof ref !== "function" && ref.current) {
        ref.current.close();
      }
    }
  };

  return (
    <DrawerComponent ref={ref} {...rest} onClose={handleClose}>
      <ModalLayout title={`Confirm`}>
        <LoadingLayout initLoading={false} ref={loadingRef}>
          <Box
            sx={{
              ...theme.mixins.column,
              justifyContent: "center",
              alignItems: "center",
              gap: "1rem",
              height: "100%",
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

            <OTP
              value={otp}
              onChange={handleOtpChange}
              numInputs={passcodeLength}
              otpInputType={OtpInputType.PASSWORD}
            />
            {/* <Text sx={{ ...theme.mixins.validationError }}>
              Invalid passcode
            </Text> */}
          </Box>
        </LoadingLayout>
      </ModalLayout>
    </DrawerComponent>
  );
});

ConfirmByPasscode.displayName = "ConfirmByPasscode";
export default ConfirmByPasscode;
