import { Box, useTheme } from "@mui/material";
import Icon from "../Icon";
import Text from "../Text";

interface FunctionItemProps {
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
      }}
    >
      <Icon
        src={props.icon}
        sx={{
          borderRadius: theme.mixins.theBorderRadius.full,
        }}
        width={44}
      />
      <Text
        sx={{
          color: "text.white",
          fontSize: "typography.fontSize13",
          lineHeight: "typography.lineHeight140",
        }}
      >
        {props.label}
      </Text>
    </Box>
  );
};

export default FunctionItem;
