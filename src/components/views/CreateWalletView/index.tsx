"use client";
import { GeneralProps } from "../../../types/ui";
import DefaultPageLayout from "../../../components/layouts/DefaultPageLayout";
import SwiperControlled, {
  SwiperControlledRef,
} from "../../../components/ui/SwiperControlled";
import { SwiperSlide } from "swiper/react";
import ChildPageLayout, {
  ChildPageLayoutRef,
} from "../../../components/layouts/ChildPageLayout";
import PageHeader from "../../../components/ui/PageHeader";
import OTP, { OtpInputType } from "../../../components/ui/OTP";
import { useRef, useState } from "react";
import Text from "../../../components/ui/Text";
import useWalletData from "../../../hooks/useWalletData";
import { Box, useTheme } from "@mui/material";
interface CreateWalletViewProps extends GeneralProps {
  onBack: () => void;
}

export enum CreateWalletViewStep {
  CREATE_PASSCODE = 0,
  CONFIRM_PASSCODE = 1,
}

const passcodeLength = 6;

const CreateWalletView = (props: CreateWalletViewProps) => {
  const theme = useTheme();
  const [otp, setOtp] = useState("");
  const [confirmOtp, setConfirmOtp] = useState("");
  const swiperControlledRef = useRef<SwiperControlledRef>(null);
  const childPageLayoutRef = useRef<ChildPageLayoutRef>(null);
  const [currentStep, setCurrentStep] = useState(
    CreateWalletViewStep.CREATE_PASSCODE
  );
  const { createWallet } = useWalletData();
  const gotoStep = (step: CreateWalletViewStep) => {
    setCurrentStep(step);
    swiperControlledRef.current?.slideTo(step);
  };

  const clearInputsValue = () => {
    setOtp("");
    setConfirmOtp("");
  };

  const handleBack = () => {
    switch (currentStep) {
      case CreateWalletViewStep.CONFIRM_PASSCODE:
        setCurrentStep(CreateWalletViewStep.CREATE_PASSCODE);
        clearInputsValue();
        swiperControlledRef.current?.slideTo(
          CreateWalletViewStep.CREATE_PASSCODE
        );

        break;
      case CreateWalletViewStep.CREATE_PASSCODE:
        props.onBack();
        clearInputsValue();
        break;
      default:
        break;
    }
  };
  const handleOtpChange = (value: string) => {
    setOtp(value);
    /**
     * validate otp here
     */
    if (value.length === passcodeLength) {
      gotoStep(CreateWalletViewStep.CONFIRM_PASSCODE);
    }
  };

  const handleCreateWalletError = () => {
    childPageLayoutRef.current?.showError();
    setTimeout(() => {
      childPageLayoutRef.current?.showNormal();
    }, 1500);
  };

  const handleConfirmOtpChange = (value: string) => {
    setConfirmOtp(value);
    /**
     * validate otp here
     */
    if (value.length === passcodeLength) {
      console.warn("start create");
      createWallet(
        {
          passcode: value,
          appSlug: process.env.NEXT_PUBLIC_TEK_WALLET_APP_SLUG || "",
        },
        () => {
          console.warn("start loading");
          childPageLayoutRef.current?.showLoading();
        },
        () => {
          childPageLayoutRef.current?.showSuccess();
        },
        handleCreateWalletError
      );
    }
  };

  return (
    <ChildPageLayout
      ref={childPageLayoutRef}
      header={
        <PageHeader overrideBack={handleBack} title="Passcode"></PageHeader>
      }
    >
      <DefaultPageLayout
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          height: "100%",
          ...props.sx,
        }}
      >
        <SwiperControlled
          ref={swiperControlledRef}
          disableSwipe
          sx={{ height: "100%" }}
        >
          <SwiperSlide>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                gap: "1rem",
              }}
            >
              <Text
                sx={{
                  ...theme.mixins.sessionTitle,
                }}
              >
                Create Passcode
              </Text>
              <OTP
                value={otp}
                onChange={handleOtpChange}
                numInputs={passcodeLength}
                otpInputType={OtpInputType.PASSWORD}
              />
              <Text
                sx={{
                  ...theme.mixins.sessionDescription,
                }}
              >
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Necessitatibus, eos! Dolore quae vero in ducimus doloribus
              </Text>
            </Box>
          </SwiperSlide>
          <SwiperSlide>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                gap: "1rem",
              }}
            >
              <Text
                sx={{
                  ...theme.mixins.sessionTitle,
                }}
              >
                Confirm Passcode
              </Text>
              <OTP
                value={confirmOtp}
                onChange={handleConfirmOtpChange}
                numInputs={passcodeLength}
                otpInputType={OtpInputType.PASSWORD}
              />
              <Text
                sx={{
                  ...theme.mixins.sessionDescription,
                }}
              >
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Necessitatibus, eos! Dolore quae vero in ducimus doloribus
              </Text>
            </Box>
          </SwiperSlide>
        </SwiperControlled>
      </DefaultPageLayout>
    </ChildPageLayout>
  );
};
export default CreateWalletView;
