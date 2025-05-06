import { useMemo } from "react";
import { Balance } from "../../../types/expose-type";
import Icon from "../Icon";
import Text from "../Text";
import Formatter from "../Formatter";
import { Box, useTheme } from "@mui/material";

type TokenDataStringified = string;

interface TokenItemProps {
  className?: string;
  tokenData: TokenDataStringified;
}

const TokenItem = (props: TokenItemProps) => {
  const theme = useTheme();
  const tokenData = useMemo(
    () => JSON.parse(props.tokenData) as Balance,
    [props.tokenData]
  );

  const currency = useMemo(() => tokenData.currency, [tokenData]);

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1.55fr 1fr 1fr",
        gap: theme.mixins.gaps.g12,
        py: theme.mixins.customPadding.p8,
      }}
    >
      <Box
        sx={{
          ...theme.mixins.row,
          gap: theme.mixins.gaps.g8,
        }}
      >
        <Icon
          width={20}
          sx={{
            borderRadius: theme.mixins.customRadius.full,
          }}
          src={currency.link}
        />
        <Box
          sx={{
            ...theme.mixins.column,
            flex: 1,
          }}
        >
          <Text sx={{ ...theme.mixins.value }}>{currency.name}</Text>
          <Text sx={{ ...theme.mixins.valueDescription }}>
            {currency.full_name}
          </Text>
        </Box>
      </Box>
      <Box
        sx={{
          ...theme.mixins.column,
          gap: theme.mixins.gaps.g1,
          justifyContent: "center",
        }}
      >
        <Text sx={{ ...theme.mixins.value }}>
          <Formatter value={+(tokenData.current_value ?? 0)} />
        </Text>
        <Text sx={{ ...theme.mixins.valueDescription }}>
          <Formatter value={100} />
        </Text>
      </Box>
      <Box
        sx={{
          ...theme.mixins.column,
          gap: theme.mixins.gaps.g1,
          textAlign: "right",
        }}
      >
        <Text sx={{ ...theme.mixins.value }}>
          <Formatter value={70000} />
        </Text>
        <Text sx={{ ...theme.mixins.valueDescription }}>
          <Formatter value={3.72} />
        </Text>
      </Box>
    </Box>
  );
};

export default TokenItem;
