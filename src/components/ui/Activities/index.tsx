"use client";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { GeneralProps, UnknownFunction } from "../../../types/ui";
import DrawerComponent, {
  DRAWER_DIRECTION,
  DrawerComponentRef,
} from "../DrawerComponent";
import RequireConnect from "../RequireConnect";
import DefaultPageLayout from "../../layouts/DefaultPageLayout";
import ChildPageLayout from "../../layouts/ChildPageLayout";
import PageHeader from "../PageHeader";
import SwiperControlled from "../SwiperControlled";
import useActivities from "../../../hooks/useActivities";
import { Tab, useTheme } from "@mui/material";
import { SwiperSlide } from "swiper/react";
import ActivitiesTypeSlice from "../ActivitiesTypeSlice";

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
  const theme = useTheme();
  const { activityTypes } = useActivities();
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
        disableSwipe
        direction={DRAWER_DIRECTION.RIGHT}
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
          <DefaultPageLayout sx={{ height: "100%" }}>
            <SwiperControlled
              swiperProps={{
                slidesPerView: 1,
                spaceBetween: 40,
              }}
              tabs={activityTypes?.map((type, index) => {
                return (
                  <Tab
                    key={index}
                    label={type.name}
                    value={index}
                    data-index={index}
                    sx={{
                      padding: `${theme.mixins.customPadding.p16} ${theme.mixins.customPadding.p8}`,
                      minHeight: "unset",
                      minWidth: "unset",
                      textTransform: "capitalize",
                      color: theme.palette.text.white64,
                      transition: "all 0.3s linear",
                      borderColor: "currentcolor",
                      "&.Mui-selected": {
                        color: theme.palette.text.white,
                      },
                    }}
                  />
                );
              })}
              sx={{
                height: "100%",
              }}
              swiperStyle={{
                flex: 1,
              }}
            >
              {activityTypes?.map((type, index) => {
                return (
                  <SwiperSlide
                    key={index}
                    style={{
                      position: "relative",
                    }}
                  >
                    <ActivitiesTypeSlice type={type} isActive={true} />
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
