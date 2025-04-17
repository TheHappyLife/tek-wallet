import { useTheme } from "@mui/material";
import { GeneralProps } from "../../../types/ui";
import Text from "../Text";

interface ModalTitleProps extends GeneralProps {}

const ModalTitle = (props: ModalTitleProps) => {
  const { children, sx, ...rest } = props;
  const theme = useTheme();

  return (
    <Text
      {...rest}
      sx={{
        ...theme.mixins.sessionTitle,
        ...sx,
      }}
    >
      {children}
    </Text>
  );
};

export default ModalTitle;
