"use client";
import {
  forwardRef,
  Fragment,
  ReactEventHandler,
  ReactNode,
  useCallback,
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
import parseTonTransferUrl, { TonTransferUrlParams } from "../../../utils/parseTonTransferUrl";
import AppBackDrop, { AppBackDropRef } from "../AppBackDrop";
import DialogContentLayout from "../DialogContentLayout";
import AppDialog, { AppDialogRef } from "../AppDialog";
import Formatter from "../Formatter";
import sendInternalService from "../../../services/axios/send-internal-service";
import getEstimateFeeService from "../../../services/axios/get-est-fee-service";
import Fees from "../Fees";
import { ReceiveInternalParams } from "../ReceiveFunction";
import { FeesDataType } from "../../../services/axios/get-est-fee-service/type";
import ConfirmLayout from "../ConfirmLayout";
import { ActionConfirm } from "../ConfirmLayout/type";
import ConfirmByPasscode from "../ConfirmByPasscode";
import LineValue from "../LineValue";
import sendExternalService from "../../../services/axios/send-external-service";
import { TransactionSlug } from "../../../services/axios/get-activities-service/type";
import SendExternalToken from "../SendExternalToken";
interface WithdrawFunctionProps extends GeneralProps {
  onClose?: ReactEventHandler;
  onOpen?: ReactEventHandler;
  onSendSuccess?: (response: any) => void;
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

const WithdrawFunction = forwardRef<WithdrawFunctionRef, WithdrawFunctionProps>((props, ref) => {
  const drawerRef = useRef<DrawerComponentRef>(null);
  const swiperRef = useRef<SwiperControlledRef>(null);
  const confirmLayoutDrawerRef = useRef<DrawerComponentRef>(null);
  const theme = useTheme();
  const [currentStep, setCurrentStep] = useState<WithdrawStep>(WithdrawStep.SELECT_METHOD);
  const [selectedToken, setSelectedToken] = useState<WithdrawCurrency | undefined>();
  const [selectedNetwork, setSelectedNetwork] = useState<NetworkData>();
  const { isAuthenticated } = useWalletData();
  const { withdrawTokens, updateWithdrawToken, updateSendInternalToken, sendInternalTokens } = useWithdrawData();
  const [infoDialogContent, setInfoDialogContent] = useState<ReactNode>();
  const [amount, setAmount] = useState<number | string>("");
  const [memo, setMemo] = useState<string | undefined>(undefined);
  const [recipientAddress, setRecipientAddress] = useState<string | undefined>(undefined);
  const [amountErrorMessage, setAmountErrorMessage] = useState<AmountError | undefined>();

  const [hiddenError, setHiddenError] = useState<boolean>(true);
  const [amountError, setAmountError] = useState<number>();
  const scannerAllQrCodeRef = useRef<QrCodeReaderRef>(null);
  const scannerAddressQrCodeRef = useRef<QrCodeReaderRef>(null);
  const backDropRef = useRef<AppBackDropRef>(null);
  const suggestUseTransferInternalDialogRef = useRef<AppDialogRef>(null);
  const suggestUseTransferExternalDialogRef = useRef<AppDialogRef>(null);
  const [selectedMethod, setSelectedMethod] = useState<SendMethods>();
  const [sendInfoGet, setSendInfoGet] = useState<TonTransferUrlParams>();
  const [isLoadingEstimateFee, setIsLoadingEstimateFee] = useState<boolean>(false);
  const [isValidatingAddress, setIsValidatingAddress] = useState<boolean>(false);
  const [estimateFee, setEstimateFee] = useState<FeesDataType>();
  const [recipientAddressError, setRecipientAddressError] = useState<string>();
  const onlyChangeAddress = useRef<boolean>(false);
  const [sendButtonStatus, setSendButtonStatus] = useState<BUTTON_STATUS>(BUTTON_STATUS.ENABLED);
  const withdrawToken = useMemo(() => {
    return selectedMethod === SendMethods.TRANSFER_EXTERNAL ? withdrawTokens : sendInternalTokens;
  }, [withdrawTokens, sendInternalTokens, selectedMethod]);
  const networks = useMemo(() => {
    console.warn("🚀 ~ networks ~ selectedToken:", selectedToken);
    if (!selectedToken) {
      return [];
    }

    const newNetWorks = [selectedToken.network_data];
    const sameNetwork = newNetWorks.find((item) => item?.slug === selectedNetwork?.slug);

    if (!sameNetwork) {
      setSelectedNetwork(undefined);
    }

    return newNetWorks;
  }, [selectedToken, selectedNetwork]);

  const estimateReceive = useMemo(() => {
    if (!estimateFee || !amount) return undefined;

    return +amount - +estimateFee?.feeInCurrency;
  }, [estimateFee, amount]);

  useEffect(() => {
    setTimeout(() => {
      swiperRef.current?.update();
    }, 50);
  }, [estimateFee, amountError, recipientAddressError]);

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

  const handleChangeRecipientAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecipientAddress(e.target.value);
    handleValidateWalletAddress(e.target.value, selectedNetwork?.slug || "ton");
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
    const balance = Math.min(+selectedToken?.balance, +selectedToken?.max_value);
    setAmount(balance || "");
  };

  const handleReSelectNetwork = () => {
    gotoStep(WithdrawStep.SELECT_NETWORK);
  };

  const handleOnClose: ReactEventHandler = (e) => {
    gotoStep(WithdrawStep.SELECT_METHOD);
    props.onClose?.(e);
  };
  const findWithdrawToken = (contract_address: string): WithdrawCurrency | undefined => {
    return withdrawToken?.find((item) => item?.address === contract_address);
  };
  const handleSelectTransferInternal = (tonTransferParam?: TonTransferUrlParams) => {
    suggestUseTransferInternalDialogRef.current?.close();
    const data = tonTransferParam ?? sendInfoGet;

    setRecipientAddress(data?.address);

    setSelectedMethod(SendMethods.TRANSFER_INTERNAL);
    if (onlyChangeAddress.current) {
      return;
    }
    const tokenSet = findWithdrawToken(data?.jetton || "");
    setAmount(getAmountAfterDecimal(data?.amount || 0, tokenSet?.decimal || 0));
    if (!tokenSet) {
      gotoStep(WithdrawStep.SELECT_TOKEN);
    } else {
      setSelectedToken(tokenSet);
      gotoStep(WithdrawStep.FORM);
    }
  };

  const handleSelectContinueTransferExternal = (dataPromptly?: TonTransferUrlParams) => {
    const data = dataPromptly ?? sendInfoGet;
    console.warn("🚀 ~ data handleSelectContinueTransferExternal:", data);
    suggestUseTransferInternalDialogRef.current?.close();
    setSelectedMethod(SendMethods.TRANSFER_EXTERNAL);
    !!data?.address && setRecipientAddress(data?.address);
    if (onlyChangeAddress.current) {
      return;
    }
    const tokenSet = data?.jetton ? findWithdrawToken(data?.jetton || "") : selectedToken;
    if (!tokenSet) {
      gotoStep(WithdrawStep.SELECT_TOKEN);
    } else {
      setSelectedToken(tokenSet);
      setSelectedNetwork(tokenSet?.network_data);
      gotoStep(WithdrawStep.FORM);
    }
    !!data?.amount && setAmount(getAmountAfterDecimal(data?.amount || 0, tokenSet?.decimal || 0));
    !!data?.text && setMemo(data?.text);
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

  const getEstimateFee = useCallback(async () => {
    if (!selectedToken || !!amountError) return;
    setIsLoadingEstimateFee(true);
    const response = await getEstimateFeeService({
      amount: `${amount}`,
      transaction_type:
        selectedMethod === SendMethods.TRANSFER_EXTERNAL ? TransactionSlug.Withdrawn : TransactionSlug.TransferInternal,
      currency: selectedToken?.slug || "",
    });
    console.warn("🚀 ~ handleGetEstimateFee ~ response:", response);
    setIsLoadingEstimateFee(false);
    setEstimateFee(response?.data);
  }, [amount, selectedToken, amountError, selectedMethod]);

  const openScannerAddressQrCode = () => {
    scannerAddressQrCodeRef.current?.open();
  };

  const getAmountAfterDecimal = (amount: string | number, decimal: number) => {
    if (!amount) return "";
    const amountNumber = +amount / 10 ** decimal;

    return amountNumber || "";
  };

  const handleBack = () => {
    if (currentStep === WithdrawStep.FORM && selectedMethod === SendMethods.TRANSFER_INTERNAL) {
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

  const handleValidateWalletAddress = async (address: string, network: string) => {
    setIsValidatingAddress(true);
    const validateWalletAddress = await validateWalletAddressService({
      address,
      network,
    });
    setIsValidatingAddress(false);
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
        tonTransferParam.address = validateWalletAddress?.master_wallet_address;
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
        if (isReceiveInternal || selectedMethod === SendMethods.TRANSFER_INTERNAL) {
          handleSelectTransferInternal(tonTransferParam);
        } else {
          suggestUseTransferInternalDialogRef.current?.open();
        }
      } else if (!!validateWalletAddress?.valid) {
        if (selectedMethod === SendMethods.TRANSFER_EXTERNAL || selectedMethod === SendMethods.SCAN_QR_CODE) {
          handleSelectContinueTransferExternal(tonTransferParam);
        } else {
          suggestUseTransferExternalDialogRef.current?.open();
        }
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

  const handleSendInternal = async (passcode: string) => {
    try {
      console.warn("withdraw internal");
      setSendButtonStatus(BUTTON_STATUS.LOADING);
      const response = await sendInternalService({
        amount: `${amount}`,
        to_address: recipientAddress || "",
        currency_slug: selectedToken?.slug || "",
        passcode,
      });
      console.warn("🚀 ~ handleSendInternal ~ response:", response);
      if (response.success) {
        close();
        confirmLayoutDrawerRef.current?.close();
        setSendButtonStatus(BUTTON_STATUS.ENABLED);
        props.onSendSuccess?.(response);
      } else {
        throw new Error("Send internal failed");
      }
    } catch (err) {
      console.error(err);
      setSendButtonStatus(BUTTON_STATUS.ERROR);
      setTimeout(() => {
        setSendButtonStatus(BUTTON_STATUS.ENABLED);
      }, 1200);
    }
  };

  const handleSendExternal = async (passcode: string) => {
    try {
      console.warn("withdraw external");
      setSendButtonStatus(BUTTON_STATUS.LOADING);
      const response = await sendExternalService({
        amount: `${amount}`,
        to_address: recipientAddress || "",
        currency_slug: selectedToken?.slug || "",
        passcode,
        network: selectedNetwork?.slug || "",
        memo: memo || "",
      });
      console.warn("🚀 ~ handleSendExternal ~ response:", response);

      if (response.success) {
        close();
        confirmLayoutDrawerRef.current?.close();
        setSendButtonStatus(BUTTON_STATUS.ENABLED);
        props.onSendSuccess?.(response);
      } else {
        throw new Error("Send external failed");
      }
    } catch (err) {
      console.error(err);
      setSendButtonStatus(BUTTON_STATUS.ERROR);
      setTimeout(() => {
        setSendButtonStatus(BUTTON_STATUS.ENABLED);
      }, 1200);
    }
  };

  const handleSend = (passcode: string) => {
    switch (selectedMethod) {
      case SendMethods.TRANSFER_INTERNAL:
        handleSendInternal(passcode);
        break;
      case SendMethods.TRANSFER_EXTERNAL:
        handleSendExternal(passcode);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (isAuthenticated && !withdrawTokens) {
      updateWithdrawToken();
    }
    if (isAuthenticated && !sendInternalTokens) {
      updateSendInternalToken();
    }
  }, [isAuthenticated, withdrawTokens, sendInternalTokens]);

  useEffect(() => {
    validateAmount();
  }, [validateAmount]);

  useEffect(() => {
    getEstimateFee();
  }, [getEstimateFee]);

  return (
    <RequireConnect>
      <DrawerComponent ref={drawerRef} trigger={props.children} onOpen={props.onOpen} onClose={handleOnClose}>
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
                        onClick={() => handleSelectMethod(item as SendMethods)}
                        sx={{
                          py: theme.mixins.customPadding.p12,
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
                {withdrawToken?.map((item) => {
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
                <Box sx={{ ...theme.mixins.column, gap: theme.mixins.gaps.g8 }}>
                  <Text sx={{ ...theme.mixins.fieldTitle }}>Recipient address</Text>
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
                          <Button.Secondary sx={{ ...theme.mixins.smallButton }}>Paste</Button.Secondary>
                        )}
                        <Divider orientation="vertical" variant="middle" flexItem />
                        <Icon src={getIcon("qr_scan")} width={20} onClick={openScannerAddressQrCode} />
                      </Box>
                    }
                  />
                  {!!recipientAddressError && (
                    <Text sx={{ ...theme.mixins.validationError }}>{recipientAddressError}</Text>
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
                      <Text sx={{ ...theme.mixins.value }}>{selectedNetwork?.name}</Text>
                      <Icon width={10} src={getIcon("right_arrow")} />
                    </Box>
                  </Box>
                )}
                <Box sx={{ ...theme.mixins.column, gap: theme.mixins.gaps.g8 }}>
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
                      <Button.Secondary onClick={handleClickMaxAmount} sx={{ ...theme.mixins.smallButton }}>
                        Max
                      </Button.Secondary>
                    }
                  />
                  {!!amountError && !hiddenError && (
                    <Text sx={{ ...theme.mixins.validationError }}>
                      {amountErrorMessage} <Formatter value={amountError} unit={` ${selectedToken?.name}`} />
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
                      <Formatter value={selectedToken?.balance} unit={` ${selectedToken?.name}`} />
                    </Text>
                  </Text>
                </Box>
                {selectedMethod === SendMethods.TRANSFER_EXTERNAL && (
                  <Box sx={{ ...theme.mixins.column, gap: theme.mixins.gaps.g8 }}>
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

                {!!estimateFee?.feeDetail?.length && !!amount && (
                  <Fees feesData={JSON.stringify(estimateFee)} amount={+amount} />
                )}

                {estimateReceive !== undefined && !amountError && (
                  <Box sx={{ ...theme.mixins.row }}>
                    <Text sx={{ ...theme.mixins.fieldTitle }}>Receive amount estimated</Text>

                    <Text sx={{ ...theme.mixins.value, ml: "auto" }}>
                      <Formatter value={estimateReceive} />
                    </Text>
                  </Box>
                )}
                <SendExternalToken
                  initFeeData={estimateFee}
                  sendExternalData={{
                    amount: `${amount}`,
                    currency_slug: selectedToken?.slug || "",
                    to_address: recipientAddress || "",
                    network: selectedNetwork as NetworkData,
                    memo: memo || "",
                  }}
                >
                  <Button.Primary>Send externally</Button.Primary>
                </SendExternalToken>
                <ConfirmLayout
                  ref={confirmLayoutDrawerRef}
                  action={ActionConfirm.SEND}
                  trigger={
                    <Button.Primary
                      sx={{ width: "100%" }}
                      status={
                        !!amountError ||
                        !!recipientAddressError ||
                        !recipientAddress ||
                        !amount ||
                        !selectedToken ||
                        isLoadingEstimateFee ||
                        isValidatingAddress
                          ? BUTTON_STATUS.DISABLED
                          : BUTTON_STATUS.ENABLED
                      }
                    >
                      Continue
                    </Button.Primary>
                  }
                >
                  <Box
                    sx={{
                      ...theme.mixins.column,
                      gap: theme.mixins.gaps.g12,
                    }}
                  >
                    <Box
                      sx={{
                        ...theme.mixins.paper,
                      }}
                    >
                      <LineValue
                        field="Recipient address"
                        value={
                          <Text
                            sx={{
                              wordBreak: "break-all",
                            }}
                          >
                            {recipientAddress}
                          </Text>
                        }
                      />
                      {selectedMethod === SendMethods.TRANSFER_EXTERNAL && (
                        <LineValue
                          field="Network"
                          value={
                            <Box
                              sx={{
                                ...theme.mixins.row,
                                gap: theme.mixins.gaps.g6,
                                ml: "auto",
                              }}
                            >
                              <Icon width={20} src={selectedNetwork?.icon} />
                              <Text sx={{ ...theme.mixins.value }}>{selectedNetwork?.name}</Text>
                            </Box>
                          }
                        />
                      )}

                      <LineValue field="Amount" value={<Formatter value={amount} unit={` ${selectedToken?.name}`} />} />
                      {!!memo && selectedMethod === SendMethods.TRANSFER_EXTERNAL && (
                        <LineValue field="Memo" value={memo} />
                      )}
                      {!!estimateFee?.feeDetail?.length && !!amount && (
                        <Fees feesData={JSON.stringify(estimateFee)} amount={+amount} />
                      )}
                      <LineValue
                        field="Receive amount estimated"
                        value={
                          <Text
                            sx={{
                              fontWeight: theme.typography.fontWeight600,
                              fontSize: theme.typography.fontSize16,
                            }}
                          >
                            <Formatter value={estimateReceive} unit={` ${selectedToken?.name}`} />
                          </Text>
                        }
                      />
                    </Box>

                    <ConfirmByPasscode action={ActionConfirm.SEND} onConfirmSuccess={handleSend}>
                      <Button.Primary status={sendButtonStatus} sx={{ width: "100%" }}>
                        Confirm
                      </Button.Primary>
                    </ConfirmByPasscode>
                  </Box>
                </ConfirmLayout>
              </Box>
            </SwiperSlide>
          </SwiperControlled>
          <QrCodeReader ref={scannerAllQrCodeRef} onResult={handleScanAllQrCode} />
          <QrCodeReader ref={scannerAddressQrCodeRef} onResult={handleScanAddressQrCode} />
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
              content={"This wallet is supported send internally, use it for faster transaction?"}
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
          <AppDialog ref={suggestUseTransferExternalDialogRef}>
            <DialogContentLayout
              content={"This wallet only support send externally, move to this method?"}
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
                    onClick={() => suggestUseTransferExternalDialogRef.current?.close()}
                  >
                    Cancel
                  </Text>
                  <Divider orientation="vertical" variant="middle" flexItem />
                  <Text
                    sx={{ ...theme.mixins.dialogActionsOk, width: "100%" }}
                    onClick={() => {
                      handleSelectContinueTransferExternal();
                      suggestUseTransferExternalDialogRef.current?.close();
                    }}
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
});

WithdrawFunction.displayName = "WithdrawFunction";

export default WithdrawFunction;
