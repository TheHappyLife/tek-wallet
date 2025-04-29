"use client";
import { Box, ListItem } from "@mui/material";
import DefaultPageLayout from "../../layouts/DefaultPageLayout";
import ReceiveFunction from "../../ui/ReceiveFunction";
import FunctionItem from "../../ui/FunctionItem";
import getIcon from "../../../utils/getIcon";
import WithdrawFunction from "../../ui/WithdrawFunction";
import TokensBoard from "../../ui/TokensBoard";
import useWalletData from "../../../hooks/useWalletData";
import Text from "../../ui/Text";
import { useTheme } from "@mui/material";
import AmountGroupAndChart from "../../ui/AmountGroupAndChart";
const AssetView = () => {
  const { isAuthenticated } = useWalletData();
  const theme = useTheme();

  return (
    <>
      {!isAuthenticated && (
        <Text sx={{ ...theme.mixins.sessionDescription }}>
          Please connect your wallet to get asset information
        </Text>
      )}
      {!!isAuthenticated && (
        <DefaultPageLayout>
          <AmountGroupAndChart />
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: theme.mixins.gaps.g12,
              position: "relative",
              zIndex: 50,
              my: theme.mixins.customMargin.m20,
            }}
          >
            <ReceiveFunction>
              <ListItem>
                <FunctionItem
                  icon={getIcon("receive")}
                  label="Receive"
                  sx={{ width: "100%" }}
                />
              </ListItem>
            </ReceiveFunction>
            <WithdrawFunction>
              <ListItem>
                <FunctionItem
                  icon={getIcon("withdraw")}
                  label="Withdraw"
                  sx={{ width: "100%" }}
                />
              </ListItem>
            </WithdrawFunction>
            <ListItem>
              <FunctionItem
                icon={getIcon("fortune", "gif")}
                label="Fortune"
                sx={{ width: "100%" }}
              />
            </ListItem>
            <ListItem>
              <FunctionItem
                icon={getIcon("p2p", "gif")}
                label="P2P"
                sx={{ width: "100%" }}
              />
            </ListItem>
          </Box>
          <TokensBoard />
        </DefaultPageLayout>
      )}
    </>
  );
};
export default AssetView;
