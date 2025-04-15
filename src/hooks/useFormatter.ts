import formatter from "../utils/formatter";
import roundToTwoSignificantDecimals from "../utils/roundToTwoSignificantDecimals";

function useFormatter() {
  const { userInfo } = {} as any;
  const { tokensRateState } = {} as any;
  const currency = userInfo?.settings?.currency;
  const isDollar =
    currency?.toLowerCase()?.includes("usd") ||
    currency?.toLowerCase()?.includes("$");
  const rate = tokensRateState?.[currency]?.USD || 1;
  const formatValue = (value: number, hideUnit?: boolean) => {
    const valueDisplay = formatter(
      roundToTwoSignificantDecimals(value / rate),
      false,
      true
    );
    if (hideUnit) return valueDisplay;

    return (
      (isDollar ? "$" : "") +
      valueDisplay +
      (isDollar ? "" : !!currency ? ` ${currency}` : "")
    );
  };

  return {
    formatValue,
  };
}

export default useFormatter;
