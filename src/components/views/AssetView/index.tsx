"use client";
import { ListItem } from "@mui/material";
import DefaultPageLayout from "../../layouts/DefaultPageLayout";
import DepositFunction from "../../ui/DepositFunction";
import FunctionItem from "../../ui/FunctionItem";
import getIcon from "../../../utils/getIcon";
import WithdrawFunction from "../../ui/WithdrawFunction";
import TokensBoard from "../../ui/TokensBoard";

const AssetView = () => {
  return (
    <DefaultPageLayout>
      {/* <AmountGroupAndChart /> */}

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
  );
};
export default AssetView;
