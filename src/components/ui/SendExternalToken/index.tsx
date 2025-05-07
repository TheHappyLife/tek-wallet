// "use client";
// import { Box, useTheme } from "@mui/material";
// import Button, { BUTTON_STATUS } from "../../ui/Button";
// import { DrawerComponentRef } from "../DrawerComponent";
// import ConfirmLayout, { ConfirmLayoutProps } from "../ConfirmLayout";
// import { ActionConfirm } from "../ConfirmLayout/type";
// import LineValue from "../LineValue";
// import Formatter from "../Formatter";
// import ConfirmByPasscode from "../ConfirmByPasscode";
// import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
// import Text from "../Text";
// import { LockCurrency } from "../../../services/axios/get-lock-tokens-list-service/type";
// import RequireConnect from "../RequireConnect";
// import useWalletData from "../../../hooks/useWalletData";
// import { SendExternalBody, SendExternalResponse } from "../../../services/axios/send-external-service/type";
// import useWithdrawData from "../../../hooks/useWithdrawData";
// import sendExternalService from "../../../services/axios/send-external-service";
// import Icon from "../Icon";
// import Fees from "../Fees";
// import { FeesDataType } from "../../../services/axios/get-est-fee-service/type";
// interface SendExternalTokenProps extends Omit<ConfirmLayoutProps, "action"> {
//   sendExternalData: SendExternalBody;
//   onSuccess?: (data: SendExternalResponse) => any;
// }

// export interface SendExternalTokenRef {
//   open: () => void;
//   close: () => void;
// }

// export enum SendExternalTokenError {
//   TOKEN_NOT_FOUND = "Token not found",
//   NOT_ENOUGH_BALANCE = "Not enough balance",
//   MAX_AMOUNT = "Max amount",
//   MIN_AMOUNT = "Min amount",
//   FAILED = "Failed",
// }

// const SendExternalToken = forwardRef<SendExternalTokenRef, SendExternalTokenProps>((props, ref) => {
//   const theme = useTheme();
//   const { withdrawTokens } = useWithdrawData();
//   const { isAuthenticated } = useWalletData();
//   const confirmLayoutDrawerRef = useRef<DrawerComponentRef>(null);
//   const [token, setToken] = useState<LockCurrency | undefined>(undefined);
//   const [error, setError] = useState<SendExternalTokenError | undefined>(undefined);
//   const [errorAmount, setErrorAmount] = useState<string | number | undefined>(undefined);
//   const [buttonStatus, setButtonStatus] = useState<BUTTON_STATUS>(BUTTON_STATUS.ENABLED);
//   const [estimateFee, setEstimateFee] = useState<FeesDataType>();

//   const amount = props.sendExternalData.amount;
//   const network = props.sendExternalData.network;
//   const memo = props.sendExternalData.memo;
//   const toAddress = props.sendExternalData.to_address;

//   const validateAmount = useCallback(
//     (sendExternalData: SendExternalBody) => {
//       const token = withdrawTokens?.find((token) => token.slug === sendExternalData.currency_slug);
//       console.warn("🚀 ~ validateAmount ~ lockData:", sendExternalData, withdrawTokens, token);
//       setToken(token);
//       if (!token) {
//         setError(SendExternalTokenError.TOKEN_NOT_FOUND);

//         return;
//       }
//       if (+sendExternalData.amount > token.max_value) {
//         setError(SendExternalTokenError.MAX_AMOUNT);
//         setErrorAmount(token.max_value);

//         return;
//       }
//       if (+sendExternalData.amount < token.min_value) {
//         setError(SendExternalTokenError.MIN_AMOUNT);
//         setErrorAmount(token.min_value);

//         return;
//       }

//       if (+sendExternalData.amount > +token.balance) {
//         setError(SendExternalTokenError.NOT_ENOUGH_BALANCE);
//         setErrorAmount(token.balance);

//         return;
//       }

