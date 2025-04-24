import { Box, ListItem, ListItemProps, useTheme } from "@mui/material";
import { ReactEventHandler } from "react";
import Icon from "../Icon";
import getIcon from "../../../utils/getIcon";
import Text from "../Text";

export interface ListItemCustomProps extends Omit<ListItemProps, "title"> {
  title: React.ReactNode;
  description: React.ReactNode;
  icon: string;
  onClick?: ReactEventHandler;
  disabled?: boolean;
  rightIcon?: React.ReactNode | boolean;
  hideDefaultRightIcon?: boolean;
}

function ListItemCustom({
  title,
  description,
  icon,
  rightIcon,
  hideDefaultRightIcon,
  sx,
  ...rest
}: ListItemCustomProps) {
  const theme = useTheme();

  return (
    <ListItem {...rest} sx={{ ...theme.mixins.row, ...sx }}>
      <Icon width={32} src={icon} />
      <Box
        sx={{
          ...theme.mixins.column,
          gap: theme.mixins.gaps.g4,
          alignItems: "start",
          flex: 1,
        }}
      >
        <Text sx={{ ...theme.mixins.listTitle }}>{title}</Text>
        <Text sx={{ ...theme.mixins.listDescription }}>{description}</Text>
      </Box>
      {rightIcon ??
        (!hideDefaultRightIcon && (
          <Icon width={10} src={getIcon("arrow-right")} sx={{ ml: "auto" }} />
        ))}
    </ListItem>
  );
}

export default ListItemCustom;
