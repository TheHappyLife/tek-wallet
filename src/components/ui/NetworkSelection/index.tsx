import { useMemo } from "react";
import Icon from "../Icon";
import Text from "../Text";
import { GeneralProps } from "../../../types/ui";
import parsePropsData from "../../../utils/parsePropsData";
import { Box, useTheme } from "@mui/material";

interface NetworkSelectionProps extends GeneralProps {
  active?: boolean;
  networkData?: string;
}

export interface NetworkData {
  name: string;
  icon: string;
}

const NetworkSelection = (props: NetworkSelectionProps) => {
  const { networkData: networkDataString, ...rest } = props;
  const theme = useTheme();
  const networkData = useMemo<NetworkData | undefined>(
    () => parsePropsData<NetworkData>(networkDataString),
    [networkDataString]
  );

  return (
    <Box
      {...rest}
      sx={{
        backgroundColor: "background.white16",
        padding: "0.5rem",
        borderRadius: "0.75rem",
        border: "1px solid border.white16",
      }}
    >
      <Icon
        src={networkData?.icon}
        sx={{ borderRadius: theme.mixins.theBorderRadius.full }}
      />
      <Text
        sx={{
          fontSize: "typography.fontSize14",
          fontWeight: "typography.fontWeight500",
          leading: "140%",
          color: "text.white",
          whiteSpace: "nowrap",
          textTransform: "capitalize",
        }}
      >
        {networkData?.name}
      </Text>
    </Box>
  );
};

export default NetworkSelection;
