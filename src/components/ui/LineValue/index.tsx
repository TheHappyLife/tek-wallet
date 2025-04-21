"use client";
import { GeneralProps } from "../../../types/ui";
import Text from "../Text";
import { Box, useTheme } from "@mui/material";
import { ReactNode } from "react";

interface LineValueProps extends GeneralProps {
  field?: ReactNode;
  value?: ReactNode;
  valueDescription?: ReactNode;
}

const LineValue = (props: LineValueProps) => {
  const theme = useTheme();
  const { field, value, valueDescription } = props;

  return (
    <Box
      sx={{
        ...theme.mixins.row,
        alignItems: "start",
        gap: theme.mixins.gaps.g16,
        ...props.sx,
      }}
    >
      <Text
        sx={{
          ...theme.mixins.valueDescription,
        }}
      >
        {field}
      </Text>
      <Box
        sx={{
          ...theme.mixins.column,
          alignItems: "end",
          gap: theme.mixins.gaps.g2,
        }}
      >
        <Text
          sx={{
            ...theme.mixins.value,
          }}
        >
          {value}
        </Text>
        <Text
          sx={{
            ...theme.mixins.valueDescription,
          }}
        >
          {valueDescription}
        </Text>
      </Box>
    </Box>
  );
};

export default LineValue;
