import getStandardNumber from "./getStandardNumber";

function formatNumber(num: number) {
  if (num >= 1_000_000_000_000) {
    return formatter((num / 1_000_000_000_000).toFixed(2)) + "T";
  } else if (num >= 1_000_000_000) {
    return formatter((num / 1_000_000_000).toFixed(2)) + "B";
  } else if (num >= 1_000_000) {
    return formatter((num / 1_000_000).toFixed(2)) + "M";
  } else if (num >= 1_000) {
    return formatter((num / 1_000).toFixed(2)) + "K";
  } else {
    return num.toString();
  }
}

const formatter = (
  value: string | number,
  useCompact = true,
  useCompactOnThousand = false,
  lengthAllowedPassed?: number
): string => {
  try {
    if (value == undefined) return "";
    const lengthAllowed = lengthAllowedPassed ?? 8;
    const thousandsSeparator = ",";
    const number = Number(value.toString());
    if (number > 1000 && useCompactOnThousand) {
      return formatNumber(number);
    }
    if (number > 1000000 && useCompact) {
      return formatNumber(number);
    }

    const numberToString = getStandardNumber(number);
    if (numberToString.includes(".")) {
      // is not natural number
      const indexOfDecimalDot = numberToString.indexOf(".");
      const before = numberToString.slice(0, indexOfDecimalDot);
      const after = numberToString.slice(
        indexOfDecimalDot + 1,
        indexOfDecimalDot + 1 + (lengthAllowed - before?.length - 1 <= 1 ? 2 : lengthAllowed - before?.length - 1)
      );
      const beforeFormatted = before.replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);
      const afterFormatted = Number(`0.${after}`)?.toString()?.replace("0.", "");

      return `${beforeFormatted}${+afterFormatted ? "." + afterFormatted : ""}`;
      // return afterFormatted;
    } else {
      //is natural number
      return `${number}`.replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);
    }
  } catch (err) {
    console.error(err);

    return "--";
  }
};

export default formatter;
export { formatNumber };
