import { GeneralProps } from "../../../types/ui";
import { styled } from "@mui/system";
interface ImageProps extends GeneralProps {
  className?: string;
  src?: string;
  alt?: string;
}

const StyledImage = styled("img")<ImageProps>((sx) => ({
  display: "block",
  ...sx,
}));

const Image = (props: ImageProps) => {
  return (
    <StyledImage
      onClick={props.onClick}
      src={props.src}
      alt={props.alt}
      sx={props.sx}
    />
  );
};

export default Image;
