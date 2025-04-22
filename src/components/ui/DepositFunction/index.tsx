"use client";
import {
  forwardRef,
  ReactEventHandler,
  useEffect,
  useImperativeHandle,
  useMemo,
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
import { DepositCurrency } from "../../../types/expose-type";
import CloseModal from "../CloseModal";
import useDepositData from "../../../hooks/useDepositData";
import { NetworkData } from "../../../services/axios/type";
import RequireConnect from "../RequireConnect";
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
    const [selectedToken, setSelectedToken] = useState<
      DepositCurrency | undefined
    >();
    const [selectedNetwork, setSelectedNetwork] = useState<NetworkData>();
    const { isAuthenticated, blockchainWallets } = useWalletData();
    const { depositTokens, updateDepositToken } = useDepositData();

    const networks = useMemo(() => {
      if (!selectedToken) {
        return [];
      }
      const newNetWorks = [selectedToken.network_data];
      const sameNetwork = newNetWorks.find(
        (item) => item?.id === selectedToken?.id
      );

      if (!sameNetwork) {
        setSelectedNetwork(undefined);
      }

      return newNetWorks;
    }, [selectedToken]);

    const addressByNetwork: string | undefined = useMemo(() => {
      if (!blockchainWallets || !selectedNetwork) {
        return undefined;
      }

      return blockchainWallets.find(
        (item) => item.networkSlug === selectedNetwork?.slug
      )?.blockchainAddress;
    }, [blockchainWallets, selectedNetwork]);

    const qrCodeValue: string = useMemo(() => {
      if (!addressByNetwork || !selectedToken) {
        return "";
      }

      return `ton://transfer/${addressByNetwork}?&jetton=${selectedToken.address}`;
    }, [addressByNetwork, selectedToken]);

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

    const handleSelectToken = (token: DepositCurrency) => {
      setSelectedToken(token);
      if (!!token) {
        nextStep();
      }
    };

    const handleSelectNetwork = (network?: NetworkData) => {
      console.warn("network", selectedNetwork);
      setSelectedNetwork(network);
      nextStep();
    };

    useEffect(() => {
      if (isAuthenticated && !depositTokens) {
        updateDepositToken();
      }
    }, [isAuthenticated, depositTokens]);

    return (
      <DrawerComponent
        ref={drawerRef}
        trigger={<RequireConnect>{props.children}</RequireConnect>}
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
            key={depositTokens?.length}
          >
            <SwiperSlide key={DepositStep.SELECT_TOKEN}>
              <Box
                sx={{
                  ...theme.mixins.column,
                  gap: theme.mixins.gaps.g12,
                  height: "fit-content",
                }}
              >
                {depositTokens?.map((item) => {
                  const stringifiedTokenData = JSON.stringify(item);

                  return (
                    <TokenSelection
                      onClick={handleSelectToken}
                      key={item.id}
                      tokenData={stringifiedTokenData}
                      active={selectedToken?.id === item.id}
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
                {networks?.map((item) => {
                  return (
                    <NetworkSelection
                      key={item.id}
                      onClick={handleSelectNetwork}
                      networkData={JSON.stringify(item)}
                      active={selectedNetwork?.id === item.id}
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
                  {/* <Box
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
                  </Box> */}

                  <Box
                    sx={{
                      width: "fit-content",
                      height: "fit-content",
                      alignSelf: "center",
                      borderRadius: theme.mixins.theBorderRadius.r12,
                      overflow: "hidden",
                    }}
                  >
                    <QRCode
                      value={qrCodeValue}
                      title={`Deposit ${selectedToken?.name}`}
                      logo={getIcon("ton")}
                    />
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
                    <Box
                      component="button"
                      sx={{
                        ...theme.mixins.row,
                        gap: theme.mixins.gaps.g2,
                        cursor: "pointer",
                        transition: "transform 0.3s ease-in-out",
                        "&:active": {
                          transform: "translateX(0.5rem)",
                        },
                      }}
                      onClick={handleBack}
                    >
                      <Text
                        sx={{
                          ...theme.mixins.value,
                        }}
                      >
                        {selectedNetwork?.name}
                      </Text>
                      <Icon src={getIcon("right_arrow")} width={10} />
                    </Box>
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
                      {addressByNetwork}
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
                      Deposit{" "}
                      <strong>
                        min {selectedToken?.min_value} {selectedToken?.name}
                      </strong>{" "}
                      and <strong>select the correct network</strong>, or you
                      will lose your assets.
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
                  <CopyTextComponent value={qrCodeValue}>
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
