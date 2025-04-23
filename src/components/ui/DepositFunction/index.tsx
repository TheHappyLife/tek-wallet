"use client";
import {
  ChangeEventHandler,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { GeneralProps, UnknownFunction } from "../../../types/ui";
import DrawerComponent, { DrawerComponentRef } from "../DrawerComponent";
import SwiperControlled, { SwiperControlledRef } from "../SwiperControlled";
import useWalletData from "../../../hooks/useWalletData";
import ModalLayout from "../ModalLayout";
import { SwiperSlide } from "swiper/react";
import BackHeader from "../BackHeader";
import QRCode from "../QRCode";
import Text from "../Text";
import { useTheme, Box, Input } from "@mui/material";
import CopyTextComponent from "../CopyTextComponent";
import Button, { BUTTON_STATUS } from "../Button";
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
import WaitingData from "../WaitingData";
import EmptyData from "../EmptyData";
import Formatter from "../Formatter";
// import SafeSvgRenderer from "../SafeSvgRenderer";
interface DepositFunctionProps extends GeneralProps {
  onClose?: UnknownFunction;
  onOpen?: UnknownFunction;
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
    const amountDrawerRef = useRef<DrawerComponentRef>(null);
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
    const [inputAmount, setInputAmount] = useState<number>(0);
    const [amount, setAmount] = useState<number>(0);
    const [amountError, setAmountError] = useState<string>("");
    const { depositTokens, updateDepositToken } = useDepositData();
    const networks = useMemo(() => {
      console.warn("🚀 ~ networks ~ selectedToken:", selectedToken);
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

      return `ton://transfer/${addressByNetwork}?&jetton=${selectedToken.address}&amount=${amount * 10 ** (selectedToken?.decimal ?? 0)}`;
    }, [addressByNetwork, selectedToken, amount]);
    const resetValues = () => {
      setInputAmount(0);
      setAmount(0);
      setAmountError("");
    };
    const open = () => {
      if (!isAuthenticated) throw new Error("Please connect your wallet");
      drawerRef.current?.open();
    };
    const close = () => {
      if (!isAuthenticated) throw new Error("Please connect your wallet");
      drawerRef.current?.close();
      resetValues();
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
      console.warn("🚀 ~ handleSelectToken ~ token:", token);
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

    const validateAmount = (amount: number) => {
      if (amount < (selectedToken?.min_value ?? 0)) {
        setAmountError(
          `Min ${selectedToken?.min_value} ${selectedToken?.name}`
        );

        return false;
      }
      if (amount > (selectedToken?.max_value ?? Infinity)) {
        setAmountError(
          `Max ${selectedToken?.max_value} ${selectedToken?.name}`
        );

        return false;
      }

      setAmountError("");

      return true;
    };

    const handleChangeAmount: ChangeEventHandler<HTMLInputElement> = (e) => {
      const amountNumber = Number(e.target.value);
      if (isNaN(amountNumber)) {
        return;
      }

      setInputAmount(amountNumber);
      validateAmount(amountNumber);
    };

    const handleContinue = () => {
      setAmount(inputAmount);
      amountDrawerRef.current?.close();
    };

    const handleUnset = () => {
      setAmount(0);
      setInputAmount(0);
      amountDrawerRef.current?.close();
    };

    const handleOnClose = () => {
      resetValues();
      props.onClose?.();
    };
    useEffect(() => {
      if (isAuthenticated && !depositTokens) {
        updateDepositToken();
      }
    }, [isAuthenticated, depositTokens]);

    return (
      <RequireConnect>
        <DrawerComponent
          ref={drawerRef}
          trigger={props.children}
          onOpen={props.onOpen}
          onClose={handleOnClose}
        >
          <ModalLayout
            overrideHeader={
              <BackHeader
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  minHeight: "2rem",
                  mb: theme.mixins.customMargin.m20,
                }}
                overrideBack={handleBack}
                hideBack={currentStep === DepositStep.SELECT_TOKEN}
                center={DEPOSIT_STEP_NAME[currentStep]}
              >
                <CloseModal sx={{ marginLeft: "auto" }} onClick={close} />
              </BackHeader>
            }
          >
            <SwiperControlled
              ref={swiperRef}
              swiperProps={{
                autoHeight: true,
                spaceBetween: 32,
              }}
              disableSwipe
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
                  {!depositTokens && <WaitingData />}
                  {depositTokens?.length === 0 && <EmptyData />}
                  {depositTokens?.map((item) => {
                    const stringifiedTokenData = JSON.stringify(item);
                    if (!item) return null;

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
                    if (!item) return null;

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
                          textAlign: "center",
                        }}
                      >
                        Deposit {!!amount && <Formatter value={amount} />}{" "}
                        {selectedToken?.name}
                      </Text>
                      {/* <Text
                      sx={{
                        ...theme.mixins.valueDescription,
                      }}
                    >
                      @user1234we
                    </Text> */}
                    </Box>

                    <Box
                      sx={{
                        position: "relative",
                        width: "fit-content",
                        height: "fit-content",
                        alignSelf: "center",
                        borderRadius: theme.mixins.theBorderRadius.r12,
                        overflow: "hidden",
                        backgroundColor: theme.palette.background.white,
                        backdropFilter: "blur(10px)",
                      }}
                    >
                      <QRCode
                        value={qrCodeValue}
                        title={`Deposit ${selectedToken?.name}`}
                        logo={getIcon("ton")}
                        bgColor={"transparent"}
                      />
                      {/* <SafeSvgRenderer
                        svgString={selectedToken?.icon_svg || ""}
                        width={100}
                        height={100}
                        sx={{
                          ...theme.mixins.center,
                        }}
                      /> */}
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
                        <CopyTextComponent value={addressByNetwork || ""}>
                          {addressByNetwork}
                        </CopyTextComponent>
                      </Text>
                    </Box>
                    {!amount && (
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
                          <strong style={{ color: theme.palette.text.white }}>
                            min {selectedToken?.min_value} {selectedToken?.name}
                          </strong>{" "}
                          and{" "}
                          <strong style={{ color: theme.palette.text.white }}>
                            select the correct network
                          </strong>
                          , or you will lose your assets.
                        </Text>
                      </Box>
                    )}
                  </Box>
                  <DrawerComponent
                    ref={amountDrawerRef}
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                    trigger={
                      <Button.Text
                        sx={{
                          fontSize: "typography.fontSize12",
                          textTransform: "none",
                        }}
                      >
                        {amount ? "Edit" : "+ Set"} amount
                      </Button.Text>
                    }
                  >
                    <ModalLayout>
                      <Box
                        sx={{
                          ...theme.mixins.column,
                          gap: theme.mixins.gaps.g12,
                        }}
                      >
                        <Text sx={{ ...theme.mixins.fieldTitle }}>
                          {amount ? "Edit" : "+ Set"} {selectedToken?.name}{" "}
                          amount
                        </Text>
                        <Input
                          placeholder={`${selectedToken?.min_value} - ${selectedToken?.max_value}`}
                          sx={{
                            ...theme.mixins.value,
                            fontSize: theme.typography.fontSize16,
                          }}
                          value={inputAmount}
                          onChange={handleChangeAmount}
                        />
                        {amountError && (
                          <Text sx={{ ...theme.mixins.validationError }}>
                            {amountError}
                          </Text>
                        )}
                        <Box
                          sx={{
                            ...theme.mixins.row,
                            width: "100%",
                            mt: theme.mixins.customMargin.m8,
                            gap: theme.mixins.gaps.g12,
                          }}
                        >
                          {!!amount && (
                            <Button.Text onClick={handleUnset}>
                              Unset
                            </Button.Text>
                          )}
                          <Button.Primary
                            sx={{ flex: 1 }}
                            onClick={handleContinue}
                            status={
                              !!amountError
                                ? BUTTON_STATUS.DISABLED
                                : BUTTON_STATUS.ENABLED
                            }
                          >
                            Continue
                          </Button.Primary>
                        </Box>
                      </Box>
                    </ModalLayout>
                  </DrawerComponent>

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
      </RequireConnect>
    );
  }
);

DepositFunction.displayName = "DepositFunction";

export default DepositFunction;
