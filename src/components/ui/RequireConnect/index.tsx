"use client";
import DrawerComponent, {
  DRAWER_DIRECTION,
  DrawerComponentRef,
} from "../DrawerComponent";
import AuthView from "../../../components/views/AuthView";
import { GeneralProps } from "../../../types/ui";
import useWalletData from "../../../hooks/useWalletData";
import { useRef } from "react";
import { Box } from "@mui/material";
export interface RequireConnectProps extends GeneralProps {
  children: React.ReactNode;
}
function RequireConnect({ children, ...rest }: RequireConnectProps) {
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
          <Box {...rest} sx={{ position: "relative" }}>
            {children}
            <Box sx={{ position: "absolute", inset: 0, zIndex: 10 }}></Box>
          </Box>
        }
      >
        <AuthView onBack={backAuthView} />
      </DrawerComponent>
    );
  }

  return <>{children}</>;
}

export default RequireConnect;
