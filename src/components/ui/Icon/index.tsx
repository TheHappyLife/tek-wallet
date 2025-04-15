import cn from "../../../utils/cn";
import { GeneralProps } from "../../../types/ui";
export interface IconProps
  extends Omit<GeneralProps, "onClick">,
    React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  alt?: string;
}

const Icon = (props: IconProps) => {
  const { src, alt, className, onClick, ...rest } = props;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={cn("block", className)}
      src={src}
      alt={alt}
      onClick={onClick}
      {...rest}
    />
  );
};

export default Icon;
