import {
  Box,
  CircularProgress,
  ListItemButton,
  ListItemButtonProps,
  useTheme,
} from "@mui/material";
import { useCallback, useMemo } from "react";
import parsePropsData from "../../../utils/parsePropsData";
import {
  Transaction,
  TransactionSlug,
  TransactionStatus,
} from "../../../services/axios/get-activities-service/type";
import Icon from "../Icon";
import Text from "../Text";
import Formatter from "../Formatter";
import formatDate from "../../../utils/formatDate";
import compactWalletAddress from "../../../utils/compactWalletAddress";

interface ActivityItemProps extends ListItemButtonProps {
  data?: string;
}

function ActivityItem(props: ActivityItemProps) {
  const { sx, data, ...rest } = props;
  const theme = useTheme();
  const activityData = useMemo(() => {
    if (!data) return undefined;

    return parsePropsData<Transaction>(data);
  }, [data]);
  const type = activityData?.transaction_type;
  const status = activityData?.transaction_status;
  const isIncrease = useMemo(() => {
    return type === TransactionSlug.Deposit;
  }, [type]);
  const descriptionElement = useMemo(() => {
    const isReceive =
      type === TransactionSlug.Receive || type === TransactionSlug.Deposit;
    if (isReceive) {
      return <>From: {compactWalletAddress(activityData?.from_address)}</>;
    }
    const isSend =
      type === TransactionSlug.Send || type === TransactionSlug.Withdrawn;
    if (isSend) {
      return <>To: {compactWalletAddress(activityData?.to_address)}</>;
    }

    return null;
  }, [status]);
  const getStatusColor = useCallback(() => {
    switch (status) {
      case TransactionStatus.Processing:
        return theme.palette.text.loadingStatus;
      case TransactionStatus.Success:
        return theme.palette.text.successStatus;
      case TransactionStatus.Failed:
        return theme.palette.text.warningStatus;
      default:
        return theme.palette.text.primary;
    }
  }, [status, theme]);
  const getAmountColor = useCallback(() => {
    if (isIncrease) return theme.palette.text.successStatus;

    return theme.palette.text.white;
  }, [isIncrease, theme]);

  if (!activityData) return null;

  return (
    <ListItemButton
      sx={{
        ...theme.mixins.row,
        gap: theme.mixins.gaps.g8,
        backgroundColor: theme.palette.background.white16,
        borderRadius: theme.mixins.customRadius.r16,
        p: theme.mixins.customPadding.p12,
        ...sx,
      }}
      {...rest}
    >
      <Box
        sx={{
          width: "fit-content",
          height: "fit-content",
        }}
      >
        <Icon src={activityData.icon} width={24} />
      </Box>
      <Box
        sx={{
          ...theme.mixins.column,
          width: "fit-content",
        }}
      >
        <Text sx={theme.mixins.activityTitle}>
          {activityData.transaction_type}
        </Text>
        <Text sx={theme.mixins.activityDescription}>{descriptionElement}</Text>
        {status !== TransactionStatus.Success && (
          <Box sx={{ ...theme.mixins.row, gap: theme.mixins.gaps.g4 }}>
            {status === TransactionStatus.Processing && (
              <CircularProgress color="secondary" size={16} />
            )}
            <Text
              sx={{
                fontSize: theme.typography.fontSize12,
                textTransform: "capitalize",
                color: getStatusColor(),
              }}
            >
              {status}
            </Text>
          </Box>
        )}
      </Box>
      <Box
        sx={{
          ...theme.mixins.column,
          width: "fit-content",
          alignItems: "flex-end",
          ml: "auto",
        }}
      >
        <Text
          sx={{
            ...theme.mixins.value,
            fontWeight: theme.typography.fontWeightBold,
            color: getAmountColor(),
            textAlign: "right",
          }}
        >
          <Formatter
            start={isIncrease ? "+" : "-"}
            value={activityData.amount}
            unit={activityData.currency_slug}
          />
        </Text>

        <Text sx={{ ...theme.mixins.valueDescription, textAlign: "right" }}>
          {formatDate(activityData.date_created)}
        </Text>
      </Box>
    </ListItemButton>
  );
}

export default ActivityItem;
