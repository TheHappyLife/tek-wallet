import { toBlob } from "html-to-image";
import { useState } from "react";
import { GeneralProps } from "../../../types/ui";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";
interface SharePropsType extends GeneralProps {
  elementId: string;
  backgroundColor?: string;
  skipFonts?: boolean;
  backupMessage?: string;
  shareTitle?: string;
  message?: string;
}
function Share({
  children,
  elementId,
  backgroundColor,
  skipFonts = true,
  message,
  shareTitle = "Shared Image",
}: SharePropsType) {
  const [isRepairing, setIsRepairing] = useState(false);
  const handleShareImage = async () => {
    const el = document.getElementById(elementId);
    if (el) {
      try {
        // Check if the Web Share API is available
        if (!navigator.share) {
          // noti?.error(translate("Sharing is not supported on your device or browser"));
          throw new Error("Sharing is not supported on your device or browser");
        }

        setIsRepairing(true);
        const blob = await toBlob(el, {
          quality: 1,
          cacheBust: true,
          skipFonts: skipFonts,
          backgroundColor,
        });
        if (!blob) return;

        const file = new File([blob], "shared-image.png", {
          type: "image/png",
        });

        try {
          await navigator.share({
            title: shareTitle,
            text: message,
            files: [file],
          });
          setIsRepairing(false);
        } catch (error) {
          console.error("🚀 ~ handleShareImage ~ error:", error);

          return;
        }
      } catch (error) {
        setIsRepairing(false);
        console.error("Error capturing image:", error);

        return;
      }
    }
  };

  return (
    <Box onClick={handleShareImage} sx={{ position: "relative" }}>
      {children}
      {isRepairing && (
        <Box
          sx={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            minHeight: "100%",
            minWidth: "100%",
            backgroundColor: "background.black",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            fontSize: "0.8em",
            color: "text.secondary.main",
            whiteSpace: "nowrap",
          }}
        >
          <CircularProgress size="0.75rem" />
          {"preparing"}
        </Box>
      )}
    </Box>
  );
}

export default Share;
