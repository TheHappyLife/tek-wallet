"use client";
import {
  forwardRef,
  ReactEventHandler,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { GeneralProps } from "../../../types/ui";
import DrawerComponent, { DrawerComponentRef } from "../DrawerComponent";
import SwiperControlled, { SwiperControlledRef } from "../SwiperControlled";
import useWalletData from "../../../hooks/useWalletData";
import ModalLayout from "../ModalLayout";
import { SwiperSlide } from "swiper/react";
import BackHeader from "../BackHeader";
import ModalTitle from "../ModalTitle";
import QRCode from "../QRCode";
import Text from "../Text";
import { useTheme, Box } from "@mui/material";
import CopyTextComponent from "../CopyTextComponent";
import Button from "../Button";
import Icon from "../Icon";
import getIcon from "../../../utils/getIcon";
import Share from "../Share";
import NetworkSelection from "../NetworkSelection";
import TokenSelection from "../TokenSelection";
interface DepositFunctionProps extends GeneralProps {
  onClose?: ReactEventHandler;
  onOpen?: ReactEventHandler;
}

type DepositFunctionRef = {
  open: () => void;
  close: () => void;
};

enum DepositStep {
  SELECT_TOKEN = 1,
  SELECT_NETWORK = 2,
  SHOW_QR_CODE = 3,
}

const DEPOSIT_STEP_NAME = {
  [DepositStep.SELECT_TOKEN]: "Select token",
  [DepositStep.SELECT_NETWORK]: "Select network",
  [DepositStep.SHOW_QR_CODE]: "Scan QR code",
};

const DepositFunction = forwardRef<DepositFunctionRef, DepositFunctionProps>(
  (props, ref) => {
    const drawerRef = useRef<DrawerComponentRef>(null);
    const swiperRef = useRef<SwiperControlledRef>(null);
    const theme = useTheme();
    const [currentStep, setCurrentStep] = useState<DepositStep>(
      DepositStep.SELECT_TOKEN
    );
    const { tokens } = useWalletData();
    const open = () => {
      drawerRef.current?.open();
    };
    const close = () => {
      drawerRef.current?.close();
    };
    const prevStep = () => {
      swiperRef.current?.prev();
      setCurrentStep(currentStep - 1);
    };
    useImperativeHandle(ref, () => ({
      open,
      close,
    }));

    return (
      <DrawerComponent
        ref={drawerRef}
        trigger={props.children}
        onOpen={props.onOpen}
        onClose={props.onClose}
      >
        <ModalLayout title={DEPOSIT_STEP_NAME[currentStep]} onClose={close}>
          <SwiperControlled
            ref={swiperRef}
            // initialActiveTab={currentStep}
            // swiperProps={{ autoHeight: true }}
          >
            <SwiperSlide key={DepositStep.SELECT_TOKEN}>
              <BackHeader sx={{ paddingBottom: "1rem" }} hideBack>
                <ModalTitle>Select token</ModalTitle>
              </BackHeader>
              <Box sx={{ color: "red" }} onClick={() => console.warn(tokens)}>
                Click
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: theme.mixins.gaps.g16,
                }}
              >
                {tokens?.map((item) => {
                  const stringifiedTokenData = JSON.stringify({
                    ...item,
                    name: "Fake",
                    fullname: "Fake fullname",
                  });

                  return (
                    <TokenSelection
                      key={(item as any).id}
                      tokenData={stringifiedTokenData}
                      // active={index === 1}
                    />
                  );
                })}
              </Box>
            </SwiperSlide>
            <SwiperSlide key={DepositStep.SELECT_NETWORK}>
              <BackHeader
                sx={{ paddingBottom: "1rem" }}
                overrideBack={prevStep}
              >
                <ModalTitle>Select network</ModalTitle>
              </BackHeader>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: theme.mixins.gaps.g12,
                }}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => {
                  return (
                    <NetworkSelection
                      key={item}
                      networkData={JSON.stringify({
                        name: `network ${item}`,
                        icon: "https://via.placeholder.com/150",
                      })}
                    />
                  );
                })}
              </Box>
            </SwiperSlide>
            <SwiperSlide key={DepositStep.SHOW_QR_CODE}>
              <BackHeader
                sx={{ paddingBottom: "1rem" }}
                overrideBack={prevStep}
              >
                <ModalTitle>Scan QR code</ModalTitle>
              </BackHeader>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: theme.mixins.gaps.g16,
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                    backgroundColor: "ui-background-222",
                    borderRadius: "0.75rem",
                    padding: "1.5rem",
                    alignItems: "flex-start",
                  }}
                  id="share-deposit-info"
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.125rem",
                      color: "text.white",
                      alignSelf: "center",
                    }}
                  >
                    <Text
                      sx={{
                        fontSize: theme.typography.fontSize12,
                        fontWeight: theme.typography.fontWeight500,
                        leading: "typography.leading150",
                      }}
                    >
                      Harry Andrew
                    </Text>
                    <Text
                      sx={{
                        fontSize: theme.typography.fontSize12,
                        fontWeight: theme.typography.fontWeight400,
                        leading: "typography.leading150",
                      }}
                    >
                      @user1234we
                    </Text>
                  </Box>
                  <Box
                    sx={{
                      alignSelf: "center",
                      padding: "0.75rem",
                      backgroundColor: "ui-background-white",
                    }}
                  >
                    <QRCode />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.125rem",
                      color: "text.white",
                    }}
                  >
                    <Text
                      sx={{
                        fontSize: theme.typography.fontSize10,
                        leading: "typography.leading150",
                      }}
                    >
                      Network
                    </Text>
                    <Text
                      sx={{
                        fontSize: theme.typography.fontSize13,
                        fontWeight: theme.typography.fontWeight500,
                        leading: "typography.leading150",
                      }}
                    >
                      Ethereum (ERC20)
                    </Text>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.125rem",
                      color: "text.white",
                    }}
                  >
                    <Text
                      sx={{
                        fontSize: theme.typography.fontSize10,
                        leading: "typography.leading150",
                      }}
                    >
                      Address
                    </Text>
                    <Text
                      sx={{
                        fontSize: theme.typography.fontSize13,
                        fontWeight: theme.typography.fontWeight500,
                        leading: "typography.leading150",
                        wordBreak: "break-all",
                      }}
                    >
                      tebfwe78w237dbyuc78wb4b3y8cbwebd8732w9bcubf638uegyg7dt63ged87dxi8w3gdyhf73
                    </Text>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      backgroundColor: "ui-background-white-16",
                      borderRadius: "12px",
                      padding: "8px 12px",
                    }}
                  >
                    <Text className="text-11 text-ui-text-white leading-140">
                      Deposit min <strong>0.001</strong> ETH and select the
                      correct network, {`or you'll lose your assets.`}
                    </Text>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    justifyContent: "center",
                  }}
                >
                  <CopyTextComponent value="https://reactjs.org/">
                    <Button.Secondary className="gap-1.5 flex items-center">
                      <Text
                        sx={{
                          fontSize: theme.typography.fontSize12,
                          fontWeight: theme.typography.fontWeight400,
                          leading: "typography.leading150",
                          textTransform: "capitalize",
                        }}
                      >
                        Copy
                      </Text>
                      <Icon src={getIcon("copy")} width={20} />
                    </Button.Secondary>
                  </CopyTextComponent>
                  <Share elementId="share-deposit-info">
                    <Button.Secondary
                      sx={{
                        gap: "0.125rem",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        sx={{
                          fontSize: theme.typography.fontSize12,
                          fontWeight: theme.typography.fontWeight400,
                          leading: "typography.leading150",
                          textTransform: "capitalize",
                        }}
                      >
                        Share
                      </Text>
                      <Icon src={getIcon("copy")} width={20} />
                    </Button.Secondary>
                  </Share>
                </Box>
              </Box>
            </SwiperSlide>
          </SwiperControlled>
        </ModalLayout>
      </DrawerComponent>
    );
  }
);

DepositFunction.displayName = "DepositFunction";

export default DepositFunction;
