export default function lengthFromDotToFirstNonZero(numString: string): number {
  const dotIndex = numString.indexOf(".");
  if (dotIndex === -1) {
    return -1;
  }
  let firstNonZeroIndex = dotIndex + 1;
  while (firstNonZeroIndex < numString?.length && numString[firstNonZeroIndex] === "0") {
    firstNonZeroIndex++;
  }

  if (firstNonZeroIndex >= numString?.length) {
    return -1;
  }

  return firstNonZeroIndex - dotIndex - 1;
}
