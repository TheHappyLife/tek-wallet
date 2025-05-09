import { useMemo } from "react";
import Icon from "../Icon";
import Text from "../Text";
import { GeneralProps } from "../../../types/ui";
import parsePropsData from "../../../utils/parsePropsData";
import { Box, useTheme } from "@mui/material";
import { NetworkData } from "../../../services/axios/type";

interface NetworkSelectionProps extends GeneralProps {
  active?: boolean;
  networkData?: string;
  onClick?: (networkData?: NetworkData) => void;
}

const NetworkSelection = (props: NetworkSelectionProps) => {
  const { networkData: networkDataString, onClick, ...rest } = props;
  const theme = useTheme();
  const networkData = useMemo<NetworkData | undefined>(
    () => parsePropsData<NetworkData>(networkDataString),
    [networkDataString]
  );

  return (
    <Box
      {...rest}
      sx={{
        ...theme.mixins.row,
        backgroundColor: props.active ? "background.secondary16" : "background.white16",
        padding: `${theme.mixins.customPadding.p16} ${theme.mixins.customPadding.p8}`,
        borderRadius: theme.mixins.customRadius.r12,
        border: "1px solid",
        borderColor: props.active ? "border.secondary" : "border.white24",
        gap: theme.mixins.gaps.g8,
      }}
      onClick={() => onClick?.(networkData)}
    >
      <Icon src={networkData?.icon} sx={{ borderRadius: theme.mixins.customRadius.full }} width={24} />
      <Text
        sx={{
          ...theme.mixins.value,
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
