import { useMemo } from "react";
import { GeneralProps } from "../../../types/ui";
import { Balance } from "../../../types/expose-type";
import parsePropsData from "../../../utils/parsePropsData";
import Formatter from "../Formatter";
import Text from "../Text";
import Icon from "../Icon";
import { Box, useTheme } from "@mui/material";

interface TokenSelectionProps extends GeneralProps {
  tokenData?: string;
  active?: boolean;
}

export interface TokenState {
  tokens?: Balance[];
}

export interface TokenData {
  id: string;
  name: string;
  symbol: string;
  decimals: number;
  balance: string;
}

const TokenSelection = (props: TokenSelectionProps) => {
  const { tokenData: tokenDataString, ...rest } = props;
  const theme = useTheme();
  const tokenData = useMemo<TokenData | undefined>(
    () => parsePropsData<TokenData>(tokenDataString),
    [tokenDataString]
  );

  return (
    <Box
      sx={{
        backgroundColor: "background.white16",
        border: "1px solid",
        borderColor: props.active ? "border.secondary" : "transparent",
        borderRadius: theme.mixins.theBorderRadius.r12,
        padding: theme.mixins.customPadding.p12,
        display: "flex",
        alignItems: "center",
      }}
      {...rest}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "0.25rem",
        }}
      >
        <Icon className="size-4 rounded-full" />
        <Text className="text-14 font-500 leading-140 text-ui-text-white">
          {tokenData?.name}
        </Text>
      </Box>
      <div className="text-right ml-auto">
        <Text className="text-14 font-500 leading-140 text-ui-text-white">
          <Formatter value={20000} />
        </Text>
        <Text className="text-11 font-500 leading-140 text-ui-text-b1b1b1">
          <Formatter value={2000} />
        </Text>
      </div>
    </Box>
  );
};

export default TokenSelection;
