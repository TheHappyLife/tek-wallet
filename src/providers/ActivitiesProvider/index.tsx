"use client";
import React, { useCallback, useEffect, useState } from "react";

import useWalletData from "../../hooks/useWalletData";
import { Activities, ActivitiesProviderDataType, ActivityTypes } from "./type";
import getActivitiesServices from "../../services/axios/get-activities-service";
import { GetActivitiesServiceQuery, TransactionSlug } from "../../services/axios/get-activities-service/type";
import { ACTIVITIES_PAGE_SIZE, ACTIVITIES_TYPE_ALL } from "./const";
export const initialActivities: ActivitiesProviderDataType = {
  isLoadingActivities: {},
  activities: undefined,
  updateActivities: () => {},
  activityTypes: [ACTIVITIES_TYPE_ALL],
  page: 1,
  gotoPage: () => {},
};

export const ActivitiesContext = React.createContext<ActivitiesProviderDataType>(initialActivities);
function ActivitiesProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useWalletData();
  const [isLoadingActivities, setIsLoadingActivities] = useState<Partial<Record<TransactionSlug, boolean>>>({});
  const [activities, setActivities] = React.useState<Activities | undefined>(undefined);
  const [activityTypes, setActivityTypes] = React.useState<ActivityTypes[] | undefined>(undefined);

  const [page, setPage] = useState<number>(1);

  const gotoPage = useCallback((page: number) => {
    setPage(page);
  }, []);

  const updateActivities = useCallback(
    async (query?: GetActivitiesServiceQuery) => {
      const slug = query?.transaction_types ?? ACTIVITIES_TYPE_ALL.slug;
      try {
        if (!isAuthenticated) {
          throw new Error("Authenticate to get receive tokens");
        }
        setIsLoadingActivities((prev) => ({
          ...prev,
          [slug]: true,
        }));
        const response = await getActivitiesServices(query);
        console.warn("🚀 ~ getBalance ~ response:", response);
        setActivityTypes([ACTIVITIES_TYPE_ALL, ...(response?.data?.transaction_types ?? [])]);
        setActivities((prev) => {
          return {
            ...(prev ?? {}),
            [slug]: [...(prev?.[slug] ?? []), ...(response?.data?.transactions ?? [])],
          };
        });
        setIsLoadingActivities((prev) => ({
          ...prev,
          [slug]: false,
        }));
      } catch (error) {
        console.error("🚀 ~ getBalance ~ error:", error);
        setIsLoadingActivities((prev) => ({
          ...prev,
          [slug]: false,
        }));
      }
    },
    [isAuthenticated]
  );

  useEffect(() => {
    if (!!activities) return;
    updateActivities({
      page,
      take: ACTIVITIES_PAGE_SIZE,
    });
  }, [updateActivities, activities]);

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
