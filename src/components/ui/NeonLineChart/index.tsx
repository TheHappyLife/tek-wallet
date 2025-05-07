import { memo, useMemo, useRef } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Formatter from "../Formatter";
import Text from "../Text";
import { motion } from "framer-motion";
import { GeneralProps } from "../../../types/ui";
import useFormatter from "../../../hooks/useFormatter";
import { Box, useTheme } from "@mui/material";
import formatDate from "../../../utils/formatDate";

export interface NeonLineChartPropsTypes extends GeneralProps {
  categories?: string[];
  series?: Array<{ name: string; data: any[] }>;
  showMinMaxValues?: boolean;
}

function NeonLineChart({ series, categories, showMinMaxValues = false, sx }: NeonLineChartPropsTypes) {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
  const { formatValue } = useFormatter();
  const theme = useTheme();
  const options: Highcharts.Options = {
    title: {
      text: "",
    },
    chart: {
      backgroundColor: "transparent",
      height: `${180}px`,
      animation: true,
    },
    colors: ["#60D591"],
    series: [
      {
        type: "line",
        name: "",
        data: series?.[0]?.data ?? [],
        lineWidth: 2, // Line width
        shadow: {
          color: "#60D591", // Neon red glow
          offsetX: 0,
          offsetY: 0,
          opacity: 1,
          width: 15, // Glow width
        },
      },
    ],
    plotOptions: {
      series: {
        marker: {
          enabled: false,
        },
      },
    },
    yAxis: {
      visible: false,
    },
    xAxis: {
      visible: false,
      categories: categories,
    },
    legend: {
      enabled: false,
    },
    tooltip: {
      backgroundColor: "#00000055",
      style: {
        color: "#fff",
      },
      padding: 6,
      formatter: function (): string | null {
        try {
          if ((this as any)?.y === "") {
            return null;
          }

          return `<div>
                   <div style="font-size: 0.8em; ">${formatDate((this as any)?.x)}</div> <br/>
                   <div style="font-weight: 600; color: #60D591; font-size: 1.1em;">${formatValue(
                     +((this as any)?.y ?? 0)
                   )}</div>
                   </div>`;
        } catch (err) {
          console.error("🚀 ~ NeonLineChart ~ err:", err);

          return null;
        }
      },
    },
  };

  const data = useMemo(() => {
    return series?.[0]?.data ?? [];
  }, [series?.[0]?.data && JSON.stringify(series?.[0]?.data)]);

  const chartLength = useMemo(() => {
    try {
      const length = data?.length;

      return length ?? 0;
    } catch {
      return -1;
    }
  }, [data]);

  const maxValue = useMemo(() => {
    try {
      const max = Math.max(...(data ?? []));

      return max ?? -1;
    } catch {
      return -1;
    }
  }, [data]);

  const maxIndex = useMemo(() => {
    try {
      const index = data?.findLastIndex((e: any) => e === maxValue);

      return index ?? -1;
    } catch {
      return -1;
    }
  }, [maxValue]);

  const minValue = useMemo(() => {
    try {
      const min = Math.min(...(data ?? []));

      return min ?? -1;
    } catch {
      return -1;
    }
  }, [data]);

  const minIndex = useMemo(() => {
    try {
      const index = data?.findLastIndex((e: any) => e === minValue);

      return index ?? -1;
    } catch {
      return -1;
    }
  }, [minValue]);

  return (
    <Box sx={{ position: "relative", ...sx }}>
      {showMinMaxValues && (
        <>
          <motion.div
            className="absolute top-0 w-fit z-50"
            style={{
              left: `${(maxIndex / chartLength) * 100}%`,
            }}
            initial={{
              scale: 0,
              translateX: "-50%",
              opacity: 0,
              origin: "50% center",
            }}
            animate={{
              scale: 1,
              translateX: "-50%",
              opacity: 1,
              origin: "50% center",
            }}
            transition={{
              duration: 0.4,
              ease: "easeInOut",
              delay: 0.4,
            }}
          >
            <Text className="text-ui-text-white text-12 leading-140">
              <Formatter value={maxValue} />
            </Text>
          </motion.div>
          <motion.div
            className="absolute bottom-0 w-fit z-50"
            style={{
              left: `${(minIndex / chartLength) * 100}%`,
            }}
            initial={{
              scale: 0,
              translateX: "-50%",
              opacity: 0,
              origin: "50% center",
            }}
            animate={{
              scale: 1,
              translateX: "-50%",
              opacity: 1,
              origin: "50% center",
            }}
            transition={{
              duration: 0.4,
              ease: "easeInOut",
              delay: 0.4,
            }}
          >
            <Text
              sx={{
                ...theme.mixins.value,
              }}
            >
              <Formatter value={minValue} />
            </Text>
          </motion.div>
        </>
      )}
      <HighchartsReact highcharts={Highcharts} options={options} ref={chartComponentRef} />
    </Box>
  );
}

export default memo(NeonLineChart);
