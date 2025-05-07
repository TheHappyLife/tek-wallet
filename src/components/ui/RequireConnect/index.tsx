"use client";
import DrawerComponent, { DRAWER_DIRECTION, DrawerComponentRef } from "../DrawerComponent";
import AuthView from "../../../components/views/AuthView";
import { GeneralProps } from "../../../types/ui";
import useWalletData from "../../../hooks/useWalletData";
import { ReactEventHandler, useRef } from "react";
import { Box } from "@mui/material";
export interface RequireConnectProps extends GeneralProps {
  children: React.ReactNode;
}
function RequireConnect({ children }: RequireConnectProps) {
  const authViewRef = useRef<DrawerComponentRef>(null);
  const { isAuthenticated } = useWalletData();
  const backAuthView = () => {
    authViewRef.current?.close();
  };
  const stopPropagation: ReactEventHandler = (e) => {
    e.stopPropagation();
  };
  const handleOpenAuthView: ReactEventHandler = (e) => {
    e.stopPropagation();
    authViewRef.current?.open();
  };
  if (!isAuthenticated) {
    return (
      <>
        <Box sx={{ position: "relative" }}>
          {children}
          <Box sx={{ position: "absolute", inset: 0, zIndex: 10 }} onClick={handleOpenAuthView}></Box>
        </Box>
        <DrawerComponent ref={authViewRef} direction={DRAWER_DIRECTION.RIGHT} onClick={stopPropagation}>
          <AuthView onBack={backAuthView} />
        </DrawerComponent>
      </>
    );
  }

  return <>{children}</>;
}

export default RequireConnect;
