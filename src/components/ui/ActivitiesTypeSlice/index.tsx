import { Box, useTheme } from "@mui/material";
import getIcon from "../../../utils/getIcon";
import EmptyData from "../EmptyData";
import ActivityItem from "../ActivityItem";
import { TransactionType } from "../../../services/axios/get-activities-service/type";
import useActivities from "../../../hooks/useActivities";
import { useEffect, useMemo } from "react";
import WaitingData from "../WaitingData";

export interface ActivitiesTypeSlicePropsType {
  type: TransactionType;
  isActive?: boolean;
}

export enum Status {
  Loading = "loading",
  Empty = "empty",
  Filled = "filled",
}

const prefix = "activities_";

function ActivitiesTypeSlice(props: ActivitiesTypeSlicePropsType) {
  const theme = useTheme();
  const { activities, updateActivities, isLoadingActivities } = useActivities();
  const { type, isActive } = props;
  const activitiesByType = useMemo(() => {
    if (!type?.slug) return undefined;

    return activities?.[type.slug];
  }, [type, activities]);
  const status = useMemo(() => {
    if (!type?.slug || !activitiesByType) return Status.Loading;
    if (!!activitiesByType?.length) return Status.Filled;

    return Status.Empty;
  }, [type, activitiesByType]);

  useEffect(() => {
    if (!isActive || !type?.slug || !!activitiesByType || isLoadingActivities[type.slug]) return;
    updateActivities({
      transaction_types: type.slug,
      page: 1,
      take: 10,
    });
  }, [isActive, type, activitiesByType, updateActivities]);

  return (
    <Box sx={{ width: "100%", height: "100%", display: "flex" }}>
      {status === Status.Loading && <WaitingData sx={{ margin: "auto" }} />}
      {status === Status.Empty && (
        <EmptyData
          sx={{ margin: "auto" }}
          icon={getIcon(prefix + "empty_" + type.slug)}
          description={`No ${type.name?.toLowerCase()} activity`}
        />
      )}
      {status === Status.Filled && (
        <Box
          sx={{
            ...theme.mixins.column,
            gap: theme.mixins.gaps.g12,
            paddingTop: theme.mixins.customPadding.p16,
          }}
        >
          {activitiesByType?.map((activity, index) => {
            if (!activity) return null;
            const dataAsJson = JSON.stringify(activity);

            return <ActivityItem key={index} data={dataAsJson} />;
          })}
        </Box>
      )}
    </Box>
  );
}

export default ActivitiesTypeSlice;
