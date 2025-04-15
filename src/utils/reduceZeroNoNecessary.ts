export default function reduceZeroNoNecessary(num: number) {
  const stringValue = num + "";
  const indexOfDot = stringValue.indexOf(".");
  if (indexOfDot == -1) return num;
  const length = stringValue.length;
  const result = stringValue;
  for (let i = length; i > 0; i--) {
    if (+stringValue[i] > 0) {
      break;
    }
    result.slice(0, -1);
  }

  return +result;
}
