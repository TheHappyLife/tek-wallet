import { Box, useTheme } from "@mui/material";
import { GeneralProps, UnknownFunction } from "../../../types/ui";
import Text from "../Text";
import Icon from "../Icon";
import { ReactNode } from "react";
import Button from "../Button";
export interface EmptyDataProps extends GeneralProps {
  icon?: string;
  title?: ReactNode;
  description?: ReactNode;
  action?: UnknownFunction;
  actionText?: ReactNode;
}

function EmptyData(props: EmptyDataProps) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        ...theme.mixins.column,
        gap: theme.mixins.gaps.g16,
        alignItems: "center",
        justifyContent: "center",
        ...props.sx,
      }}
    >
      <Icon width={48} src={props.icon} />
      <Text sx={{ ...theme.mixins.sessionTitle }}>{props.title}</Text>
      <Text sx={{ ...theme.mixins.sessionDescription }}>
        {props.description}
      </Text>
      {props.action && (
        <Button.Primary onClick={props.action}>
          {props.actionText}
        </Button.Primary>
      )}
    </Box>
  );
}

export default EmptyData;
