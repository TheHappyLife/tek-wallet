import ModalTitle from "../ModalTitle";
import CloseModal from "../CloseModal";
import { Box, Divider, useTheme } from "@mui/material";
import { GeneralProps } from "../../../types/ui";
import getImage from "../../../utils/getImage";
import { ReactNode } from "react";
interface ModalLayoutProps extends GeneralProps {
  title?: ReactNode;
  onClose?: () => void;
  hideHeader?: boolean;
  overrideHeader?: ReactNode;
}

const ModalLayout = (props: ModalLayoutProps) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        borderTop: `2px ${theme.palette.secondary.main} solid`,
        borderRadius: "1.5rem 1.5rem 0 0",
        maxHeight: "100dvh",
        backgroundImage: `url(${getImage("modal-bg", "jpg")})`,
        backgroundSize: "cover",
        backgroundPosition: "top",
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: "column",
        ...theme.mixins.pagePadding,
        ...props.sx,
      }}
    >
      {!props.hideHeader && !props.overrideHeader && (
        <>
          <Box
            sx={{
              width: "100%",
              position: "relative",
            }}
          >
            <ModalTitle>{props.title}</ModalTitle>
            <CloseModal
              sx={{
                position: "absolute",
                right: 0,
                top: "50%",
                transform: "translateY(-50%)",
              }}
              onClick={props.onClose}
            />
          </Box>
          {props.title && <Divider sx={{ my: "0.75rem" }} />}
        </>
      )}
      {props.overrideHeader}
      <Box sx={{ flex: 1, overflowY: "auto" }}>{props.children}</Box>
    </Box>
  );
};

export default ModalLayout;
