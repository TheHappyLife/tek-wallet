"use client";
import DrawerComponent, {
  DRAWER_DIRECTION,
  DrawerComponentRef,
} from "../DrawerComponent";
import AuthView from "../../../components/views/AuthView";
import { GeneralProps } from "../../../types/ui";
import cn from "../../../utils/cn";
import useWalletData from "../../../hooks/useWalletData";
import { useRef } from "react";
export interface RequireConnectProps extends GeneralProps {
  children: React.ReactNode;
}
function RequireConnect({ children, ...props }: RequireConnectProps) {
  const { className } = props;
  const authViewRef = useRef<DrawerComponentRef>(null);
  const { isAuthenticated } = useWalletData();
  const backAuthView = () => {
    authViewRef.current?.close();
  };
  if (!isAuthenticated) {
    return (
      <DrawerComponent
        ref={authViewRef}
        direction={DRAWER_DIRECTION.RIGHT}
        trigger={
          <button className={cn("relative", className)}>
            {children} <div className="absolute inset-0 z-10"></div>
          </button>
        }
      >
        <AuthView onBack={backAuthView} />
      </DrawerComponent>
    );
  }

  return <>{children}</>;
}

export default RequireConnect;
