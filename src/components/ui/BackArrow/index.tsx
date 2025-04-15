import getIcon from "../../../utils/getIcon";
import Icon from "../Icon";
import { GeneralProps } from "../../../types/ui";

interface BackArrowProps extends GeneralProps {}

const BackArrow = (props: BackArrowProps) => {
  const { ...rest } = props;

  return (
    <Icon
      src={getIcon("arrow_back")}
      sx={{
        width: "1.5rem",
        height: "1.5rem",
        ...props.sx,
      }}
      {...rest}
    />
  );
};

export default BackArrow;
