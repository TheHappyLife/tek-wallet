import { Box, CircularProgress, useTheme } from "@mui/material";
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

const LoadingLayout = forwardRef<LoadingLayoutRef, LoadingLayoutProps>((props: LoadingLayoutProps, ref) => {
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
    <Box
      sx={{
        position: "relative",
        width: "fit-content",
        height: "fit-content",
        ...sx,
      }}
    >
      {children}
      {loading && (
        <Box
          sx={{
            ...theme.mixins.whiteLoadingOverlay,
            ...theme.mixins.row,
            gap: theme.mixins.gaps.g8,
            justifyContent: "center",
          }}
        >
          <CircularProgress color="secondary" size={20} />
          <Text
            sx={{
              fontSize: theme.typography.fontSize12,
              color: "text.secondary",
            }}
          >
            {loadingMessage}
          </Text>
        </Box>
      )}
    </Box>
  );
});

LoadingLayout.displayName = "LoadingLayout";

export default LoadingLayout;
