import { Box } from "@mui/material";
import { GeneralProps } from "../../../types/ui";
export interface IconProps
  extends Omit<GeneralProps, "onClick">,
    React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
}

const Icon = (props: IconProps) => {
  const { src, alt, onClick, width, height, ...rest } = props;

  return (
    <Box
      component="img"
      src={src}
      alt={alt}
      onClick={onClick}
      {...rest}
      sx={{
        display: "block",
        width:
          (width ?? height ?? false)
            ? `${(width || height || 0) / 16}rem`
            : "auto",
        height:
          (height ?? width ?? false)
            ? `${(height || width || 0) / 16}rem`
            : "auto",
        ...props.sx,
      }}
    />
  );
};
export default Icon;
