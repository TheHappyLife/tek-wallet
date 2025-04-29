import { useState } from "react";
import { motion } from "framer-motion";
import AnalyticGroup from "../AnalyticGroup";
import TimeFilter, { TimeFilterData } from "../TimeFilter";
import { TimeFilterType } from "../TimeFilter";
import DelayMounted from "../DelayMounted";
import { Box, useTheme } from "@mui/material";
import { GeneralProps } from "../../../types/ui";
import NeonLineChart from "../NeonLineChart";
import Icon from "../Icon";
import getIcon from "../../../utils/getIcon";
interface AmountGroupAndChartProps extends GeneralProps {}

const fakeSeries = [
  {
    name: "All",
    data: [
      1003785.6864951615, 1003795.988344575, 1003827.99766239,
      1003899.7426850981, 1003891.7710159089, 1003810.6439517767,
      1003780.7195320514, 1003797.9506016063, 1003781.455378438,
      1003782.0072632281, 1003715.167883104, 1003724.9791682598,
      1003716.6018329085, 1003711.3282671372, 1003686.1868489254,
      1003625.4795220237, 1003584.3334449014, 1003498.9139435134,
      1003310.7825506503, 1003339.72584186, 1003334.3069939599,
      1003364.3540547496, 1003394.4011155394, 1003398.386950134,
      1003233.005474726, 1003185.2981006557, 1003165.7981714085,
    ],
  },
];

const labels = [
  "2025-03-04T08:10:17.311Z",
  "2025-03-04T12:10:18.859Z",
  "2025-03-04T16:10:19.118Z",
  "2025-03-04T20:10:18.246Z",
  "2025-03-05T00:10:18.371Z",
  "2025-03-05T10:12:40.882Z",
  "2025-03-05T14:12:42.832Z",
  "2025-03-05T18:12:41.114Z",
  "2025-03-05T22:12:40.544Z",
  "2025-03-06T02:12:40.718Z",
  "2025-03-08T10:35:52.596Z",
  "2025-03-08T14:35:52.979Z",
  "2025-03-08T16:01:31.209Z",
  "2025-03-08T18:35:52.824Z",
  "2025-03-08T22:35:52.901Z",
  "2025-03-09T06:35:53.327Z",
  "2025-03-09T10:35:52.682Z",
  "2025-03-09T14:35:53.001Z",
  "2025-03-09T18:35:52.886Z",
  "2025-03-09T22:35:52.880Z",
  "2025-03-10T03:43:34.153Z",
  "2025-03-10T06:35:52.944Z",
  "2025-03-10T10:35:52.253Z",
  "2025-03-10T14:35:52.727Z",
  "2025-03-10T18:35:52.865Z",
  "2025-03-10T22:35:53.563Z",
  "2025-03-11T04:16:45.409Z",
];

const defaultTimeRange = TimeFilterType.SEVEN_DAYS;

const variants = {
  hidden: { opacity: 0, display: "none" },
  visible: { opacity: 1, display: "block" },
};

const AmountGroupAndChart = (props: AmountGroupAndChartProps) => {
  const [expandAreaChart, setExpandAreaChart] = useState(false);
  const [timeRangeData, setTimeRangeData] = useState<
    TimeFilterData | undefined
  >();
  const theme = useTheme();
  const handleChangeTimeRange = (data: TimeFilterData) => {
    setTimeRangeData(data);
  };
  const toggleExpand = () => {
    setExpandAreaChart((prev) => !prev);
  };

  return (
    <Box sx={{ ...props.sx, width: "100%" }}>
      <Box sx={{ ...theme.mixins.column, position: "relative" }}>
        <AnalyticGroup timeRange={timeRangeData?.type} />
        <Box
          sx={{
            width: "100%",
            position: "relative",
            transition: "all 500ms ease-in-out",
            aspectRatio: expandAreaChart ? "1.47317073171" : 999999,
            zIndex: 10,
            maxHeight: expandAreaChart ? "28rem" : "0",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
              transition: "all 500ms ease-in-out",
              transform: !expandAreaChart
                ? "translateY(-100%) translateX(25%) scale(0.5)"
                : "none",
            }}
          >
            <DelayMounted delay={800}>
              <NeonLineChart
                showMinMaxValues={expandAreaChart}
                series={fakeSeries}
                categories={labels}
                sx={{
                  width: "100%",
                  height: "fit-content",
                  transition: "all 500ms ease-in-out",
                  transform: !expandAreaChart ? "translateY(-100%)" : "none",
                  my: theme.mixins.customMargin.m3,
                }}
              />
            </DelayMounted>
          </Box>
          <motion.div
            style={{
              position: "absolute",
              left: 0,
              bottom: 0,
            }}
            initial="hidden"
            animate={expandAreaChart ? "visible" : "hidden"}
            variants={variants}
            transition={{
              opacity: {
                duration: expandAreaChart ? 0.5 : 0.25,
                ease: "linear",
                delay: expandAreaChart ? 0.5 : 0,
              },
              display: {
                duration: 0,
                ease: "linear",
                delay: expandAreaChart ? 0 : 0.25,
              },
            }}
          >
            <TimeFilter
              hideAll
              initialValue={defaultTimeRange}
              onChange={handleChangeTimeRange}
            />
          </motion.div>
        </Box>
        <Icon
          sx={{
            alignSelf: "center",
            transition: "all 0.5s ease-in-out",
            cursor: "pointer",
            mt: theme.mixins.customMargin.m4,
            transform: !expandAreaChart ? "rotate(180deg)" : "none",
          }}
          width={16}
          src={getIcon("bottom_arrow")}
          onClick={toggleExpand}
        />
      </Box>
    </Box>
  );
};

export default AmountGroupAndChart;
