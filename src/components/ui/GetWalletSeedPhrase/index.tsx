"use client";
import DrawerComponent, {
  DRAWER_DIRECTION,
  DrawerComponentRef,
} from "../DrawerComponent";
import { GeneralProps } from "../../../types/ui";
import cn from "../../../utils/cn";
import { useRef } from "react";
import RequireConnect from "../RequireConnect";
import GetSeedPhraseWalletView from "../../views/GetSeedPhraseWalletView";
export interface GetWalletSeedPhraseProps extends GeneralProps {
  children: React.ReactNode;
}
function GetWalletSeedPhrase({ children, ...props }: GetWalletSeedPhraseProps) {
  const { className } = props;
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
          <button className={cn("relative", className)}>
            {children} <div className="absolute inset-0 z-10"></div>
          </button>
        }
      >
        <GetSeedPhraseWalletView onBack={backAuthView} />
      </DrawerComponent>
    </RequireConnect>
  );
}

export default GetWalletSeedPhrase;
