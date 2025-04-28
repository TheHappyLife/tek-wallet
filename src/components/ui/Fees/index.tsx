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
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";
export interface FeesProps extends AccordionProps {}

function Fees(props: FeesProps) {
  const { sx, ...rest } = props;
  const theme = useTheme();

  return (
    <Accordion defaultExpanded {...rest} sx={{ ...sx }}>
      <AccordionSummary
        expandIcon={
          <Box sx={{ ...theme.mixins.row }}>
            <Text>Total fees</Text>
            <Icon sx={{ ml: "auto" }} src={getIcon("arrow_down")} />
          </Box>
        }
      ></AccordionSummary>
      <AccordionDetails>
        <Timeline>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>Eat</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>Code</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot />
            </TimelineSeparator>
            <TimelineContent>Sleep</TimelineContent>
          </TimelineItem>
        </Timeline>
      </AccordionDetails>
    </Accordion>
  );
}

export default Fees;