//       setError(undefined);
//       setErrorAmount(undefined);
//     },
//     [withdrawTokens]
//   );

//   const handleSendExternalToken = async (passcode: string) => {
//     try {
//       console.warn("🚀 ~ handleSendExternalToken ~ sendExternalData:", props.sendExternalData, passcode);

//       setButtonStatus(BUTTON_STATUS.LOADING);
//       const response = await sendExternalService(props.sendExternalData);
//       console.warn("🚀 ~ handleSendExternalToken ~ response:", response);
//       if (response.success) {
//         confirmLayoutDrawerRef.current?.close();
//         setButtonStatus(BUTTON_STATUS.ENABLED);
//         props.onSuccess?.(response);
//       } else {
//         throw new Error("Send external failed");
//       }
//     } catch (err) {
//       console.error(err);
//       setButtonStatus(BUTTON_STATUS.ERROR);
//       setTimeout(() => {
//         setButtonStatus(BUTTON_STATUS.ENABLED);
//       }, 1200);
//     }
//   };

//   const handleOpen = () => {
//     if (!isAuthenticated) throw new Error("Please connect your wallet");
//     confirmLayoutDrawerRef.current?.open();
//   };

//   const handleClose = () => {
//     if (!isAuthenticated) throw new Error("Please connect your wallet");
//     confirmLayoutDrawerRef.current?.close();
//   };

//   useImperativeHandle(ref, () => ({
//     open: handleOpen,
//     close: handleClose,
//   }));

//   useEffect(() => {
//     validateAmount(props.sendExternalData);
//   }, [validateAmount, props.sendExternalData]);

//   return (
//     <RequireConnect>
//       <ConfirmLayout ref={confirmLayoutDrawerRef} action={ActionConfirm.LOCK} trigger={props.children}>
//         <Box sx={{ ...theme.mixins.column, gap: theme.mixins.gaps.g12 }}>
//           <Box
//             sx={{
//               ...theme.mixins.paper,
//             }}
//           >
//             <LineValue
//               field="Recipient address"
//               value={
//                 <Text
//                   sx={{
//                     wordBreak: "break-all",
//                   }}
//                 >
//                   {toAddress}
//                 </Text>
//               }
//             />

//             <LineValue
//               field="Network"
//               value={
//                 <Box
//                   sx={{
//                     ...theme.mixins.row,
//                     gap: theme.mixins.gaps.g6,
//                     ml: "auto",
//                   }}
//                 >
//                   {/* <Icon width={20} src={props.sendExternalData.network?.icon} /> */}
//                   <Text sx={{ ...theme.mixins.value }}>{props.sendExternalData.network}</Text>
//                 </Box>
//               }
//             />

//             <LineValue field="Amount" value={<Formatter value={amount} unit={` ${token?.name}`} />} />
//             {!!memo && <LineValue field="Memo" value={memo} />}
//             {estimateFee?.feeDetail?.length && !!amount && (
//               <Fees feesData={JSON.stringify(estimateFee)} amount={+amount} />
//             )}
//             <LineValue
//               field="Receive amount estimated"
//               value={
//                 <Text
//                   sx={{
//                     fontWeight: theme.typography.fontWeight600,
//                     fontSize: theme.typography.fontSize16,
//                   }}
//                 >
//                   <Formatter value={estimateReceive} unit={` ${selectedToken?.name}`} />
//                 </Text>
//               }
//             />
//           </Box>
//           <ConfirmByPasscode action={ActionConfirm.LOCK} onConfirmSuccess={handleSendExternalToken}>
//             <Button.Primary status={!!error ? BUTTON_STATUS.DISABLED : buttonStatus} sx={{ width: "100%" }}>
//               Confirm
//             </Button.Primary>
//           </ConfirmByPasscode>
//         </Box>
//       </ConfirmLayout>
//     </RequireConnect>
//   );
// });
// SendExternalToken.displayName = "SendExternalToken";
// export default SendExternalToken;
