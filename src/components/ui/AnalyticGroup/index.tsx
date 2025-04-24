import Text from "../Text";
import Formatter from "../Formatter";
import Icon from "../Icon";
import { Box, useTheme } from "@mui/material";
import { GeneralProps } from "../../../types/ui";
import getIcon from "../../../utils/getIcon";
interface AnalyticGroupProps extends GeneralProps {
  timeRange?: string;
}

const AnalyticGroup = (props: AnalyticGroupProps) => {
  const theme = useTheme();
  const { sx } = props;

  return (
    <Box sx={{ ...sx }}>
      <Text sx={{ ...theme.mixins.fieldTitle }}>Total Amount</Text>
      <Text
        sx={{
          ...theme.mixins.row,
          ...theme.mixins.value,
          fontSize: "typography.fontSize18",
        }}
      >
        <Formatter value={1000000} />
        <Box sx={{ ...theme.mixins.row, gap: theme.mixins.gaps.g4 }}>
          <Text
            sx={{ fontWeight: "typography.fontWeight400", fontSize: "0.8em" }}
          >
            USD
          </Text>
          <Icon src={getIcon("bottom_arrow")} width={8} />
        </Box>
      </Text>
      <Box
        sx={{
          ...theme.mixins.row,
          gap: theme.mixins.gaps.g4,
          fontSize: theme.typography.fontSize12,
        }}
      >
        <Text
          sx={{
            fontWeight: "typography.fontWeight500",
            leading: "typography.lineHeight140",
            fontSize: "typography.fontSize14",
            textTransform: "capitalize",
          }}
        >
          {props.timeRange}
        </Text>
        <Icon src={getIcon("arrow_increase")} width={12} />
        <Text
          sx={{
            ...theme.mixins.value,
            color: theme.palette.text.increase,
            borderBottom: `1px dashed currentColor`,
          }}
        >
          5.63 (+3,22%)
        </Text>
      </Box>
    </Box>
  );
};

export default AnalyticGroup;
