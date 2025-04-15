import cn from "../../../utils/cn";
import getIcon from "../../../utils/getIcon";
import Image from "../Image";
import Text from "../Text";
import clsx from "clsx";
interface StatusDisplayProps {
  className?: string;
  status: StatusDisplayType;
}

export enum StatusDisplayType {
  Success = "success",
  Error = "error",
  Warning = "warning",
  Info = "info",
  Loading = "loading",
  Normal = "normal",
}

const StatusDisplay = (props: StatusDisplayProps) => {
  return (
    <div className={cn("flex items-center gap-1", props.className)}>
      <Image
        src={getIcon(`status_${props.status}`, "gif")}
        sx={{ width: "1.5rem", height: "1.5rem" }}
      />
      <Text
        className={clsx("text-13", {
          "text-ui-text-error": props.status === StatusDisplayType.Error,
          "text-ui-text-warning": props.status === StatusDisplayType.Warning,
          "text-ui-text-success": props.status === StatusDisplayType.Success,
          "text-ui-text-loading": props.status === StatusDisplayType.Loading,
        })}
      >
        {props.status}
      </Text>
    </div>
  );
};

export default StatusDisplay;
