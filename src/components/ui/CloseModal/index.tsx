import { GeneralProps } from "../../../types/ui";
import getIcon from "../../../utils/getIcon";
import Icon from "../Icon";

interface CloseModalProps extends GeneralProps {}

const CloseModal = (props: CloseModalProps) => {
  const { ...rest } = props;

  return (
    <Icon
      src={getIcon("close_modal")}
      sx={{ width: "1.5rem", height: "1.5rem", ...props.sx }}
      {...rest}
    />
  );
};

export default CloseModal;
