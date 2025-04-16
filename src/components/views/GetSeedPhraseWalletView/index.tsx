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
import Button from "../../ui/Button";
import Icon from "../../ui/Icon";
import getIcon from "../../../utils/getIcon";

interface GetSeedPhraseWalletViewProps extends GeneralProps {
  onBack: () => void;
}

export enum GetSeedPhraseWalletViewStep {
  ENTER_PASSCODE = 0,
  SHOW_SEED_PHRASE = 1,
}

const passcodeLength = 6;

const GetSeedPhraseWalletView = (props: GetSeedPhraseWalletViewProps) => {
  const theme = useTheme();
  const [otp, setOtp] = useState("");
  const [isShowSeedPhrase, setIsShowSeedPhrase] = useState(false);
  const [seedPhrase, setSeedPhrase] = useState<string | undefined>(undefined);
  const swiperControlledRef = useRef<SwiperControlledRef>(null);
  const childPageLayoutRef = useRef<ChildPageLayoutRef>(null);
  const [currentStep, setCurrentStep] = useState(
    GetSeedPhraseWalletViewStep.ENTER_PASSCODE
  );
  const { getSeedPhrase } = useWalletData();
  const gotoStep = (step: GetSeedPhraseWalletViewStep) => {
    setCurrentStep(step);
    swiperControlledRef.current?.slideTo(step);
  };
  const resetValue = () => {
    setOtp("");
    setSeedPhrase(undefined);
    setIsShowSeedPhrase(false);
    setCurrentStep(GetSeedPhraseWalletViewStep.ENTER_PASSCODE);
    gotoStep(GetSeedPhraseWalletViewStep.ENTER_PASSCODE);
  };

  const toggleShowSeedPhrase = () => {
    setIsShowSeedPhrase(!isShowSeedPhrase);
  };

  const handleDone = () => {
    props.onBack();
    resetValue();
  };

  const handleBack = () => {
    switch (currentStep) {
      case GetSeedPhraseWalletViewStep.SHOW_SEED_PHRASE:
        // gotoStep(GetSeedPhraseWalletViewStep.ENTER_PASSCODE);
        handleDone();
        break;
      case GetSeedPhraseWalletViewStep.ENTER_PASSCODE:
        handleDone();
        break;
      default:
        break;
    }
  };

  const handleCreateWalletError = () => {
    childPageLayoutRef.current?.showError();
    setTimeout(() => {
      childPageLayoutRef.current?.showNormal();
    }, 1500);
  };

  const handleOtpChange = (value: string) => {
    setOtp(value);
    /**
     * validate otp here
     */
    if (value.length === passcodeLength) {
      childPageLayoutRef.current?.showLoading();
      getSeedPhrase(
        {
          passcode: value,
        },
        () => {
          console.warn("🚀 ~ handleOtpChange ~ start");
          childPageLayoutRef.current?.showLoading();
        },
        (data) => {
          setSeedPhrase(data?.data?.seed_pharse);
          childPageLayoutRef.current?.showSuccess();
          setTimeout(() => {
            childPageLayoutRef.current?.showNormal();
            gotoStep(GetSeedPhraseWalletViewStep.SHOW_SEED_PHRASE);
          }, 1000);
        },
        handleCreateWalletError
      );
    }
  };

  return (
    <ChildPageLayout
      ref={childPageLayoutRef}
      header={
        <PageHeader
          overrideBack={handleBack}
          title="Backup Wallet"
        ></PageHeader>
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
                gap: "1rem",
                height: "100%",
              }}
            >
              <Text
                sx={{
                  ...theme.mixins.sessionTitle,
                }}
              >
                Enter Passcode
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
                Enter your passcode to get your wallet seed phrase
              </Text>
            </Box>
          </SwiperSlide>
          <SwiperSlide>
            <Box
              sx={{
                minHeight: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
              }}
            >
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1rem",
                  height: "fit-content",
                }}
              >
                {seedPhrase?.split(" ").map((word, index) => (
                  <Text
                    key={index}
                    sx={{
                      color: theme.palette.text.white80,
                      padding: "0.5rem 0.75rem",
                      backgroundColor: theme.palette.background.black16,
                      borderRadius: "0.75rem",
                      fontSize: theme.typography.fontSize14,
                      fontWeight: theme.typography.fontWeight400,
                      textAlign: "center",
                      width: "100%",
                      border: `1px solid ${theme.palette.background.white24}`,
                    }}
                  >
                    {index + 1}. <span> </span>{" "}
                    {isShowSeedPhrase ? word : "********"}
                  </Text>
                ))}
              </Box>
              <Text sx={{ marginTop: "auto", ...theme.mixins.noteContent }}>
                Please do not store your seed phrase digitally (e.g., text files
                on your computer, email...). Write it down and keep it in a
                secure, confidential location that is resistant to adverse
                conditions like moisture, fire, or other hazards for safe
                storage.
              </Text>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "stretch",
                  gap: "1rem",
                  width: "100%",
                }}
              >
                <Icon
                  src={getIcon(
                    isShowSeedPhrase ? "show_seed_phrase" : "hide_seed_phrase"
                  )}
                  onClick={toggleShowSeedPhrase}
                  sx={{
                    aspectRatio: 1,
                  }}
                />
                <Button.Primary
                  onClick={handleDone}
                  sx={{
                    flex: 1,
                  }}
                >
                  Done
                </Button.Primary>
              </Box>
            </Box>
          </SwiperSlide>
        </SwiperControlled>
      </DefaultPageLayout>
    </ChildPageLayout>
  );
};
export default GetSeedPhraseWalletView;
