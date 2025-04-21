import { Box, useTheme } from "@mui/material";
import { GeneralProps } from "../../../types/ui";
import Text from "../Text";
import { forwardRef, useImperativeHandle, useState } from "react";

interface LoadingLayoutProps extends GeneralProps {
  loadingMessage?: string;
  initLoading?: boolean;
}

export interface LoadingLayoutRef {
  startLoading: () => void;
  endLoading: () => void;
}

const LoadingLayout = forwardRef<LoadingLayoutRef, LoadingLayoutProps>(
  (props: LoadingLayoutProps, ref) => {
    const [loading, setLoading] = useState(props.initLoading);
    const { loadingMessage = "Processing", children, sx } = props;
    const theme = useTheme();

    useImperativeHandle(ref, () => ({
      startLoading: () => {
        setLoading(true);
      },
      endLoading: () => {
        setLoading(false);
      },
    }));

    return (
      <Box sx={{ position: "relative", ...sx }}>
        {children}
        {loading && (
          <Text
            sx={{
              position: "absolute",
              inset: 0,
              display: "flex",
              margin: "auto",
              color: "text.white",
              ...theme.mixins.whiteLoadingOverlay,
              zIndex: 1000,
            }}
          >
            {loadingMessage}
          </Text>
        )}
      </Box>
    );
  }
);

LoadingLayout.displayName = "LoadingLayout";

export default LoadingLayout;
