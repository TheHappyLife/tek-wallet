import { Box, BoxProps } from "@mui/material";
interface ImageProps extends BoxProps {
  src?: string;
  alt?: string;
}

const Image = (props: ImageProps) => {
  return (
    <Box
      component="img"
      onClick={props.onClick}
      src={props.src}
      alt={props.alt}
      sx={{ display: "block", ...props.sx }}
    />
  );
};

export default Image;
