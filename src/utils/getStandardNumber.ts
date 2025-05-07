export default function getStandardNumber(value: number | string): string {
  const stringValue = "" + value;
  if (!stringValue.includes("e-")) {
    return stringValue;
  } else {
    const beforeE = stringValue.slice(0, stringValue.indexOf("e-")).replace(".", "");
    const afterE = stringValue.slice(stringValue.indexOf("e-") + 2);

    let result = "";
    for (let i = 0; i < +afterE + 1; i++) {
      result += i != 1 ? "0" : ".";
    }

    return result + beforeE;
  }
}
