"use client";
import {
  forwardRef,
  Fragment,
  ReactEventHandler,
  ReactNode,
  useCallback,
  useEffect,
  useId,
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
import Text from "../Text";
import { useTheme, Box, Divider } from "@mui/material";
import Button, { BUTTON_STATUS } from "../Button";
import Icon from "../Icon";
import getIcon from "../../../utils/getIcon";
import NetworkSelection from "../NetworkSelection";
import TokenSelection from "../TokenSelection";
import CloseModal from "../CloseModal";
import { NetworkData } from "../../../services/axios/type";
import RequireConnect from "../RequireConnect";
import useWithdrawData from "../../../hooks/useWithdrawData";
import { WithdrawCurrency } from "../../../services/axios/get-withdraw-tokens-list-service/type";
import ListItemCustom from "../ListItemCustom";
import Input from "../Input";
import QrCodeReader, { QrCodeReaderRef } from "../QrCodeReader";
import { IDetectedBarcode } from "@yudiel/react-qr-scanner";
import validateWalletAddressService from "../../../services/axios/validate-wallet-address-service";
import parseTonTransferUrl, {
  TonTransferUrlParams,
} from "../../../utils/parseTonTransferUrl";
import AppBackDrop, { AppBackDropRef } from "../AppBackDrop";
import DialogContentLayout from "../DialogContentLayout";
import AppDialog, { AppDialogRef } from "../AppDialog";
import Formatter from "../Formatter";
import sendInternalService from "../../../services/axios/send-internal-service";
import getEstimateFeeService from "../../../services/axios/get-est-fee-service";
import Fees from "../Fees";
import { ReceiveInternalParams } from "../ReceiveFunction";
interface WithdrawFunctionProps extends GeneralProps {
  onClose?: ReactEventHandler;
  onOpen?: ReactEventHandler;
}

type WithdrawFunctionRef = {
  open: () => void;
  close: () => void;
};

export enum SendMethods {
  SCAN_QR_CODE = "scan qr code",
  TRANSFER_INTERNAL = "send internal",
  TRANSFER_EXTERNAL = "send external",
}

export enum WithdrawStep {
  SELECT_METHOD = 0,
  SELECT_TOKEN = 1,
  SELECT_NETWORK = 2,
  FORM = 3,
  CONFIRM = 4,
}

const WITHDRAW_STEP_NAME = {
  [WithdrawStep.SELECT_METHOD]: "Select method",
  [WithdrawStep.SELECT_TOKEN]: "Select token",
  [WithdrawStep.SELECT_NETWORK]: "Select network",
  [WithdrawStep.FORM]: "Form",
  [WithdrawStep.CONFIRM]: "Confirm",
};

export enum AmountError {
  INSUFFICIENT_BALANCE = "Your balance is insufficient",
  MAX_LIMIT = "The maximum amount is",
  MIN_LIMIT = "The minimum amount is",
}

const WithdrawFunction = forwardRef<WithdrawFunctionRef, WithdrawFunctionProps>(
  (props, ref) => {
    const swiperKey = useId();
    const drawerRef = useRef<DrawerComponentRef>(null);
    const swiperRef = useRef<SwiperControlledRef>(null);
    const theme = useTheme();
    const [currentStep, setCurrentStep] = useState<WithdrawStep>(
      WithdrawStep.SELECT_METHOD
    );
    const [selectedToken, setSelectedToken] = useState<
      WithdrawCurrency | undefined
    >();
    const [selectedNetwork, setSelectedNetwork] = useState<NetworkData>();
    const { isAuthenticated } = useWalletData();
    const { withdrawTokens, updateWithdrawToken, updateSendInternalToken } =
      useWithdrawData();
    const [infoDialogContent, setInfoDialogContent] = useState<ReactNode>();
    const [amount, setAmount] = useState<number | string>("");
    const [memo, setMemo] = useState<string | undefined>(undefined);
    const [recipientAddress, setRecipientAddress] = useState<
      string | undefined
    >(undefined);
    const [amountErrorMessage, setAmountErrorMessage] = useState<
      AmountError | undefined
    >();
    const [hiddenError, setHiddenError] = useState<boolean>(true);
    const [amountError, setAmountError] = useState<number>();
    const scannerAllQrCodeRef = useRef<QrCodeReaderRef>(null);
    const scannerAddressQrCodeRef = useRef<QrCodeReaderRef>(null);
    const backDropRef = useRef<AppBackDropRef>(null);
    const suggestUseTransferInternalDialogRef = useRef<AppDialogRef>(null);
    const [selectedMethod, setSelectedMethod] = useState<SendMethods>();
    const [sendInfoGet, setSendInfoGet] = useState<TonTransferUrlParams>();
    const [isLoadingEstimateFee, setIsLoadingEstimateFee] =
      useState<boolean>(false);
    // const [estimateFee, setEstimateFee] = useState<number>();
    const [recipientAddressError, setRecipientAddressError] =
      useState<string>();
    const onlyChangeAddress = useRef<boolean>(false);
    const networks = useMemo(() => {
      console.warn("🚀 ~ networks ~ selectedToken:", selectedToken);
      if (!selectedToken) {
        return [];
      }
      const newNetWorks = [selectedToken.network_data];
      const sameNetwork = newNetWorks.find(
        (item) => item?.slug === selectedNetwork?.slug
      );

      if (!sameNetwork) {
        setSelectedNetwork(undefined);
      }

      return newNetWorks;
    }, [selectedToken, selectedNetwork]);

    const clearValues = () => {
      setSelectedToken(undefined);
      setSelectedNetwork(undefined);
      setAmount("");
      setMemo("");
      setRecipientAddress("");
      setSelectedMethod(undefined);
      setSendInfoGet(undefined);
      setAmountError(undefined);
      setAmountErrorMessage(undefined);
      setHiddenError(true);
      setRecipientAddressError(undefined);
      onlyChangeAddress.current = false;
    };

    const handleClearRecipientAddress = () => {
      setRecipientAddress("");
      setRecipientAddressError("The recipient address is required");
    };
    const gotoStep = (step: WithdrawStep) => {
      if (step === WithdrawStep.SELECT_METHOD) {
        clearValues();
      }
      setCurrentStep(step);
      swiperRef.current?.slideTo(step);
    };

    const open = () => {
      drawerRef.current?.open();
    };
    const close = () => {
      drawerRef.current?.close();
      gotoStep(WithdrawStep.SELECT_METHOD);
    };
    useImperativeHandle(ref, () => ({
      open,
      close,
    }));

    const validateAmount = useCallback((): boolean => {
      if (!selectedToken) return false;
      if (+amount < +selectedToken?.min_value) {
        setAmountErrorMessage(AmountError.MIN_LIMIT);
        setAmountError(+(selectedToken?.min_value ?? 0));

        return false;
      }
      if (+amount > +selectedToken?.max_value) {
        setAmountErrorMessage(AmountError.MAX_LIMIT);
        setAmountError(+(selectedToken?.max_value ?? 0));

        return false;
      }
      if (+amount > +selectedToken?.balance) {
        setAmountErrorMessage(AmountError.INSUFFICIENT_BALANCE);

        return false;
      }

      setAmountError(undefined);
      setAmountErrorMessage(undefined);

      return true;
    }, [amount, selectedToken]);

    const handleClearInfoDialogContent = () => {
      setInfoDialogContent(undefined);
    };

    const handleChangeRecipientAddress = (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      setRecipientAddress(e.target.value);
      handleValidateWalletAddress(
        e.target.value,
        selectedNetwork?.slug || "ton"
      );
    };

    const handleChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
      setAmount(e.target.value);
      setHiddenError(false);
    };

    const handleChangeMemo = (e: React.ChangeEvent<HTMLInputElement>) => {
      setMemo(e.target.value);
    };

    const handleClickMaxAmount = () => {
      if (!selectedToken) return;
      const balance = Math.min(
        +selectedToken?.balance,
        +selectedToken?.max_value
      );
      setAmount(balance || "");
    };

    const handleReSelectNetwork = () => {
      gotoStep(WithdrawStep.SELECT_NETWORK);
    };

    const handleOnClose: ReactEventHandler = (e) => {
      gotoStep(WithdrawStep.SELECT_METHOD);
      props.onClose?.(e);
    };
    const findWithdrawToken = (
      contract_address: string
    ): WithdrawCurrency | undefined => {
      return withdrawTokens?.find((item) => item?.address === contract_address);
    };
    const handleSelectTransferInternal = (
      tonTransferParam?: TonTransferUrlParams
    ) => {
      suggestUseTransferInternalDialogRef.current?.close();
      const data = tonTransferParam ?? sendInfoGet;

      setRecipientAddress(data?.address);

      setSelectedMethod(SendMethods.TRANSFER_INTERNAL);
      if (onlyChangeAddress.current) {
        return;
      }
      const tokenSet = findWithdrawToken(data?.jetton || "");
      setAmount(
        getAmountAfterDecimal(data?.amount || 0, tokenSet?.decimal || 0)
      );
      if (!tokenSet) {
        gotoStep(WithdrawStep.SELECT_TOKEN);
      } else {
        setSelectedToken(tokenSet);
        gotoStep(WithdrawStep.FORM);
      }
    };

    const handleSelectContinueTransferExternal = (
      dataPromptly?: TonTransferUrlParams
    ) => {
      const data = dataPromptly ?? sendInfoGet;
      console.warn("🚀 ~ data handleSelectContinueTransferExternal:", data);
      suggestUseTransferInternalDialogRef.current?.close();
      const tokenSet = findWithdrawToken(data?.jetton || "");
      setSelectedMethod(SendMethods.TRANSFER_EXTERNAL);
      setRecipientAddress(data?.address);
      if (onlyChangeAddress.current) {
        return;
      }
      if (!tokenSet) {
        gotoStep(WithdrawStep.SELECT_TOKEN);
      } else {
        setSelectedToken(tokenSet);
        setSelectedNetwork(tokenSet?.network_data);
        gotoStep(WithdrawStep.FORM);
      }
      setAmount(
        getAmountAfterDecimal(data?.amount || 0, tokenSet?.decimal || 0)
      );
      setMemo(data?.text);
    };

    const handleSelectMethod = (method: SendMethods) => {
      console.warn("🚀 ~ handleSelectMethod ~ method:", method);
      setSelectedMethod(method);
      switch (method) {
        case SendMethods.SCAN_QR_CODE:
          setHiddenError(false);
          scannerAllQrCodeRef.current?.open();
          break;
        case SendMethods.TRANSFER_INTERNAL:
          handleSelectTransferInternal();
          break;
        case SendMethods.TRANSFER_EXTERNAL:
          gotoStep(WithdrawStep.SELECT_TOKEN);
          break;
        default:
          break;
      }
    };

    const handleGetEstimateFee = useCallback(async () => {
      if (!selectedToken) return;
      setIsLoadingEstimateFee(true);
      const response = await getEstimateFeeService({
        amount: `${amount}`,
        transaction_type: "withdrawn",
        currency: selectedToken?.slug || "",
      });
      console.warn("🚀 ~ handleGetEstimateFee ~ response:", response);
      setIsLoadingEstimateFee(false);
    }, [amount, selectedToken?.slug]);

    const openScannerAddressQrCode = () => {
      scannerAddressQrCodeRef.current?.open();
    };

    const getAmountAfterDecimal = (
      amount: string | number,
      decimal: number
    ) => {
      if (!amount) return "";
      const amountNumber = +amount / 10 ** decimal;

      return amountNumber || "";
    };

    const handleBack = () => {
      if (
        currentStep === WithdrawStep.FORM &&
        selectedMethod === SendMethods.TRANSFER_INTERNAL
      ) {
        gotoStep(WithdrawStep.SELECT_TOKEN);

        return;
      }
      gotoStep(currentStep - 1);
    };

    const handleSelectToken = (token: WithdrawCurrency) => {
      console.warn("🚀 ~ handleSelectToken ~ token:", token);
      setSelectedToken(token);
      if (!!token) {
        if (selectedMethod === SendMethods.TRANSFER_INTERNAL) {
          gotoStep(WithdrawStep.FORM);
        } else {
          gotoStep(WithdrawStep.SELECT_NETWORK);
        }
      }
    };

    const handleSelectNetwork = (network?: NetworkData) => {
      console.warn("network", selectedNetwork);
      setSelectedNetwork(network);
      gotoStep(WithdrawStep.FORM);
    };

    const handleValidateWalletAddress = async (
      address: string,
      network: string
    ) => {
      setRecipientAddressError(undefined);
      const validateWalletAddress = await validateWalletAddressService({
        address,
        network,
      });
      if (!!validateWalletAddress?.valid) {
        setRecipientAddressError(undefined);
      }
      if (!!validateWalletAddress?.master_wallet_address) {
        suggestUseTransferInternalDialogRef.current?.open();
      } else if (!!validateWalletAddress?.valid) {
        //external
        handleSelectContinueTransferExternal();
        console.warn("external");
      } else {
        // setInfoDialogContent("Unsupported QR");
        setRecipientAddressError("Invalid wallet address");
      }
    };

    const handleScanAllQrCode = async (result: IDetectedBarcode[]) => {
      scannerAllQrCodeRef.current?.close();
      if (result) {
        console.error("result", result);

        const text = result?.[0]?.rawValue;

        const isReceiveInternal = text?.includes("isTekWalletReceiveInternal");

        const tonTransferParam = isReceiveInternal
          ? (JSON.parse(text) as ReceiveInternalParams)
          : parseTonTransferUrl(text);

        backDropRef.current?.open();

        const validateWalletAddress = await validateWalletAddressService({
          address: tonTransferParam?.address,
          network: selectedNetwork?.slug || "ton",
        });
        if (!validateWalletAddress) {
          setInfoDialogContent("Unsupported QR");

          return;
        }

        if (validateWalletAddress?.master_wallet_address) {
          tonTransferParam.address =
            validateWalletAddress?.master_wallet_address;
        }

        setSendInfoGet(tonTransferParam);

        backDropRef.current?.close();

        console.warn("validateWalletAddress", validateWalletAddress);
        // if(validateWalletAddress?.is_current_wallet) {
        //   return

        // }

        if (validateWalletAddress?.is_current_wallet) {
          setInfoDialogContent("You can not send to your own wallet");

          return;
        }

        if (!!validateWalletAddress?.valid) {
          setRecipientAddressError(undefined);
        }

        if (!!validateWalletAddress?.master_wallet_address) {
          if (
            isReceiveInternal ||
            selectedMethod === SendMethods.TRANSFER_INTERNAL
          ) {
            handleSelectTransferInternal(tonTransferParam);
          } else {
            suggestUseTransferInternalDialogRef.current?.open();
          }
        } else if (!!validateWalletAddress?.valid) {
          handleSelectContinueTransferExternal(tonTransferParam);
        } else {
          setInfoDialogContent("Unsupported QR");
          setRecipientAddressError("Invalid wallet address");
        }
      }
    };
    const handleScanAddressQrCode = async (result: IDetectedBarcode[]) => {
      onlyChangeAddress.current = true;
      scannerAddressQrCodeRef.current?.close();
      handleScanAllQrCode(result);
    };

    const handleSendInternal = async () => {
      console.warn("withdraw internal");
      const response = await sendInternalService({
        amount: `${amount}`,
        to_address: recipientAddress || "",
        currency_slug: selectedToken?.slug || "",
        passcode: "111111",
      });
      console.warn("🚀 ~ handleSendInternal ~ response:", response);
    };

    const handleSendExternal = async () => {
      console.warn("withdraw external");
      // const response = await getEstimateFeeService({
      //   amount: `${amount}`,
      //   transaction_type: "withdrawn",
      //   currency: selectedToken?.slug || "",
      // });
      // console.warn("🚀 ~ handleSendExternal ~ response:", response);
    };

    const handleSend = () => {
      switch (selectedMethod) {
        case SendMethods.TRANSFER_INTERNAL:
          handleSendInternal();
          break;
        case SendMethods.TRANSFER_EXTERNAL:
          handleSendExternal();
          break;
        default:
          break;
      }
    };

    useEffect(() => {
      if (isAuthenticated && !withdrawTokens) {
        updateWithdrawToken();
      }
      if (isAuthenticated && !withdrawTokens) {
        updateSendInternalToken();
      }
    }, [isAuthenticated]);

    useEffect(() => {
      validateAmount();
    }, [validateAmount]);

    useEffect(() => {
      handleGetEstimateFee();
    }, [handleGetEstimateFee]);

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
                hideBack={currentStep === WithdrawStep.SELECT_METHOD}
                center={
                  currentStep === WithdrawStep.FORM
                    ? `Send ${selectedToken?.name} ${selectedMethod === SendMethods.TRANSFER_EXTERNAL ? "externally" : "internally"}`
                    : WITHDRAW_STEP_NAME[currentStep]
                }
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
              key={swiperKey}
            >
              <SwiperSlide key={WithdrawStep.SELECT_METHOD}>
                <Box
                  sx={{
                    ...theme.mixins.column,
                    height: "fit-content",
                  }}
                >
                  {Object.values(SendMethods).map((item, index) => {
                    return (
                      <Fragment key={item}>
                        {index !== 0 && <Divider />}
                        <ListItemCustom
                          title={item}
                          description={item}
                          icon={getIcon(item + "_icon")}
                          onClick={() =>
                            handleSelectMethod(item as SendMethods)
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
              <SwiperSlide key={WithdrawStep.SELECT_TOKEN}>
                <Box
                  sx={{
                    ...theme.mixins.column,
                    gap: theme.mixins.gaps.g12,
                    height: "fit-content",
                  }}
                >
                  {withdrawTokens?.map((item) => {
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
              <SwiperSlide key={WithdrawStep.SELECT_NETWORK}>
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
              <SwiperSlide key={WithdrawStep.FORM}>
                <Box
                  sx={{
                    ...theme.mixins.column,
                    gap: theme.mixins.gaps.g16,
                  }}
                >
                  <Box
                    sx={{ ...theme.mixins.column, gap: theme.mixins.gaps.g8 }}
                  >
                    <Text sx={{ ...theme.mixins.fieldTitle }}>
                      Recipient address
                    </Text>
                    <Input
                      sx={{
                        paddingRight: theme.mixins.customPadding.p12,
                      }}
                      inputRest={{
                        placeholder: "Enter recipient address",
                        value: recipientAddress,
                        onChange: handleChangeRecipientAddress,
                      }}
                      rightPart={
                        <Box
                          sx={{
                            ...theme.mixins.row,
                            gap: theme.mixins.gaps.g8,
                          }}
                        >
                          {!!recipientAddress && (
                            <Button.Secondary
                              sx={{
                                ...theme.mixins.smallButton,
                                color: theme.palette.text.warningStatus,
                              }}
                              onClick={handleClearRecipientAddress}
                            >
                              Clear
                            </Button.Secondary>
                          )}
                          {!recipientAddress && (
                            <Button.Secondary
                              sx={{ ...theme.mixins.smallButton }}
                            >
                              Paste
                            </Button.Secondary>
                          )}
                          <Divider
                            orientation="vertical"
                            variant="middle"
                            flexItem
                          />
                          <Icon
                            src={getIcon("qr_scan")}
                            width={20}
                            onClick={openScannerAddressQrCode}
                          />
                        </Box>
                      }
                    />
                    {!!recipientAddressError && (
                      <Text sx={{ ...theme.mixins.validationError }}>
                        {recipientAddressError}
                      </Text>
                    )}
                  </Box>
                  {selectedMethod === SendMethods.TRANSFER_EXTERNAL && (
                    <Box sx={{ ...theme.mixins.row }}>
                      <Text sx={{ ...theme.mixins.fieldTitle }}>Network</Text>

                      <Box
                        onClick={handleReSelectNetwork}
                        sx={{
                          ...theme.mixins.row,
                          gap: theme.mixins.gaps.g6,
                          ml: "auto",
                          cursor: "pointer",
                        }}
                      >
                        <Icon width={20} src={selectedNetwork?.icon} />
                        <Text sx={{ ...theme.mixins.value }}>
                          {selectedNetwork?.name}
                        </Text>
                        <Icon width={10} src={getIcon("right_arrow")} />
                      </Box>
                    </Box>
                  )}
                  <Box
                    sx={{ ...theme.mixins.column, gap: theme.mixins.gaps.g8 }}
                  >
                    <Text sx={{ ...theme.mixins.fieldTitle }}>Amount</Text>
                    <Input
                      sx={{
                        paddingRight: theme.mixins.customPadding.p12,
                      }}
                      inputRest={{
                        placeholder: `${selectedToken?.min_value} - ${selectedToken?.max_value} ${selectedToken?.name}`,
                        value: amount,
                        onChange: handleChangeAmount,
                        type: "text",
                        inputMode: "decimal",
                      }}
                      rightPart={
                        <Button.Secondary
                          onClick={handleClickMaxAmount}
                          sx={{ ...theme.mixins.smallButton }}
                        >
                          Max
                        </Button.Secondary>
                      }
                    />
                    {!!amountError && !hiddenError && (
                      <Text sx={{ ...theme.mixins.validationError }}>
                        {amountErrorMessage}{" "}
                        <Formatter
                          value={amountError}
                          unit={` ${selectedToken?.name}`}
                        />
                      </Text>
                    )}
                    <Text
                      sx={{
                        ...theme.mixins.value,
                      }}
                    >
                      Your balance is{" "}
                      <Text
                        sx={{
                          fontWeight: theme.typography.fontWeight600,
                          color: theme.palette.text.secondary,
                        }}
                      >
                        <Formatter
                          value={selectedToken?.balance}
                          unit={` ${selectedToken?.name}`}
                        />
                      </Text>
                    </Text>
                  </Box>
                  {selectedMethod === SendMethods.TRANSFER_EXTERNAL && (
                    <Box
                      sx={{ ...theme.mixins.column, gap: theme.mixins.gaps.g8 }}
                    >
                      <Text sx={{ ...theme.mixins.fieldTitle }}>Memo</Text>
                      <Input
                        inputRest={{
                          placeholder: "Enter memo",
                          value: memo,
                          onChange: handleChangeMemo,
                        }}
                      />
                    </Box>
                  )}

                  <Fees />

                  <Button.Primary
                    sx={{ width: "100%" }}
                    onClick={handleSend}
                    status={
                      !!amountError ||
                      !recipientAddress ||
                      !amount ||
                      !selectedToken ||
                      !!recipientAddressError ||
                      isLoadingEstimateFee
                        ? BUTTON_STATUS.DISABLED
                        : BUTTON_STATUS.ENABLED
                    }
                  >
                    Continue
                  </Button.Primary>
                </Box>
              </SwiperSlide>
            </SwiperControlled>
            <QrCodeReader
              ref={scannerAllQrCodeRef}
              onResult={handleScanAllQrCode}
            />
            <QrCodeReader
              ref={scannerAddressQrCodeRef}
              onResult={handleScanAddressQrCode}
            />
            <AppBackDrop ref={backDropRef} />
            <AppDialog overrideOpen={!!infoDialogContent}>
              <DialogContentLayout
                content={
                  <Text
                    sx={{
                      textAlign: "center",
                      display: "inline-block",
                      width: "100%",
                    }}
                  >
                    {infoDialogContent}
                  </Text>
                }
                actions={
                  <Text
                    sx={{
                      ...theme.mixins.dialogActionsOk,
                      width: "100%",
                      display: "inline-block",
                    }}
                    onClick={handleClearInfoDialogContent}
                  >
                    Ok
                  </Text>
                }
              />
            </AppDialog>
            <AppDialog ref={suggestUseTransferInternalDialogRef}>
              <DialogContentLayout
                content={
                  "This wallet is supported send internally, use it for faster transaction?"
                }
                actions={
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "1fr auto 1fr",
                      gap: theme.mixins.gaps.g8,
                    }}
                  >
                    <Text
                      sx={{
                        ...theme.mixins.dialogActionsCancel,
                        width: "100%",
                      }}
                      onClick={() => handleSelectContinueTransferExternal()}
                    >
                      Keep continue
                    </Text>
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <Text
                      sx={{ ...theme.mixins.dialogActionsOk, width: "100%" }}
                      onClick={() => handleSelectTransferInternal()}
                    >
                      Ok
                    </Text>
                  </Box>
                }
              />
            </AppDialog>
          </ModalLayout>
        </DrawerComponent>
      </RequireConnect>
    );
  }
);

WithdrawFunction.displayName = "WithdrawFunction";

export default WithdrawFunction;
