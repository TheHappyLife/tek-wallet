import { useMemo } from "react";
import { GeneralProps } from "../../../types/ui";
import parsePropsData from "../../../utils/parsePropsData";
import Formatter from "../Formatter";
import Text from "../Text";
import Icon from "../Icon";
import { Box, useTheme } from "@mui/material";
import { DepositCurrency } from "../../../types/expose-type";

interface TokenSelectionProps extends GeneralProps {
  tokenData?: string;
  active?: boolean;
}

const TokenSelection = (props: TokenSelectionProps) => {
  const { tokenData: tokenDataString, sx, onClick, ...rest } = props;
  const theme = useTheme();
  const tokenData = useMemo<DepositCurrency | undefined>(
    () => parsePropsData<DepositCurrency>(tokenDataString),
    [tokenDataString]
  );

  const balance = useMemo(() => {
    console.warn("calculate balance", tokenData?.balance);

    return +(tokenData?.balance ?? 0);
  }, [tokenData]);

  const balanceInUSD = useMemo(() => {
    return balance * +(tokenData?.usd_rate ?? 0);
  }, [balance, tokenData]);

  return (
    <Box
      onClick={() => onClick?.(tokenData)}
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
        <Icon width={20} src={tokenData?.icon} />
        <Box
          sx={{
            ...theme.mixins.column,
          }}
        >
          <Text sx={theme.mixins.value}>{tokenData?.name}</Text>
          <Text sx={theme.mixins.valueDescription}>{tokenData?.full_name}</Text>
        </Box>
      </Box>
      <Box
        sx={{ ...theme.mixins.column, marginLeft: "auto", alignItems: "end" }}
      >
        <Text sx={theme.mixins.value}>
          <Formatter value={balance} />
        </Text>
        <Text sx={theme.mixins.valueDescription}>
          <Formatter value={balanceInUSD} start="~ $" />
        </Text>
      </Box>
    </Box>
  );
};

export default TokenSelection;
