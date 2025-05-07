import { Box, Chip, ToggleButton, ToggleButtonGroup, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import Text from "../Text";
import { subDays } from "date-fns";
import { GeneralProps } from "../../../types/ui";
import getMaxTime from "../../../utils/getMaxTime";
import formatDate from "../../../utils/formatDate";

export enum TimeFilterType {
  ALL = "all",
  TODAY = "today",
  SEVEN_DAYS = "7 days",
  THIRTY_DAYS = "30 days",
}

export interface TimeFilterProps extends GeneralProps {
  initialValue?: TimeFilterType;
  onChange?: (value: TimeFilterData, event?: React.MouseEvent<HTMLElement>) => any;
  hideAll?: boolean;
}

export interface TimeFilterData {
  type: TimeFilterType;
  startDate?: string;
  endDate?: string;
}

const TimeFilter = ({ initialValue = TimeFilterType.ALL, onChange, hideAll }: TimeFilterProps) => {
  const theme = useTheme();
  const [value, setValue] = useState<TimeFilterData>({
    type: initialValue,
  });

  const getTimeFilterData = (type: TimeFilterType) => {
    const newData: TimeFilterData = {
      type: type,
    };

    switch (type) {
      case TimeFilterType.TODAY:
        const { startDate, endDate } = getMaxTime(new Date().toISOString(), new Date().toISOString()) ?? {};
        newData.startDate = startDate;
        newData.endDate = endDate;
        break;
      case TimeFilterType.SEVEN_DAYS: {
        const today = new Date();
        const sevenPreDay = subDays(today, 7);
        const { startDate, endDate } = getMaxTime(sevenPreDay.toISOString(), today.toISOString()) ?? {};
        newData.startDate = startDate;
        newData.endDate = endDate;
        break;
      }
      case TimeFilterType.THIRTY_DAYS: {
        const today = new Date();
        const oneMonthPreDay = subDays(today, 30);
        const { startDate, endDate } = getMaxTime(oneMonthPreDay.toISOString(), today.toISOString()) ?? {};
        newData.startDate = startDate;
        newData.endDate = endDate;
        break;
      }
      default: {
        break;
      }
    }

    return newData;
  };

  const handleChange = (event: React.MouseEvent<HTMLElement>, newValueArray: TimeFilterType[]) => {
    try {
      const newValue = newValueArray?.[0];
      if (newValue === value?.type) return;

      const newData = getTimeFilterData(newValue);
      setValue(newData);
      onChange?.(newData, event);
    } catch (err) {
      console.error("🚀 ~ err:", err);
    }
  };

  const getTimeFilterLabel = (dateData: TimeFilterData) => {
    try {
      switch (dateData?.type) {
        case TimeFilterType.TODAY:
          return `${formatDate(dateData?.startDate || "")}`;
        case TimeFilterType.SEVEN_DAYS:
        case TimeFilterType.THIRTY_DAYS:
          return `${formatDate(dateData?.startDate || "")} - ${formatDate(dateData?.endDate || "")}`;
        default:
          return null;
      }
    } catch (err) {
      console.error("🚀 ~ err:", err);

      return null;
    }
  };

  useEffect(() => {
    if (!initialValue) return;
    const newData = getTimeFilterData(initialValue);
    setValue(newData);
    onChange?.(newData);
  }, []);

  return (
    <Box
      sx={{
        ...theme.mixins.column,
        gap: theme.mixins.gaps.g6,
        alignItems: "flex-start",
      }}
    >
      <Text
        sx={{
          ...theme.mixins.sessionDescription,
        }}
      >
        {getTimeFilterLabel(value)}
      </Text>
      <ToggleButtonGroup defaultValue={initialValue} onChange={handleChange} sx={{ gap: theme.mixins.gaps.g8 }}>
        {Object.values(TimeFilterType).map((type) => {
          if (hideAll && type === TimeFilterType.ALL) return null;

          return (
            <ToggleButton
              aria-label={type}
              value={type}
              key={type}
              sx={{
                p: 0,
                border: "none",
              }}
            >
              <Chip
                label={type}
                variant="outlined"
                sx={{
                  textTransform: "capitalize",
                  leading: theme.typography.leading100,
                  borderColor: "currentColor",
                  color: value?.type === type ? "text.white" : "text.white64",
                }}
                onClick={() => {}}
              />
            </ToggleButton>
          );
        })}
      </ToggleButtonGroup>
    </Box>
  );
};

export default TimeFilter;
