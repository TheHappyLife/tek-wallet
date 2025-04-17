import getIcon from "../../../utils/getIcon";
import Image from "../Image";
import Text from "../Text";
import { Box, useTheme } from "@mui/material";
interface StatusDisplayProps {
  status: StatusDisplayType;
}

export enum StatusDisplayType {
  Success = "success",
  Error = "error",
  Loading = "loading",
  Normal = "normal",
}

const StatusDisplay = (props: StatusDisplayProps) => {
  const theme = useTheme();

  const statusColor: Record<StatusDisplayType, string> = {
    [StatusDisplayType.Success]: theme.palette.text.successStatus,
    [StatusDisplayType.Error]: theme.palette.text.errorStatus,
    [StatusDisplayType.Loading]: theme.palette.text.loadingStatus,
    [StatusDisplayType.Normal]: theme.palette.text.white,
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
      }}
    >
      <Image
        src={getIcon(`status_${props.status}`, "gif")}
        sx={{ width: "1.5rem", height: "1.5rem" }}
      />
      <Text
        sx={{
          color: statusColor[props.status],
          textTransform: "capitalize",
        }}
      >
        {props.status}
      </Text>
    </Box>
  );
};

export default StatusDisplay;
