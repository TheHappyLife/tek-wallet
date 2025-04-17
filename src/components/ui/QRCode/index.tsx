import { QRCodeCanvas } from "qrcode.react";
import getIcon from "../../../utils/getIcon";

function QRCode() {
  return (
    <QRCodeCanvas
      className=""
      value="https://reactjs.org/"
      size={160}
      imageSettings={{
        src: getIcon("eth"),
        x: undefined,
        y: undefined,
        height: 32,
        width: 32,
        excavate: true,
      }}
    />
  );
}

export default QRCode;
