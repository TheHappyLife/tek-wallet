import ModalTitle from "../ModalTitle";
import CloseModal from "../CloseModal";
import { Box, Divider, useTheme } from "@mui/material";
import { GeneralProps } from "../../../types/ui";
import getImage from "../../../utils/getImage";
interface ModalLayoutProps extends GeneralProps {
  title?: string;
  onClose?: () => void;
  hideHeader?: boolean;
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
      }}
    >
      {!props.hideHeader && (
        <>
          <Box
            sx={{
              width: "100%",
              position: "relative",
              minHeight: "2rem",
            }}
          >
            <ModalTitle>{props.title}</ModalTitle>
            <CloseModal
              sx={{
                position: "absolute",
                right: "1em",
                top: "50%",
                transform: "translateY(-50%)",
              }}
              onClick={props.onClose}
            />
          </Box>
          <Divider sx={{ my: "0.75rem" }} />
        </>
      )}
      <Box sx={{ flex: 1, overflowY: "auto" }}>{props.children}</Box>
    </Box>
  );
};

export default ModalLayout;
