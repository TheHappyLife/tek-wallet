"use client";
import { GeneralProps, UnknownFunction } from "../../../types/ui";
import BackArrow from "../BackArrow";
import useCustomRouter from "../../../hooks/useCustomRouter";
import Text from "../Text";
import { Box, useTheme } from "@mui/material";

interface BackHeaderProps extends GeneralProps {
  overrideBack?: (e: React.MouseEvent<HTMLDivElement>) => void;
  center?: React.ReactNode;
  hideBack?: boolean;
}

const BackHeader = (props: BackHeaderProps) => {
  const router = useCustomRouter();
  const theme = useTheme();
  const { center, children, hideBack } = props;
  const back = (e: React.MouseEvent<HTMLDivElement>) => {
    if (props.overrideBack) {
      props.overrideBack(e);

      return;
    }
    router.back();
  };

  return (
    <Box
      sx={{
        ...theme.mixins.row,
        gap: theme.mixins.gaps.g16,
        position: "relative",
        height: "100%",
        ...props.sx,
      }}
    >
      {!hideBack && (
        <Box
          component="button"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: theme.mixins.gaps.g4,
            cursor: "pointer",
            "&:active": {
              transform: "translateX(-0.25rem)",
              transition: "transform 0.2s ease-in-out",
            },
          }}
          onClick={back as UnknownFunction}
        >
          <BackArrow />{" "}
          <Text sx={{ color: theme.palette.text.white }}>Back</Text>
        </Box>
      )}
      {!!center && (
        <Box
          sx={{
            ...theme.mixins.center,
          }}
        >
          {center}
        </Box>
      )}
      {children}
    </Box>
  );
};

export default BackHeader;
