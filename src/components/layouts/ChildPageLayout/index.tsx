import { GeneralProps } from "../../../types/ui";
import { forwardRef, useImperativeHandle, useState } from "react";
import { StatusDisplayType } from "../../../components/ui/StatusDisplay";
import StatusDisplay from "../../../components/ui/StatusDisplay";
import { Box } from "@mui/material";
import getImage from "../../../utils/getImage";
interface ChildPageLayoutProps extends GeneralProps {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  fullScreen?: boolean;
}

export type ChildPageLayoutRef = {
  showNormal: () => void;
  showLoading: () => void;
  showSuccess: () => void;
  showError: () => void;
};

const ChildPageLayout = forwardRef<ChildPageLayoutRef, ChildPageLayoutProps>(
  (props, ref) => {
    const { header, footer, fullScreen, children, sx } = props;
    const [status, setStatus] = useState<StatusDisplayType>(
      StatusDisplayType.Normal
    );

    useImperativeHandle(ref, () => {
      return {
        showNormal: () => {
          setStatus(StatusDisplayType.Normal);
        },
        showLoading: () => {
          setStatus(StatusDisplayType.Loading);
        },
        showSuccess: () => {
          setStatus(StatusDisplayType.Success);
        },
        showError: () => {
          setStatus(StatusDisplayType.Error);
        },
      };
    });

    return (
      <Box
        sx={{
          position: "relative",
          backgroundImage: `url(${getImage("main_bg", "jpg")})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "100dvh",
          width: "100vw",
          ...sx,
        }}
      >
        {header && (
          <Box
            sx={{
              height: "3.125rem",
              width: "100%",
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 50,
            }}
          >
            {header}
          </Box>
        )}
        <Box
          sx={{
            height: "100%",
            width: "100%",
            overflowX: "hidden",
            overflowY: "auto",
            paddingTop: header && !fullScreen ? "3.125rem" : 0,
          }}
        >
          {children}
        </Box>
        {footer && (
          <Box
            sx={{
              height: "3rem",
              width: "100%",
              position: "absolute",
              bottom: 0,
              left: 0,
              zIndex: 50,
            }}
          >
            {footer}
          </Box>
        )}
        {status !== StatusDisplayType.Normal && (
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "blackBackground.16",
              backdropFilter: "blur(4px)",
              zIndex: 50,
            }}
          >
            <StatusDisplay status={status} />
          </Box>
        )}
      </Box>
    );
  }
);

ChildPageLayout.displayName = "ChildPageLayout";

export default ChildPageLayout;
