import { Swiper, SwiperProps, SwiperRef } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";
import { GeneralProps } from "../../../types/ui";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { Box, Tabs, SxProps } from "@mui/material";
interface SwiperControlledProps extends GeneralProps {
  tabs?: React.ReactNode[];
  initialActiveTab?: number;
  tabsSx?: SxProps;
  swiperProps?: SwiperProps;
  disableSwipe?: boolean;
  swiperStyle?: Record<string, string | number>;
}

export interface SwiperControlledRef {
  slideTo: (index: number) => void;
  next: () => void;
  prev: () => void;
  update: () => void;
}

const SwiperControlled = forwardRef<SwiperControlledRef, SwiperControlledProps>((props, ref) => {
  const [activeTab, setActiveTab] = useState(props.initialActiveTab || 0);
  const swiperRef = useRef<SwiperRef>(null);
  const slideTo = (index: number) => {
    setActiveTab(index);
    swiperRef.current?.swiper?.slideTo(index);
  };
  const next = () => {
    swiperRef.current?.swiper?.slideNext();
  };
  const prev = () => {
    swiperRef.current?.swiper?.slidePrev();
  };
  const update = () => {
    swiperRef.current?.swiper?.update();
  };
  useImperativeHandle(ref, () => ({
    slideTo,
    next,
    prev,
    update,
  }));
  const handleSlideChange = (swiper: SwiperType) => {
    setActiveTab(swiper.activeIndex);
  };
  const handleTabChange = (event: React.SyntheticEvent, value: number) => {
    setActiveTab(value);
    swiperRef.current?.swiper?.slideTo(value);
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        ...props.sx,
      }}
    >
      {props.tabs && (
        <Box
          sx={{
            maxWidth: "100%",
          }}
        >
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              minHeight: "unset",
              ...props.tabsSx,
            }}
          >
            {...props.tabs}
          </Tabs>
        </Box>
      )}
      <Swiper
        {...props.swiperProps}
        onSlideChange={handleSlideChange}
        ref={swiperRef}
        initialSlide={activeTab}
        style={{
          width: "100%",
          // flex: 1,
          ...props.swiperStyle,
        }}
        allowTouchMove={!props.disableSwipe}
      >
        {props.children}
      </Swiper>
    </Box>
  );
});

SwiperControlled.displayName = "SwiperControlled";

export default SwiperControlled;
