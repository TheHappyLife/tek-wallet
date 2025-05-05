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
        gap: theme.mixins.gaps.g32,
        ...props.sx,
      }}
    >
      {!!field && (
        <Text
          sx={{
            ...theme.mixins.valueDescription,
            whiteSpace: "nowrap",
          }}
        >
          {field}
        </Text>
      )}
      {(!!value || !!valueDescription) && (
        <Box
          sx={{
            ...theme.mixins.column,
            flex: 1,
            alignItems: "end",
            gap: theme.mixins.gaps.g2,
          }}
        >
          {!!value && (
            <Text
              sx={{
                ...theme.mixins.value,
                textAlign: "right",
              }}
            >
              {value}
            </Text>
          )}
          {!!valueDescription && (
            <Text
              sx={{
                ...theme.mixins.valueDescription,
                textAlign: "right",
              }}
            >
              {valueDescription}
            </Text>
          )}
        </Box>
      )}
    </Box>
  );
};

export default LineValue;
