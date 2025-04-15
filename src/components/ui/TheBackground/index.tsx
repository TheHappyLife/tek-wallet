import { Box } from "@mui/material";
import { GeneralProps } from "../../../types/ui";
import getImage from "../../../utils/getImage";
interface TheBackgroundProps extends GeneralProps {
  className?: string;
}

const TheBackground = (props: TheBackgroundProps) => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${getImage("main_bg", "jpg")})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        ...props.sx,
      }}
    >
      {props.children}
    </Box>
  );
};

export default TheBackground;
