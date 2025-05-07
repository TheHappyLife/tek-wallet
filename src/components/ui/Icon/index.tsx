import { Box, SxProps } from "@mui/material";
export interface IconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  sx?: SxProps;
}

const Icon = (props: IconProps) => {
  const { src, alt, onClick, width, height, sx, ...rest } = props;

  return (
    <Box
      component="img"
      src={src}
      alt={alt}
      onClick={onClick}
      {...rest}
      sx={{
        display: "block",
        width: (width ?? height ?? false) ? `${(width || height || 0) / 16}rem` : "auto",
        height: (height ?? width ?? false) ? `${(height || width || 0) / 16}rem` : "auto",
        ...sx,
      }}
    />
  );
};
export default Icon;
