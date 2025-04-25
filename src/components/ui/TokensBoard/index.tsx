import useWalletData from "../../../hooks/useWalletData";
import Text from "../Text";
import CheckBoxComponent from "../CheckBoxComponent";
import TokenItem from "../TokenItem";
import { Box, Divider, useTheme } from "@mui/material";
import WaitingData from "../WaitingData";

const TokensBoard = () => {
  const { tokens } = useWalletData();
  const theme = useTheme();

  return (
    <Box
      sx={{
        ...theme.mixins.paper,
        backgroundColor: "background.black24",
        boxShadow: theme.shadows[1],
      }}
    >
      <Box
        sx={{
          ...theme.mixins.row,
          gap: theme.mixins.gaps.g12,
        }}
      >
        <Text sx={{ ...theme.mixins.value }}>Asset management</Text>
        <Box
          sx={{
            ...theme.mixins.row,
            gap: theme.mixins.gaps.g2,
            ml: "auto",
          }}
        >
          <Text sx={{ ...theme.mixins.valueDescription }}>
            Hide small assets
          </Text>
          <CheckBoxComponent
            sx={{ width: "1.5rem", height: "1.5rem" }}
            color="primary"
          />
        </Box>
      </Box>
      <Divider />
      <Box
        sx={{
          ...theme.mixins.column,
          gap: theme.mixins.gaps.g12,
          minHeight: "20rem",
        }}
      >
        {!!tokens && (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1.55fr 1fr 1fr",
              gap: theme.mixins.gaps.g12,
              fontSize: theme.typography.fontSize11,
              color: "text.white",
              lineHeight: theme.typography.leading140,
            }}
          >
            <Text sx={{ textAlign: "left" }}>Name</Text>
            <Text sx={{ textAlign: "left" }}>Listing Price</Text>
            <Text sx={{ textAlign: "right" }}>PnL</Text>
          </Box>
        )}
        {tokens?.map((item) => {
          const stringifiedTokenData = JSON.stringify({
            ...item,
          });

          return <TokenItem key={item.id} tokenData={stringifiedTokenData} />;
        })}
        {!tokens && <WaitingData sx={{ margin: "auto" }} />}
      </Box>
      {!!tokens && (
        <Text
          sx={{
            fontSize: theme.typography.fontSize12,
            color: "text.secondary",
            lineHeight: theme.typography.leading140,
            width: "fit-content",
            px: theme.mixins.customPadding.p5,
          }}
        >
          View all assets
        </Text>
      )}
    </Box>
  );
};

export default TokensBoard;
