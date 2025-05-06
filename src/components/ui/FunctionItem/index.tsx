import { Box, useTheme } from "@mui/material";
import Icon from "../Icon";
import Text from "../Text";
import { GeneralProps } from "../../../types/ui";
interface FunctionItemProps extends GeneralProps {
  className?: string;
  icon?: string;
  label?: string;
}

const FunctionItem = (props: FunctionItemProps) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        ...theme.mixins.column,
        alignItems: "center",
        gap: theme.mixins.gaps.g6,
        ...props.sx,
      }}
    >
      <Icon
        src={props.icon}
        sx={{
          borderRadius: theme.mixins.customRadius.full,
        }}
        width={44}
      />
      <Text
        sx={{
          color: "text.white",
          fontSize: theme.typography.fontSize13,
          lineHeight: theme.typography.leading140,
        }}
      >
        {props.label}
      </Text>
    </Box>
  );
};

export default FunctionItem;
