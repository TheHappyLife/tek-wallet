import { Box } from "@mui/material";
import { GeneralProps } from "../../../types/ui";
export interface IconProps
  extends Omit<GeneralProps, "onClick">,
    React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  alt?: string;
}

const Icon = (props: IconProps) => {
  const { src, alt, onClick, ...rest } = props;

  return (
    <Box
      component="img"
      src={src}
      alt={alt}
      onClick={onClick}
      {...rest}
      sx={{
        display: "block",
      }}
    />
  );
};
export default Icon;
