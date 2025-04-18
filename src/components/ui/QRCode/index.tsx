import { QRCodeCanvas } from "qrcode.react";
// import getIcon from "../../../utils/getIcon";

function QRCode() {
  return (
    <QRCodeCanvas
      value={"https://picturesofpeoplescanningqrcodes.tumblr.com/"}
      title={"Title for my QR Code"}
      size={128}
      bgColor={"#ffffff"}
      fgColor={"#000000"}
      level={"H"}
      minVersion={8}
      marginSize={6}
      imageSettings={{
        src: "https://static.zpao.com/favicon.png",
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
