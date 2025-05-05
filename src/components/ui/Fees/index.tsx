import {
  Accordion,
  AccordionDetails,
  AccordionProps,
  AccordionSummary,
  Box,
  useTheme,
} from "@mui/material";
import Icon from "../Icon";
import getIcon from "../../../utils/getIcon";
import Text from "../Text";
import Formatter from "../Formatter";
import { Fragment } from "react/jsx-runtime";
import { FeesDataType } from "../../../services/axios/get-est-fee-service/type";
import parsePropsData from "../../../utils/parsePropsData";
export interface FeesProps extends Omit<AccordionProps, "children"> {
  feesData: string;
}

function Fees(props: FeesProps) {
  const { sx, ...rest } = props;
  const theme = useTheme();
  const feesData = parsePropsData<FeesDataType>(props?.feesData);

  return (
    <Accordion
      defaultExpanded
      {...rest}
      sx={{
        "&.MuiAccordion-root": {
          backgroundColor: "transparent",
          margin: 0,
          borderRadius: theme.mixins.theBorderRadius.r12,
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
      <AccordionSummary
        expandIcon={<Icon src={getIcon("arrow_down")} width={20} />}
      >
        <Box sx={{ ...theme.mixins.row, width: "100%" }}>
          <Text sx={{ ...theme.mixins.fieldTitle }}>Total fees</Text>
          <Text sx={{ ...theme.mixins.value, ml: "auto" }}>
            <Formatter value={1000} />
          </Text>
        </Box>
      </AccordionSummary>

      <AccordionDetails>
        <Box sx={{ ...theme.mixins.row, alignItems: "stretch" }}>
          <Box
            sx={{
              ...theme.mixins.column,
              width: "fit-content",
              gap: theme.mixins.gaps.g8,
              alignItems: "center",
            }}
          >
            {feesData?.feeDetail?.map((item, index) => (
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
            sx={{ ...theme.mixins.column, flex: 1, gap: theme.mixins.gaps.g8 }}
          >
            {feesData?.feeDetail?.map((item) => (
              <FeeDetail
                feeName={item.feeType?.name}
                feeInCurrency={item.feeInCurrency}
                feeInUSD={item.feeInUSD}
                currencyName={"USDT"}
                key={item.feeType?.name}
              />
            ))}
          </Box>
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
      <Text sx={{ ...theme.mixins.fieldTitle, whiteSpace: "nowrap" }}>
        {feeName}
      </Text>
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
