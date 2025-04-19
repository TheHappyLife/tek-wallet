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
import { Balance } from "../../../types/expose-type";
import CloseModal from "../CloseModal";
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
    const [selectedToken, setSelectedToken] = useState<Balance | undefined>();
    const [selectedNetwork, setSelectedNetwork] = useState<any>();
    const { tokens } = useWalletData();
    const open = () => {
      drawerRef.current?.open();
    };
    const close = () => {
      drawerRef.current?.close();
    };
    useImperativeHandle(ref, () => ({
      open,
      close,
    }));
    const handleBack = () => {
      swiperRef.current?.prev();
      setCurrentStep(currentStep - 1);
    };

    const nextStep = () => {
      swiperRef.current?.next();
      setCurrentStep((prev) => prev + 1);
    };

    const handleSelectToken = (token: Balance) => {
      setSelectedToken(token);
      if (!!token) {
        nextStep();
      }
    };

    const handleSelectNetwork = (network: any) => {
      console.warn("network", selectedNetwork);
      setSelectedNetwork(network);
      nextStep();
    };

    return (
      <DrawerComponent
        ref={drawerRef}
        trigger={props.children}
        onOpen={props.onOpen}
        onClose={props.onClose}
      >
        <ModalLayout
          overrideHeader={
            <BackHeader
              sx={{
                width: "100%",
                paddingBottom: theme.mixins.customPadding.p16,
                display: "flex",
                alignItems: "center",
                my: theme.mixins.customPadding.p24,
              }}
              overrideBack={handleBack}
              hideBack={currentStep === DepositStep.SELECT_TOKEN}
              center={DEPOSIT_STEP_NAME[currentStep]}
            >
              <CloseModal sx={{ marginLeft: "auto" }} onClick={props.onClose} />
            </BackHeader>
          }
          onClose={close}
        >
          <SwiperControlled
            ref={swiperRef}
            swiperProps={{ autoHeight: true, spaceBetween: 32 }}
            key={tokens?.length}
          >
            <SwiperSlide key={DepositStep.SELECT_TOKEN}>
              <Box
                sx={{
                  ...theme.mixins.column,
                  gap: theme.mixins.gaps.g12,
                  height: "fit-content",
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
                      onClick={handleSelectToken}
                      key={(item as any).id}
                      tokenData={stringifiedTokenData}
                      active={selectedToken?.id != "kf"}
                    />
                  );
                })}
              </Box>
            </SwiperSlide>
            <SwiperSlide key={DepositStep.SELECT_NETWORK}>
              <Box
                sx={{
                  ...theme.mixins.column,
                  gap: theme.mixins.gaps.g12,
                }}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => {
                  return (
                    <NetworkSelection
                      key={item}
                      onClick={handleSelectNetwork}
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
                    ...theme.mixins.column,
                    gap: theme.mixins.gaps.g12,
                    backgroundColor: theme.palette.background.black24,
                    borderRadius: theme.mixins.theBorderRadius.r16,
                    padding: theme.mixins.customPadding.p16,
                    alignItems: "flex-start",
                    backdropFilter: "blur(10px)",
                  }}
                  id="share-deposit-info"
                >
                  <Box
                    sx={{
                      ...theme.mixins.column,
                      gap: theme.mixins.gaps.g4,
                      color: "text.white",
                      alignSelf: "center",
                    }}
                  >
                    <Text
                      sx={{
                        ...theme.mixins.value,
                      }}
                    >
                      Harry Andrew
                    </Text>
                    <Text
                      sx={{
                        ...theme.mixins.valueDescription,
                      }}
                    >
                      @user1234we
                    </Text>
                  </Box>

                  <Box
                    sx={{
                      width: "fit-content",
                      height: "fit-content",
                      alignSelf: "center",
                      borderRadius: theme.mixins.theBorderRadius.r12,
                      overflow: "hidden",
                    }}
                  >
                    <QRCode />
                  </Box>
                  <Box
                    sx={{
                      ...theme.mixins.column,
                      gap: theme.mixins.gaps.g4,
                      color: "text.white",
                    }}
                  >
                    <Text
                      sx={{
                        ...theme.mixins.valueDescription,
                      }}
                    >
                      Network
                    </Text>
                    <Text
                      sx={{
                        ...theme.mixins.value,
                      }}
                    >
                      Ethereum (ERC20)
                    </Text>
                  </Box>
                  <Box
                    sx={{
                      ...theme.mixins.column,
                      gap: theme.mixins.gaps.g4,
                      color: "text.white",
                    }}
                  >
                    <Text
                      sx={{
                        ...theme.mixins.valueDescription,
                      }}
                    >
                      Address
                    </Text>
                    <Text
                      sx={{
                        ...theme.mixins.value,
                        wordBreak: "break-all",
                      }}
                    >
                      tebfwe78w237dbyuc78wb4b3y8cbwebd8732w9bcubf638uegyg7dt63ged87dxi8w3gdyhf73
                    </Text>
                  </Box>
                  <Box
                    sx={{
                      ...theme.mixins.column,
                      gap: theme.mixins.gaps.g4,
                      backgroundColor: theme.palette.background.white16,
                      borderRadius: theme.mixins.theBorderRadius.r12,
                      padding: theme.mixins.customPadding.p8,
                    }}
                  >
                    <Text
                      sx={{
                        ...theme.mixins.valueDescription,
                      }}
                    >
                      Deposit min <strong>0.001</strong> ETH and select the
                      correct network, {`or you'll lose your assets.`}
                    </Text>
                  </Box>
                </Box>
                <Box
                  sx={{
                    ...theme.mixins.row,
                    gap: theme.mixins.gaps.g12,
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
                        gap: theme.mixins.gaps.g4,
                        ...theme.mixins.row,
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
                      <Icon src={getIcon("share")} width={20} />
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
