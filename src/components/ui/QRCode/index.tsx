import { QRCodeCanvas } from "qrcode.react";
import { GeneralProps } from "../../../types/ui";

interface QRCodeProps extends GeneralProps {
  value: string;
  size?: number;
  bgColor?: string;
  fgColor?: string;
  logo?: string;
  title?: string;
}

function QRCode(props: QRCodeProps) {
  const { value, size = 156, logo, title, bgColor = "#ffffff" } = props;

  return (
    <QRCodeCanvas
      value={value}
      title={title}
      size={size}
      bgColor={bgColor}
      fgColor={"#000000"}
      level={"H"}
      minVersion={8}
      marginSize={4}
      imageSettings={{
        src: logo || "",
        x: undefined,
        y: undefined,
        height: 24,
        width: 24,
        opacity: 1,
        excavate: true,
      }}
    />
  );
}

export default QRCode;
