"use client";
import React, { useCallback, useEffect, useState } from "react";

import useWalletData from "../../hooks/useWalletData";
import { Activities, ActivitiesProviderDataType, ActivityTypes } from "./type";
import getActivitiesServices from "../../services/axios/get-activities-service";
import { GetActivitiesServiceQuery } from "../../services/axios/get-activities-service/type";
import { ACTIVITIES_PAGE_SIZE, ACTIVITIES_TYPE_ALL } from "./const";
export const initialActivities: ActivitiesProviderDataType = {
  isLoadingActivities: true,
  activities: undefined,
  updateActivities: () => {},
  activityTypes: [ACTIVITIES_TYPE_ALL],
  page: 1,
  gotoPage: () => {},
};

export const ActivitiesContext =
  React.createContext<ActivitiesProviderDataType>(initialActivities);
function ActivitiesProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useWalletData();
  const [isLoadingActivities, setIsLoadingActivities] = useState<boolean>(true);
  const [activities, setActivities] = React.useState<Activities | undefined>(
    undefined
  );
  const [activityTypes, setActivityTypes] = React.useState<
    ActivityTypes[] | undefined
  >(undefined);

  const [page, setPage] = useState<number>(1);

  const gotoPage = useCallback((page: number) => {
    setPage(page);
  }, []);

  const updateActivities = useCallback(
    async (query?: GetActivitiesServiceQuery) => {
      try {
        if (!isAuthenticated) {
          throw new Error("Authenticate to get receive tokens");
        }
        setIsLoadingActivities(true);
        const response = await getActivitiesServices(query);
        console.warn("🚀 ~ getBalance ~ response:", response);
        setActivityTypes([
          ACTIVITIES_TYPE_ALL,
          ...(response?.data?.transaction_types ?? []),
        ]);
        setActivities((prev) => {
          return {
            ...prev,
            [query?.transaction_type || ACTIVITIES_TYPE_ALL.slug]: [
              ...(prev?.[query?.transaction_type || ACTIVITIES_TYPE_ALL.slug] ??
                []),
              ...(response?.data?.transactions ?? []),
            ],
          };
        });
        setIsLoadingActivities(false);
      } catch (error) {
        console.error("🚀 ~ getBalance ~ error:", error);
        setIsLoadingActivities(false);
      }
    },
    [isAuthenticated]
  );

  useEffect(() => {
    if (isAuthenticated && !activities) {
      updateActivities({
        page,
        take: ACTIVITIES_PAGE_SIZE,
      });
    }
  }, [isAuthenticated, activities]);

  return (
    <ActivitiesContext.Provider
      value={{
        isLoadingActivities,
        activities,
        updateActivities,
        activityTypes,
        page,
        gotoPage,
      }}
    >
      {children}
    </ActivitiesContext.Provider>
  );
}

export default ActivitiesProvider;
