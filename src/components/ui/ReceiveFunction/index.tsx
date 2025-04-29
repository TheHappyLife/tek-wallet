"use client";
import {
  ChangeEventHandler,
  forwardRef,
  Fragment,
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
import { useTheme, Box, Input, Divider } from "@mui/material";
import CopyTextComponent from "../CopyTextComponent";
import Button, { BUTTON_STATUS } from "../Button";
import Icon from "../Icon";
import getIcon from "../../../utils/getIcon";
import Share from "../Share";
import NetworkSelection from "../NetworkSelection";
import TokenSelection from "../TokenSelection";
import {
  ReceiveExternalCurrency,
  ReceiveInternalCurrency,
} from "../../../types/expose-type";
import CloseModal from "../CloseModal";
import useReceiveData from "../../../hooks/useReceiveData";
import { NetworkData } from "../../../services/axios/type";
import RequireConnect from "../RequireConnect";
import WaitingData from "../WaitingData";
import EmptyData from "../EmptyData";
import Formatter from "../Formatter";
import ListItemCustom from "../ListItemCustom";
import { TonTransferUrlParams } from "../../../utils/parseTonTransferUrl";
import CustomTooltip from "../CustomTooltip";
import DialogContentLayout from "../DialogContentLayout";

export interface ReceiveInternalParams extends TonTransferUrlParams {
  isTekWalletReceiveInternal: true;
}

interface ReceiveFunctionProps extends GeneralProps {
  onClose?: UnknownFunction;
  onOpen?: UnknownFunction;
}

type ReceiveFunctionRef = {
  open: () => void;
  close: () => void;
};

export enum ReceiveMethods {
  RECEIVE_INTERNAL = "receive_internal",
  RECEIVE_EXTERNAL = "receive_external",
}

enum ReceiveStep {
  SELECT_METHOD = 0,
  SELECT_TOKEN = 1,
  SELECT_NETWORK = 2,
  SHOW_QR_CODE = 3,
}

const RECEIVE_STEP_NAME = {
  [ReceiveStep.SELECT_METHOD]: "Select method",
  [ReceiveStep.SELECT_TOKEN]: "Select token",
  [ReceiveStep.SELECT_NETWORK]: "Select network",
  [ReceiveStep.SHOW_QR_CODE]: "Scan QR code",
};

type ReceiveTokenType =
  | ReceiveExternalCurrency
  | ReceiveInternalCurrency
  | undefined;

const ReceiveFunction = forwardRef<ReceiveFunctionRef, ReceiveFunctionProps>(
  (props, ref) => {
    const drawerRef = useRef<DrawerComponentRef>(null);
    const amountDrawerRef = useRef<DrawerComponentRef>(null);
    const [selectedMethod, setSelectedMethod] = useState<ReceiveMethods>();
    const swiperRef = useRef<SwiperControlledRef>(null);
    const theme = useTheme();
    const [currentStep, setCurrentStep] = useState<ReceiveStep>(
      ReceiveStep.SELECT_METHOD
    );
    const [selectedToken, setSelectedToken] = useState<ReceiveTokenType>();
    const [selectedNetwork, setSelectedNetwork] = useState<NetworkData>();
    const { isAuthenticated, blockchainWallets, masterWallet } =
      useWalletData();
    const [inputAmount, setInputAmount] = useState<number>(0);
    const [amount, setAmount] = useState<number>(0);
    const [amountError, setAmountError] = useState<string>("");
    const {
      receiveExternalTokens,
      updateReceiveExternalToken,
      receiveInternalTokens,
      updateReceiveInternalToken,
    } = useReceiveData();
    const receiveTokens = useMemo(() => {
      if (selectedMethod === ReceiveMethods.RECEIVE_INTERNAL) {
        return receiveInternalTokens;
      }

      return receiveExternalTokens;
    }, [receiveExternalTokens, receiveInternalTokens, selectedMethod]);

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

    const receiveAddress = useMemo(() => {
      if (!selectedToken) {
        return undefined;
      }
      if (selectedMethod === ReceiveMethods.RECEIVE_INTERNAL) {
        return masterWallet;
      }

      return blockchainWallets?.find(
        (item) => item.networkSlug === selectedNetwork?.slug
      )?.blockchainAddress;
    }, [
      blockchainWallets,
      selectedNetwork,
      selectedMethod,
      masterWallet,
      selectedToken,
    ]);

    const qrCodeValue: string = useMemo(() => {
      if (!receiveAddress || !selectedToken) {
        return "";
      }

      if (selectedMethod === ReceiveMethods.RECEIVE_INTERNAL) {
        const tonTransferParamInternal: ReceiveInternalParams = {
          address: receiveAddress,
          amount: amount * 10 ** (selectedToken?.decimal ?? 0),
          jetton: selectedToken.address,
          isTekWalletReceiveInternal: true,
          text: "",
          bin: "",
          init: "",
          isDeepLinkFormat: false,
        };

        return JSON.stringify(tonTransferParamInternal);
      }

      return `ton://transfer/${receiveAddress}?&jetton=${selectedToken.address}&amount=${amount * 10 ** (selectedToken?.decimal ?? 0)}`;
    }, [receiveAddress, selectedToken, amount, selectedMethod]);
    const warningMessage = useMemo(() => {
      if (selectedMethod === ReceiveMethods.RECEIVE_EXTERNAL && !amount) {
        return (
          <>
            The amount must be between{" "}
            <strong style={{ color: theme.palette.text.white }}>
              <Formatter value={selectedToken?.min_value} /> to{" "}
              <Formatter
                value={selectedToken?.max_value}
                unit={selectedToken?.name}
              />{" "}
            </strong>{" "}
            and{" "}
            <strong style={{ color: theme.palette.text.white }}>
              select the correct network
            </strong>
            , unless you will lose your assets.
          </>
        );
      }
      if (selectedMethod === ReceiveMethods.RECEIVE_EXTERNAL && !!amount) {
        return (
          <>
            Please{" "}
            <strong style={{ color: theme.palette.text.white }}>
              select the correct network
            </strong>
            , unless you will lose your assets.
          </>
        );
      }

      if (selectedMethod === ReceiveMethods.RECEIVE_INTERNAL && !amount) {
        return (
          <>
            The amount must be between{" "}
            <strong style={{ color: theme.palette.text.white }}>
              <Formatter value={selectedToken?.min_value} /> to{" "}
              <Formatter
                value={selectedToken?.max_value}
                unit={selectedToken?.name}
              />{" "}
            </strong>
            , unless you will lose your assets.
          </>
        );
      }

      return null;
    }, [selectedMethod, selectedToken, amount]);
    const clearValues = () => {
      setInputAmount(0);
      setAmount(0);
      setAmountError("");
      setSelectedToken(undefined);
      setSelectedNetwork(undefined);
      setSelectedMethod(undefined);
    };
    const open = () => {
      if (!isAuthenticated) throw new Error("Please connect your wallet");
      drawerRef.current?.open();
    };
    const close = () => {
      if (!isAuthenticated) throw new Error("Please connect your wallet");
      drawerRef.current?.close();
      gotoStep(ReceiveStep.SELECT_METHOD);
    };
    useImperativeHandle(ref, () => ({
      open,
      close,
    }));
    const handleBack = () => {
      if (
        currentStep === ReceiveStep.SHOW_QR_CODE &&
        selectedMethod === ReceiveMethods.RECEIVE_INTERNAL
      ) {
        gotoStep(ReceiveStep.SELECT_TOKEN);

        return;
      }
      gotoStep(currentStep - 1);
    };

    const handleSelectMethod = (method: ReceiveMethods) => {
      console.warn("🚀 ~ handleSelectMethod ~ method:", method);
      setSelectedMethod(method);
      switch (method) {
        case ReceiveMethods.RECEIVE_INTERNAL:
        case ReceiveMethods.RECEIVE_EXTERNAL:
          gotoStep(ReceiveStep.SELECT_TOKEN);
          break;
        default:
          break;
      }
    };

    const gotoStep = (step: ReceiveStep) => {
      if (step === ReceiveStep.SELECT_METHOD) {
        clearValues();
      }
      setCurrentStep(step);
      swiperRef.current?.slideTo(step);
    };

    const handleSelectToken = (token: ReceiveTokenType) => {
      console.warn("🚀 ~ handleSelectToken ~ token:", token);
      setSelectedToken(token);
      if (!!token) {
        if (selectedMethod === ReceiveMethods.RECEIVE_INTERNAL) {
          gotoStep(ReceiveStep.SHOW_QR_CODE);
        } else {
          gotoStep(ReceiveStep.SELECT_NETWORK);
        }
      }
    };

    const handleSelectNetwork = (network?: NetworkData) => {
      console.warn("network", selectedNetwork);
      setSelectedNetwork(network);
      gotoStep(ReceiveStep.SHOW_QR_CODE);
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
      props.onClose?.();
      gotoStep(ReceiveStep.SELECT_METHOD);
    };
    useEffect(() => {
      if (isAuthenticated && !receiveTokens) {
        updateReceiveExternalToken();
      }
      if (isAuthenticated && !receiveInternalTokens) {
        updateReceiveInternalToken();
      }
    }, [isAuthenticated]);

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
                hideBack={currentStep === ReceiveStep.SELECT_METHOD}
                center={RECEIVE_STEP_NAME[currentStep]}
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
              key={receiveTokens?.length}
            >
              <SwiperSlide key={ReceiveStep.SELECT_METHOD}>
                <Box
                  sx={{
                    ...theme.mixins.column,
                    height: "fit-content",
                  }}
                >
                  {Object.values(ReceiveMethods).map((item, index) => {
                    return (
                      <Fragment key={item}>
                        {index !== 0 && <Divider />}
                        <ListItemCustom
                          title={item}
                          description={item}
                          icon={getIcon(item + "_icon")}
                          onClick={() =>
                            handleSelectMethod(item as ReceiveMethods)
                          }
                          sx={{
                            my: theme.mixins.customMargin.m12,
                          }}
                        />
                      </Fragment>
                    );
                  })}
                </Box>
              </SwiperSlide>
              <SwiperSlide key={ReceiveStep.SELECT_TOKEN}>
                <Box
                  sx={{
                    ...theme.mixins.column,
                    gap: theme.mixins.gaps.g12,
                    height: "fit-content",
                  }}
                >
                  {!receiveTokens && <WaitingData />}
                  {receiveTokens?.length === 0 && <EmptyData />}
                  {receiveTokens?.map((item) => {
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
              <SwiperSlide key={ReceiveStep.SELECT_NETWORK}>
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
              <SwiperSlide key={ReceiveStep.SHOW_QR_CODE}>
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
                    id="share-receive-info"
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
                        Receive{" "}
                        <strong>
                          {!!amount && <Formatter value={amount} />}{" "}
                          {selectedToken?.name}
                        </strong>
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
                        title={`Receive ${selectedToken?.name}`}
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
                    {selectedMethod === ReceiveMethods.RECEIVE_EXTERNAL && (
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
                    )}
                    <Box
                      sx={{
                        ...theme.mixins.column,
                        gap: theme.mixins.gaps.g4,
                        color: "text.white",
                      }}
                    >
                      <Box
                        sx={{
                          ...theme.mixins.row,
                          gap: theme.mixins.gaps.g8,
                        }}
                      >
                        <Text
                          sx={{
                            ...theme.mixins.valueDescription,
                          }}
                        >
                          {selectedMethod === ReceiveMethods.RECEIVE_INTERNAL
                            ? "Internal address"
                            : "Address"}
                        </Text>
                        {selectedMethod === ReceiveMethods.RECEIVE_INTERNAL && (
                          <CustomTooltip
                            trigger={
                              <Icon src={getIcon("tooltip")} width={16} />
                            }
                          >
                            <DialogContentLayout
                              content={
                                <Text
                                  sx={{
                                    ...theme.mixins.warning,
                                  }}
                                >
                                  This address is used to receive token by
                                  internal transfer. You can not use it for
                                  blockchain transaction. If you want to receive
                                  token by blockchain, please select the{" "}
                                  <strong>Receive Internal</strong> method
                                  instead.
                                </Text>
                              }
                            />
                          </CustomTooltip>
                        )}
                      </Box>
                      <Text
                        sx={{
                          ...theme.mixins.value,
                          wordBreak: "break-all",
                        }}
                      >
                        <CopyTextComponent value={receiveAddress || ""}>
                          {receiveAddress}
                        </CopyTextComponent>
                      </Text>
                    </Box>

                    {!!warningMessage && (
                      <Box
                        sx={{
                          ...theme.mixins.column,
                          gap: theme.mixins.gaps.g4,
                          backgroundColor: theme.palette.background.white16,
                          borderRadius: theme.mixins.theBorderRadius.r12,
                          padding: theme.mixins.customPadding.p8,
                        }}
                      >
                        <Text sx={{ ...theme.mixins.valueDescription }}>
                          {warningMessage}
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
                          fontSize: theme.typography.fontSize12,
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
                            leading: theme.typography.leading160,
                            textTransform: "capitalize",
                          }}
                        >
                          Copy
                        </Text>
                        <Icon src={getIcon("copy")} width={20} />
                      </Button.Secondary>
                    </CopyTextComponent>
                    <Share elementId="share-receive-info">
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
                            leading: theme.typography.leading160,
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

ReceiveFunction.displayName = "ReceiveFunction";

export default ReceiveFunction;
