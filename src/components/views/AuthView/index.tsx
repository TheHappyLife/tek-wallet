"use client";
import { GeneralProps } from "../../../types/ui";
import DefaultPageLayout from "../../../components/layouts/DefaultPageLayout";
import Image from "../../../components/ui/Image";
import Button from "../../../components/ui/Button";
import Text from "../../../components/ui/Text";
import DrawerComponent, {
  DRAWER_DIRECTION,
  DrawerComponentRef,
} from "../../../components/ui/DrawerComponent";
import CreateWalletView from "../CreateWalletView";
import { useRef } from "react";
import getIcon from "../../../utils/getIcon";
import ImportWalletView from "../ImportWalletView";
import ChildPageLayout from "../../layouts/ChildPageLayout";
import { Box, useTheme } from "@mui/material";
import PageHeader from "../../ui/PageHeader";

interface AuthViewProps extends GeneralProps {
  onBack?: () => void;
}

const AuthView = (props: AuthViewProps) => {
  const theme = useTheme();
  const createWalletDrawerRef = useRef<DrawerComponentRef>(null);
  const importWalletDrawerRef = useRef<DrawerComponentRef>(null);
  const onBackCreateWallet = () => {
    createWalletDrawerRef.current?.close();
  };
  const onBackImportWallet = () => {
    importWalletDrawerRef.current?.close();
  };

  return (
    <ChildPageLayout
      header={
        <PageHeader
          title="Connect Wallet"
          overrideBack={props.onBack}
        ></PageHeader>
      }
    >
      <DefaultPageLayout
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          ...props.sx,
        }}
      >
        <Image
          src={getIcon("eth")}
          sx={{
            width: "80%",
            aspectRatio: "1",
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            marginTop: "auto",
          }}
        >
          <DrawerComponent
            sx={{
              width: "100%",
            }}
            ref={createWalletDrawerRef}
            trigger={
              <Button.Primary sx={{ width: "100%" }}>
                Create a new wallet
              </Button.Primary>
            }
            direction={DRAWER_DIRECTION.RIGHT}
          >
            <CreateWalletView onBack={onBackCreateWallet} />
          </DrawerComponent>
          <DrawerComponent
            ref={importWalletDrawerRef}
            trigger={
              <Button.Secondary sx={{ width: "100%" }}>
                I have a wallet
              </Button.Secondary>
            }
            direction={DRAWER_DIRECTION.RIGHT}
          >
            <ImportWalletView onBack={onBackImportWallet} />
          </DrawerComponent>

          <Text
            sx={{
              ...theme.mixins.sessionDescription,
            }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci,
            eos odio. Accusamus ea praesentium unde deserunt delectus, nihil
            corporis, mollitia ipsum impedit cupiditate eveniet vero esse
            facilis, incidunt in sequi?
          </Text>
        </Box>
      </DefaultPageLayout>
    </ChildPageLayout>
  );
};

export default AuthView;
