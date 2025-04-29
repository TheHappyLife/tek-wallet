import {
  Accordion,
  AccordionDetails,
  AccordionProps,
  AccordionSummary,
  Box,
  useTheme,
} from "@mui/material";
import Icon from "../Icon";
import getIcon from "../../../utils/getIcon";
import Text from "../Text";
import Formatter from "../Formatter";
import { Fragment } from "react/jsx-runtime";
export interface FeesProps extends Omit<AccordionProps, "children"> {}

const FeeDetail = ({ feeName, value }: { feeName: string; value: number }) => {
  const theme = useTheme();

  return (
    <Box sx={{ ...theme.mixins.row }}>
      <Text sx={{ ...theme.mixins.fieldTitle }}>{feeName}</Text>
      <Box sx={{ ...theme.mixins.column, ml: "auto" }}>
        <Text sx={{ ...theme.mixins.value }}>
          <Formatter value={value} />
        </Text>
        <Text sx={{ ...theme.mixins.valueDescription }}>
          <Formatter value={value} start={"~ "} />
        </Text>
      </Box>
    </Box>
  );
};

function Fees(props: FeesProps) {
  const { sx, ...rest } = props;
  const theme = useTheme();

  return (
    <Accordion
      defaultExpanded
      {...rest}
      sx={{
        "&.MuiPaper-root": {
          backgroundColor: "transparent",
          margin: 0,
        },
        ...sx,
      }}
    >
      <AccordionSummary
        expandIcon={<Icon src={getIcon("arrow_down")} width={20} />}
      >
        <Box sx={{ ...theme.mixins.row }}>
          <Text sx={{ ...theme.mixins.fieldTitle }}>Total fees</Text>
          <Text sx={{ ...theme.mixins.value }}>
            <Formatter value={1000} />
          </Text>
        </Box>
      </AccordionSummary>

      <AccordionDetails>
        <Box sx={{ ...theme.mixins.row }}>
          <Box sx={{ ...theme.mixins.column, width: "fit-content", gap: 2 }}>
            {[1, 2, 3].map((item, index) => (
              <Fragment key={item}>
                {index !== 0 && (
                  <Box
                    sx={{
                      borderRight: `1px dashed ${theme.palette.border.black16}`,
                      flex: 1,
                    }}
                  />
                )}
                {<Icon src={getIcon("timeline_dot")} width={16} />}
              </Fragment>
            ))}
          </Box>
          <Box sx={{ ...theme.mixins.column, flex: 1 }}>
            <FeeDetail feeName="Fee 1" value={1000} />
            <FeeDetail feeName="Fee 2" value={1000} />
            <FeeDetail feeName="Fee 3" value={1000} />
          </Box>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}

export default Fees;
