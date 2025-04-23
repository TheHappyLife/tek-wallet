"use client";
import React, { CSSProperties } from "react";
import { GeneralProps } from "../../../types/ui";
import getStandardNumber from "../../../utils/getStandardNumber";
import lengthFromDotToFirstNonZero from "../../../utils/lengthFromDotToFirstNonZero";
import CustomTooltip from "../CustomTooltip";
import { Box } from "@mui/material";
import formatter from "../../../utils/formatter";
interface FormatterProps extends GeneralProps {
  value?: number | string;
  start?: string;
  unit?: string;
  unitCustomStyle?: string;
  lengthValueAllowed?: number;
  noUnitSpacing?: boolean;
  allowShowZero?: boolean;
  useCompact?: boolean;
  disableTooltip?: boolean;
  isUnitStyle?: boolean;
  disableAdjustUnitColor?: boolean;
  isLessThan?: boolean;
  overrideLessThanClass?: string;
  unitStyle?: CSSProperties;
  useCompactOnThousand?: boolean;
  startStyle?: CSSProperties;
  hideStart?: boolean;
  hideUnit?: boolean;
  onClickUnit?: (data?: any) => any;
}
const Formatter: React.FC<FormatterProps> = ({
  value,
  start = "",
  unit = "",
  lengthValueAllowed = 2,
  noUnitSpacing = false,
  allowShowZero = false,
  useCompact = true,
  disableTooltip,
  isLessThan,
  unitStyle,
  useCompactOnThousand = false,
  startStyle,
  hideStart,
  hideUnit,
  onClickUnit,
}) => {
  const { tokensRateState } = {} as any;
  const { userInfo } = {} as any;
  //   const { tokensRateState } = useRealtimeData();
  //   const { userInfo } = useGlobalData();
  if (value === undefined) return;
  const rate =
    start?.includes("$") || start?.toLowerCase()?.includes("usd")
      ? +(tokensRateState?.[userInfo?.settings?.currency]?.USD || 1)
      : 1;
  const numberDisplay = Number(value) / rate;
  const startDisplay =
    start?.includes("$") || start?.toLowerCase()?.includes("usd")
      ? userInfo?.settings?.currency?.toLowerCase() == "usd"
        ? "$"
        : ""
      : start;
  const unitDisplay =
    start?.includes("$") || start?.toLowerCase()?.includes("usd")
      ? userInfo?.settings?.currency?.toLowerCase() == "usd"
        ? unit
        : userInfo?.settings?.currency && ` ${userInfo?.settings?.currency}`
      : unit;
  const formattedNumber = getStandardNumber(numberDisplay);
  const lengthFromDot = lengthFromDotToFirstNonZero(formattedNumber);
  const lessThan = numberDisplay > 0 && numberDisplay < 0.01 && isLessThan;

  return (
    <CustomTooltip
      disabled={disableTooltip}
      trigger={
        <Box
          sx={{
            whiteSpace: "nowrap",
          }}
        >
          {numberDisplay === 0 && !allowShowZero ? (
            "--"
          ) : (
            <>
              {lessThan && (
                <Box
                  component="span"
                  sx={{
                    position: "relative",
                    top: "-0.125rem",
                    mr: "0.125rem",
                  }}
                >
                  {"< "}
                </Box>
              )}
              {!(numberDisplay === 0) && !hideStart && (
                <span className="font-primary" style={startStyle}>
                  {startDisplay}
                </span>
              )}
              {!lessThan && numberDisplay > 0 && numberDisplay < 0.000001 ? (
                <span className="font-primary">
                  {"0.0"}
                  <sub>{lengthFromDot}</sub>
                  {formattedNumber.slice(
                    2 + lengthFromDot,
                    lengthValueAllowed - 2 + lengthFromDot
                  )}
                </span>
              ) : (
                <span className="font-primary">
                  {lessThan
                    ? "0.01"
                    : formatter(
                        isLessThan
                          ? Number(numberDisplay).toFixed(2)
                          : numberDisplay,
                        useCompact,
                        useCompactOnThousand,
                        lengthValueAllowed
                      )}
                </span>
              )}
              {!hideUnit &&
                !!unitDisplay &&
                !noUnitSpacing &&
                !(numberDisplay === 0) && (
                  <Box component="span" style={unitStyle} onClick={onClickUnit}>
                    {unitDisplay}
                  </Box>
                )}
            </>
          )}
        </Box>
      }
    >
      <Formatter
        disableTooltip
        start={start}
        value={value}
        lengthValueAllowed={12}
        useCompact={false}
        unit={unit}
        allowShowZero
        disableAdjustUnitColor
        hideStart={hideStart}
        hideUnit={hideUnit}
      />
    </CustomTooltip>
  );
};

export default Formatter;
