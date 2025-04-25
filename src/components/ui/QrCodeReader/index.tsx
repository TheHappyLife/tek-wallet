import { Box, BoxProps } from "@mui/material";
import DrawerComponent, { DrawerComponentRef } from "../DrawerComponent";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
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
    const [isOpen, setIsOpen] = useState(false);
    const open = () => {
      drawerRef.current?.open();
      setIsOpen(true);
    };
    const close = () => {
      drawerRef.current?.close();
      setIsOpen(false);
    };

    const onOpen = () => {
      setIsOpen(true);
    };

    const onClose = () => {
      setIsOpen(false);
    };

    useImperativeHandle(ref, () => ({
      open,
      close,
    }));

    return (
      <DrawerComponent
        trigger={props.children}
        ref={drawerRef}
        onClose={onClose}
        onOpen={onOpen}
      >
        <Box
          sx={{
            width: "100%",
            height: "100dvh",
            position: "relative",
          }}
        >
          {isOpen && (
            <>
              <QrReader
                containerStyle={{
                  width: "300px",
                  border: "1px solid red",
                }}
                constraints={{ facingMode: "environment" }}
                onResult={props.onResult}
                videoStyle={{
                  objectFit: "cover",
                  width: "100%",
                }}
              />
              <Box
                sx={{
                  ...theme.mixins.center,
                  width: "50%",
                  aspectRatio: 1,
                  border: `1px solid ${theme.palette.border.white64}`,
                }}
              ></Box>
            </>
          )}
        </Box>
      </DrawerComponent>
    );
  }
);

QrCodeReader.displayName = "QrCodeReader";

export default QrCodeReader;
