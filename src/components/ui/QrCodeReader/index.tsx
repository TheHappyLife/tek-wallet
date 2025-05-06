import { BoxProps } from "@mui/material";
import DrawerComponent, { DrawerComponentRef } from "../DrawerComponent";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { IDetectedBarcode, Scanner } from "@yudiel/react-qr-scanner";

interface QrCodeReaderProps extends BoxProps {
  onResult: (result: IDetectedBarcode[]) => void;
}
export interface QrCodeReaderRef {
  open: () => void;
  close: () => void;
}

const QrCodeReader = forwardRef<QrCodeReaderRef, QrCodeReaderProps>(
  (props, ref) => {
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
        {isOpen && (
          <Scanner
            components={{
              audio: false,
              finder: false,
            }}
            styles={{
              container: {
                width: "100%",
                height: "100dvh",
                position: "relative",
              },
              video: {
                width: "100%",
                height: "100%",
                objectFit: "cover",
              },
            }}
            onScan={props.onResult}
          >
            <div
              style={{
                width: "60%",
                aspectRatio: "1",
                position: "absolute",
                top: "40%",
                left: "50%",
                transform: "translateX(-50%) translateY(-50%)",
                display: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  borderTopLeftRadius: "12px",
                  top: "0",
                  left: "0",
                  width: "18%",
                  height: "18%",
                  borderTop: "3px solid white",
                  borderLeft: "3px solid white",
                }}
              ></div>

              <div
                style={{
                  position: "absolute",
                  borderTopRightRadius: "12px",
                  top: "0",
                  right: "0",
                  width: "18%",
                  height: "18%",
                  borderTop: "3px solid white",
                  borderRight: "3px solid white",
                }}
              ></div>

              <div
                style={{
                  position: "absolute",
                  borderBottomLeftRadius: "12px",
                  bottom: "0",
                  left: "0",
                  width: "18%",
                  height: "18%",
                  borderBottom: "3px solid white",
                  borderLeft: "3px solid white",
                }}
              ></div>

              <div
                style={{
                  position: "absolute",
                  borderBottomRightRadius: "12px",
                  bottom: "0",
                  right: "0",
                  width: "18%",
                  height: "18%",
                  borderBottom: "3px solid white",
                  borderRight: "3px solid white",
                }}
              ></div>
            </div>
            <div
              onClick={close}
              style={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
                zIndex: 6000,
                cursor: "pointer",
                color: "#fff",
              }}
            >
              Cancel
            </div>
          </Scanner>
        )}
      </DrawerComponent>
    );
  }
);

QrCodeReader.displayName = "QrCodeReader";

export default QrCodeReader;
