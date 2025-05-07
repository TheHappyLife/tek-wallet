"use client";
import DrawerComponent, { DRAWER_DIRECTION, DrawerComponentRef } from "../DrawerComponent";
import { GeneralProps } from "../../../types/ui";
import { useRef } from "react";
import RequireConnect from "../RequireConnect";
import GetSeedPhraseWalletView from "../../views/GetSeedPhraseWalletView";
import { Box } from "@mui/material";
export interface GetWalletSeedPhraseProps extends GeneralProps {
  children: React.ReactNode;
}
function GetWalletSeedPhrase({ children, ...rest }: GetWalletSeedPhraseProps) {
  const getSeedPhraseViewRef = useRef<DrawerComponentRef>(null);
  const backAuthView = () => {
    getSeedPhraseViewRef.current?.close();
  };

  return (
    <RequireConnect>
      <DrawerComponent
        ref={getSeedPhraseViewRef}
        direction={DRAWER_DIRECTION.RIGHT}
        trigger={
          <Box {...rest} sx={{ position: "relative" }}>
            {children}
            <Box sx={{ position: "absolute", inset: 0, zIndex: 10 }}></Box>
          </Box>
        }
      >
        <GetSeedPhraseWalletView onBack={backAuthView} />
      </DrawerComponent>
    </RequireConnect>
  );
}

export default GetWalletSeedPhrase;
