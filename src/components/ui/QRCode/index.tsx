import { QRCodeCanvas } from "qrcode.react";
// import getIcon from "../../../utils/getIcon";

function QRCode() {
  return (
    // <QRCodeCanvas
    //   className=""
    //   value="https://reactjs.org/"
    //   size={160}
    //   imageSettings={{
    //     src: getIcon("eth"),
    //     x: undefined,
    //     y: undefined,
    //     height: 32,
    //     width: 32,
    //     excavate: true,
    //   }}
    // />
    <QRCodeCanvas
      value={"https://picturesofpeoplescanningqrcodes.tumblr.com/"}
      title={"Title for my QR Code"}
      size={128}
      bgColor={"#ffffff"}
      fgColor={"#000000"}
      level={"H"}
      minVersion={8}
      marginSize={2}
      imageSettings={{
        src: "https://static.zpao.com/favicon.png",
        x: undefined,
        y: undefined,
        height: 24,
        width: 24,
        opacity: 1.2,
        excavate: true,
      }}
    />
  );
}

export default QRCode;
