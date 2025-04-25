import { Box, BoxProps } from "@mui/material";
import DrawerComponent, { DrawerComponentRef } from "../DrawerComponent";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTheme } from "@mui/material";
import { OnResultFunction, QrReader } from "react-qr-reader";

interface QrCodeReaderProps extends BoxProps {
  onResult?: OnResultFunction;
}
export interface QrCodeReaderRef {
  open: () => void;
  close: () => void;
}

const QrCodeReader = forwardRef<QrCodeReaderRef, QrCodeReaderProps>(
  (props, ref) => {
    const theme = useTheme();
    const drawerRef = useRef<DrawerComponentRef>(null);

    useImperativeHandle(ref, () => ({
      open: () => {
        drawerRef.current?.open();
      },
      close: () => {
        drawerRef.current?.close();
      },
    }));

    return (
      <DrawerComponent trigger={props.children} ref={drawerRef}>
        <Box
          sx={{
            width: "100%",
            height: "100dvh",
            position: "relative",
          }}
        >
          <QrReader
            containerStyle={{
              width: "100%",
              height: "100%",
            }}
            constraints={{ facingMode: "environment" }}
            onResult={props.onResult}
            videoStyle={{ objectFit: "cover" }}
          />
          <Box
            sx={{
              ...theme.mixins.center,
              width: "50%",
              aspectRatio: 1,
              border: `1px solid ${theme.palette.border.white64}`,
            }}
          ></Box>
        </Box>
      </DrawerComponent>
    );
  }
);

QrCodeReader.displayName = "QrCodeReader";

export default QrCodeReader;
