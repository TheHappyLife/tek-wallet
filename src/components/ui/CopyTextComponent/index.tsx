import { useState } from "react";
import { GeneralProps } from "../../../types/ui";
import { Box, useTheme } from "@mui/material";
import Icon from "../Icon";
import getIcon from "../../../utils/getIcon";
import Text from "../Text";

interface CopyTextComponentProps extends GeneralProps {
  value: string;
  iconSuccess?: React.ReactNode;
  hideTextMessage?: boolean;
}

const CopyTextComponent = ({
  value,
  iconSuccess,
  children,
  hideTextMessage,
  sx,
}: CopyTextComponentProps) => {
  const theme = useTheme();
  const [showSuccess, setShowSuccess] = useState(false);

  const CopyTextComponent = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 800);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <Box
      onClick={CopyTextComponent}
      sx={{
        position: "relative",
        cursor: "pointer",
        ...sx,
      }}
    >
      {children}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: theme.mixins.gaps.g4,
          opacity: showSuccess ? 1 : 0,
          position: "absolute",
          inset: "-0.125rem",
          backgroundColor: theme.palette.background.black64,
          backdropFilter: "blur(12px)",
          borderRadius: theme.mixins.theBorderRadius.r12,
          transition: "opacity 0.3s ease-in-out",
        }}
      >
        {iconSuccess || (
          <Icon
            src={getIcon("copied_check")}
            sx={{
              width: "1rem",
              height: "1rem",
            }}
          />
        )}
        {!hideTextMessage && (
          <Text
            sx={{
              color: "text.whiteText",
              display: "inline-block",
              fontSize: "0.8em",
            }}
          >
            Copied
          </Text>
        )}
      </Box>
    </Box>
  );
};

export default CopyTextComponent;
