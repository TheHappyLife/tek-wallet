"use client";
import { GeneralProps } from "../../../types/ui";
import OTP, { OtpInputType } from "../../../components/ui/OTP";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import Text from "../../../components/ui/Text";
import { ActionConfirm } from "../ConfirmLayout/type";
import ModalLayout from "../ModalLayout";
import { Box, useTheme } from "@mui/material";
import LoadingLayout, { LoadingLayoutRef } from "../LoadingLayout";
import DrawerComponent, {
  DrawerComponentProps,
  DrawerComponentRef,
} from "../DrawerComponent";

interface ConfirmByPasscodeProps
  extends Omit<GeneralProps, "onclick" | "sx" | "onClick">,
    DrawerComponentProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onConfirmSuccess?: (value: string) => any;
  action: ActionConfirm;
}

const passcodeLength = 6;

export interface ConfirmByPasscodeRef
  extends Omit<DrawerComponentRef, "trigger"> {
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

  const drawerRef = useRef<DrawerComponentRef>(null);
  const handleCleardata = () => {
    setOtp("");
  };
  const handleClose = () => {
    drawerRef.current?.close();
    handleCleardata();
    props.onClose?.();
  };
  useImperativeHandle(ref, () => ({
    clearData: handleCleardata,
    open: () => {
      drawerRef.current?.open();
    },
    close: () => {
      handleClose();
    },
    lockStatus: () => {
      drawerRef.current?.lockStatus();
    },
    unlockStatus: () => {
      drawerRef.current?.unlockStatus();
    },
  }));

  const handleOnClose = () => {
    handleCleardata();
    props.onClose?.();
  };

  const handleOnOpen = () => {
    props.onOpen?.();
  };

  const handleOtpChange = async (value: string) => {
    /**
     * validate otp here
     */
    try {
      setOtp(value);
      if (value.length === passcodeLength) {
        loadingRef.current?.startLoading();
        drawerRef.current?.lockStatus();
        await new Promise((resolve) => setTimeout(resolve, 5000));
        drawerRef.current?.unlockStatus();
        loadingRef.current?.endLoading();
        handleClose();
        onConfirmSuccess?.(value);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <DrawerComponent
      ref={drawerRef}
      trigger={props.children}
      onOpen={handleOnOpen}
      onClose={handleOnClose}
    >
      <LoadingLayout
        initLoading={false}
        ref={loadingRef}
        sx={{ width: "100%" }}
      >
        <ModalLayout title={"Authentication"} onClose={handleClose}>
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
            <OTP
              value={otp}
              onChange={handleOtpChange}
              numInputs={passcodeLength}
              otpInputType={OtpInputType.PASSWORD}
            />
          </Box>
        </ModalLayout>
      </LoadingLayout>
    </DrawerComponent>
  );
});

ConfirmByPasscode.displayName = "ConfirmByPasscode";
export default ConfirmByPasscode;
