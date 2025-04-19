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
  const { tokenData: tokenDataString, sx, ...rest } = props;
  const theme = useTheme();
  const tokenData = useMemo<TokenData | undefined>(
    () => parsePropsData<TokenData>(tokenDataString),
    [tokenDataString]
  );

  return (
    <Box
      onClick={() => props?.onClick?.(tokenData)}
      sx={{
        backgroundColor: props.active
          ? "background.secondary16"
          : "background.white16",
        border: "1px solid",
        borderColor: props.active ? "border.secondary" : "transparent",
        borderRadius: theme.mixins.theBorderRadius.r16,
        padding: theme.mixins.customPadding.p12,
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        ...sx,
      }}
      {...rest}
    >
      <Box
        sx={{
          ...theme.mixins.row,
          gap: theme.mixins.gaps.g12,
        }}
      >
        <Icon width={20} />
        <Box
          sx={{
            ...theme.mixins.column,
          }}
        >
          <Text sx={theme.mixins.value}>{tokenData?.name}</Text>
          <Text sx={theme.mixins.valueDescription}>{"tokenData.name"}</Text>
        </Box>
      </Box>
      <Box
        sx={{ ...theme.mixins.column, marginLeft: "auto", alignItems: "end" }}
      >
        <Text sx={theme.mixins.value}>
          <Formatter value={20000} />
        </Text>
        <Text sx={theme.mixins.valueDescription}>
          <Formatter value={2000} />
        </Text>
      </Box>
    </Box>
  );
};

export default TokenSelection;
