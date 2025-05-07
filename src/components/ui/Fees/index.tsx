import { Accordion, AccordionDetails, AccordionProps, AccordionSummary, Box, useTheme } from "@mui/material";
import Icon from "../Icon";
import getIcon from "../../../utils/getIcon";
import Text from "../Text";
import Formatter from "../Formatter";
import { Fragment } from "react/jsx-runtime";
import { FeeDetailType, FeesDataType } from "../../../services/axios/get-est-fee-service/type";
import parsePropsData from "../../../utils/parsePropsData";
import useWalletData from "../../../hooks/useWalletData";
import { useMemo } from "react";
import ReceiveFunction from "../ReceiveFunction";
export interface FeesProps extends Omit<AccordionProps, "children"> {
  feesData: string;
  amount: number;
  // currency: string;
  onEnoughBalanceToPayFee?: () => void;
  onNotEnoughBalanceToPayFee?: () => void;
}

function Fees(props: FeesProps) {
  const { sx, amount, ...rest } = props;
  const theme = useTheme();
  const feesData = parsePropsData<FeesDataType>(props?.feesData);
  const { tokens } = useWalletData();
  const tokensFee: FeeDetailType[] = useMemo(() => {
    const result: FeeDetailType[] = [];

    feesData?.feeDetail?.forEach((fee) => {
      const index = result?.findIndex((feeDetail) => feeDetail.currency?.slug === fee?.currency?.slug);
      if (index === -1) {
        result.push(fee);
      } else {
        const rate = fee.feeInUSD / fee.feeInCurrency;
        result[index].feeFixed += fee.feeFixed;
        result[index].feeInCurrency += fee.feeInCurrency;
        result[index].feeInUSD += fee.feeInUSD;
        result[index].feePercent += fee.feePercent;
        result[index].feePercentInCurrency = (result[index].feeInCurrency ?? 0) + amount * (fee.feePercent / 100);
        result[index].feePercentInUSD = (result[index].feeInUSD ?? 0) + amount * (fee.feePercent / 100) * rate;
        const totalFeeInCurrency = (result[index].feeInCurrency ?? 0) + (result[index].feePercentInCurrency ?? 0);
        const token = tokens?.find((token) => token.currency_slug === fee?.currency?.slug);
        result[index].isEnoughBalanceToPay = +(token?.current_value ?? 0) >= totalFeeInCurrency;
      }
    });

    return result;
  }, [tokens, feesData?.feeDetail, amount]);

  const feeCheckedBalance: FeeDetailType[] = useMemo(() => {
    return (
      feesData?.feeDetail?.map((fee) => {
        const theFee = tokensFee?.find((feeDetail) => feeDetail.currency?.slug === fee?.currency?.slug);

        return {
          ...fee,
          isEnoughBalanceToPay: theFee?.isEnoughBalanceToPay,
        };
      }) ?? []
    );
  }, [tokensFee, feesData?.feeDetail]);
  const isEnoughBalanceToPayFee = useMemo(() => {
    return feeCheckedBalance?.some((fee) => !fee.isEnoughBalanceToPay);
  }, [feeCheckedBalance]);

  const totalFeeInUSD = useMemo(() => {
    return tokensFee?.reduce((acc, fee) => acc + (fee.feeInUSD ?? 0) + (fee.feePercentInUSD ?? 0), 0);
  }, [tokensFee]);

  return (
    <Accordion
      defaultExpanded
      {...rest}
      sx={{
        "&.MuiAccordion-root": {
          backgroundColor: "transparent",
          margin: 0,
          borderRadius: theme.mixins.customRadius.r12,
        },
        "&.MuiAccordion-root::before": {
          display: "none",
        },
        "& .MuiAccordionSummary-root": {
          paddingLeft: theme.mixins.customPadding.p12,
          paddingRight: theme.mixins.customPadding.p12,
        },
        "& .MuiAccordionSummary-content": {
          display: "inline-block",
          width: "100%",
        },
        "& .MuiAccordionSummary-content.Mui-expanded": {
          marginTop: theme.mixins.customMargin.m12,
          marginBottom: theme.mixins.customMargin.m12,
        },
        "& .MuiAccordionDetails-root": {
          paddingLeft: theme.mixins.customPadding.p12,
          paddingRight: theme.mixins.customPadding.p12,
        },
        ...sx,
      }}
    >
      <AccordionSummary expandIcon={<Icon src={getIcon("arrow_down")} width={20} />}>
        <Box sx={{ ...theme.mixins.row, width: "100%" }}>
          <Text sx={{ ...theme.mixins.fieldTitle }}>Total fees</Text>
          <Text sx={{ ...theme.mixins.value, ml: "auto" }}>
            <Formatter value={totalFeeInUSD} start={"~ $"} />
          </Text>
        </Box>
      </AccordionSummary>

      <AccordionDetails>
        <Box sx={{ ...theme.mixins.column, gap: theme.mixins.gaps.g8 }}>
          <Box sx={{ ...theme.mixins.row, alignItems: "stretch" }}>
            <Box
              sx={{
                ...theme.mixins.column,
                width: "fit-content",
                gap: theme.mixins.gaps.g8,
                alignItems: "center",
              }}
            >
              {feeCheckedBalance?.map((item, index) => (
                <Fragment key={item.feeType?.name}>
                  {index !== 0 && (
                    <Box
                      sx={{
                        borderRight: `1px dashed ${theme.palette.border.white24}`,
                        flex: 1,
                      }}
                    />
                  )}
                  {<Icon src={getIcon("timeline_dot")} width={16} />}
                </Fragment>
              ))}
            </Box>
            <Box
              sx={{
                ...theme.mixins.column,
                flex: 1,
                gap: theme.mixins.gaps.g8,
              }}
            >
              {feeCheckedBalance?.map((item) => (
                <FeeDetail
                  feeName={item.feeType?.name}
                  feeInCurrency={item.feeInCurrency}
                  feeInUSD={item.feeInUSD}
                  currencyName={item.currency?.name}
                  key={item.feeType?.name}
                />
              ))}
            </Box>
          </Box>
          {isEnoughBalanceToPayFee && (
            <Text sx={{ ...theme.mixins.validationError }}>
              {"You don't have enough balance to pay the fee, please "}{" "}
              <ReceiveFunction>
                {" "}
                <Text
                  sx={{
                    textDecoration: "underline",
                  }}
                >
                  Topup more
                </Text>
              </ReceiveFunction>{" "}
              to continue
            </Text>
          )}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}

export default Fees;

const FeeDetail = ({
  feeName,
  feeInCurrency,
  feeInUSD,
  currencyName,
}: {
  feeName: string;
  feeInCurrency: number;
  feeInUSD: number;
  currencyName: string;
}) => {
  const theme = useTheme();

  return (
    <Box sx={{ ...theme.mixins.row, gap: theme.mixins.gaps.g4 }}>
      <Box sx={{ ...theme.mixins.column, gap: theme.mixins.gaps.g4 }}>
        <Text sx={{ ...theme.mixins.fieldTitle, whiteSpace: "nowrap" }}>{feeName}</Text>
      </Box>
      <Box
        sx={{
          ...theme.mixins.column,
          flex: 1,
          width: "fit-content",
          alignItems: "flex-end",
        }}
      >
        <Text sx={{ ...theme.mixins.value }}>
          <Formatter value={feeInCurrency} unit={` ${currencyName}`} />
        </Text>
        <Text sx={{ ...theme.mixins.valueDescription }}>
          <Formatter value={feeInUSD} start={"~ $"} />
        </Text>
      </Box>
    </Box>
  );
};
