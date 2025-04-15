"use client";
import { GeneralProps, UnknownFunction } from "../../../types/ui";
import BackArrow from "../BackArrow";
import useCustomRouter from "../../../hooks/useCustomRouter";
import Text from "../Text";
import { Box } from "@mui/material";

interface BackHeaderProps extends GeneralProps {
  overrideBack?: (e: React.MouseEvent<HTMLDivElement>) => void;
  center?: React.ReactNode;
  hideBack?: boolean;
}

const BackHeader = (props: BackHeaderProps) => {
  const router = useCustomRouter();
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
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        height: "100%",
        ...props.sx,
      }}
    >
      {!hideBack && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            cursor: "pointer",
          }}
          onClick={back as UnknownFunction}
        >
          <BackArrow /> <Text sx={{ color: "whiteText.main" }}>Back</Text>
        </Box>
      )}
      {!!center && (
        <Box
          sx={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
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
