"use client";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { GeneralProps, UnknownFunction } from "../../../types/ui";
import DrawerComponent, { DrawerComponentRef } from "../DrawerComponent";
import RequireConnect from "../RequireConnect";
import DefaultPageLayout from "../../layouts/DefaultPageLayout";
import ChildPageLayout from "../../layouts/ChildPageLayout";
import PageHeader from "../PageHeader";
import SwiperControlled from "../SwiperControlled";
import useActivities from "../../../hooks/useActivities";
import { Tab } from "@mui/material";
import { SwiperSlide } from "swiper/react";
import Text from "../Text";

interface ActivitiesProps extends GeneralProps {
  onClose?: UnknownFunction;
  onOpen?: UnknownFunction;
}

type ActivitiesRef = {
  open: () => void;
  close: () => void;
};

const Activities = forwardRef<ActivitiesRef, ActivitiesProps>((props, ref) => {
  const drawerRef = useRef<DrawerComponentRef>(null);
  const { activityTypes, activities } = useActivities();
  const open = () => {
    drawerRef.current?.open();
  };
  const close = () => {
    drawerRef.current?.close();
  };
  useImperativeHandle(ref, () => ({
    open,
    close,
  }));

  const handleOnClose = () => {
    props.onClose?.();
  };

  const handleBack = () => {
    close();
    handleOnClose();
  };

  return (
    <RequireConnect>
      <DrawerComponent
        ref={drawerRef}
        trigger={props.children}
        onOpen={props.onOpen}
        onClose={handleOnClose}
      >
        <ChildPageLayout
          header={
            <PageHeader
              title="Activities"
              overrideBack={handleBack}
            ></PageHeader>
          }
        >
          <DefaultPageLayout>
            <SwiperControlled
              tabs={activityTypes?.map((type, index) => {
                return (
                  <Tab
                    disableRipple
                    key={index}
                    label={type.name}
                    value={index}
                    data-index={index}
                  />
                );
              })}
            >
              {activityTypes?.map((type, index) => {
                return (
                  <SwiperSlide key={index}>
                    <Text
                      onClick={() => {
                        console.warn(activities);
                      }}
                    >
                      {type.name}
                    </Text>
                  </SwiperSlide>
                );
              })}
            </SwiperControlled>
          </DefaultPageLayout>
        </ChildPageLayout>
      </DrawerComponent>
    </RequireConnect>
  );
});

Activities.displayName = "Activities";

export default Activities;
