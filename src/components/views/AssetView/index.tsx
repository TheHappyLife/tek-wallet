"use client";
import { ListItem } from "@mui/material";
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

          <div className="grid grid-cols-4">
            <DepositFunction>
              <ListItem>
                <FunctionItem
                  icon={getIcon("deposit")}
                  label="Deposit"
                  className="w-full"
                />
              </ListItem>
            </DepositFunction>
            <WithdrawFunction>
              <ListItem>
                <FunctionItem
                  icon={getIcon("withdraw")}
                  label="Withdraw"
                  className="w-full"
                />
              </ListItem>
            </WithdrawFunction>
            <ListItem>
              <FunctionItem
                icon={getIcon("fortune", "gif")}
                label="Fortune"
                className="w-full"
              />
            </ListItem>
            <ListItem>
              <FunctionItem
                icon={getIcon("p2p", "gif")}
                label="P2P"
                className="w-full"
              />
            </ListItem>
          </div>
          <TokensBoard />
        </DefaultPageLayout>
      )}
    </>
  );
};
export default AssetView;
