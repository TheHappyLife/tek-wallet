import reduceZeroNoNecessary from "../utils/reduceZeroNoNecessary";

export default function roundToTwoSignificantDecimals(num: number) {
  try {
    if (num >= 1) {
      num = Math.floor(+num * 100) / 100;
    }
    const stringValue = num + "";
    const indexOfDot = stringValue.indexOf(".");
    if (indexOfDot == -1) return num;

    const indexOfFirstNumberNotZeroAfterDot = stringValue
      .split("")
      ?.findIndex((char: string, i: number) => +char != 0 && i > indexOfDot);
    const numOfNumberRemain =
      indexOfFirstNumberNotZeroAfterDot - indexOfDot + 1;

    return reduceZeroNoNecessary(
      Math.floor(+num * 10 ** numOfNumberRemain) / 10 ** numOfNumberRemain
    );
  } catch {
    return num;
  }
}
