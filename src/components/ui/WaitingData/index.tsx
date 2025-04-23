import { GeneralProps } from "../../../types/ui";
import getIcon from "../../../utils/getIcon";
import Icon from "../Icon";
interface WaitingDataProps extends GeneralProps {}

const WaitingData = (props: WaitingDataProps) => {
  return (
    <Icon
      src={getIcon("waiting_data", "gif")}
      width={28}
      sx={{ ...props.sx }}
    />
  );
};

export default WaitingData;
