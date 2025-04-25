"use client";
import { Box, ListItem } from "@mui/material";
import DefaultPageLayout from "../../layouts/DefaultPageLayout";
import DepositFunction from "../../ui/DepositFunction";
import FunctionItem from "../../ui/FunctionItem";
import getIcon from "../../../utils/getIcon";
import WithdrawFunction from "../../ui/WithdrawFunction";
import TokensBoard from "../../ui/TokensBoard";
import useWalletData from "../../../hooks/useWalletData";
import Text from "../../ui/Text";
import { useTheme } from "@mui/material";
import AmountGroupAndChart from "../../ui/AmountGroupAndChart";
import { QrReader } from "react-qr-reader";
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
          <QrReader
            containerStyle={{
              width: "300px",
              border: "1px solid red",
            }}
            constraints={{ facingMode: "environment" }}
            // onResult={props.onResult}
            videoStyle={{
              objectFit: "cover",
              width: "100%",
              border: "1px solid blue",
              zIndex: 5000,
            }}
          />
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: theme.mixins.gaps.g12,
            }}
          >
            <DepositFunction>
              <ListItem>
                <FunctionItem
                  icon={getIcon("deposit")}
                  label="Deposit"
                  sx={{ width: "100%" }}
                />
              </ListItem>
            </DepositFunction>
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
