import { Box, CircularProgress, ListItemButton, ListItemButtonProps, useTheme } from "@mui/material";
import { useCallback, useMemo } from "react";
import parsePropsData from "../../../utils/parsePropsData";
import { Transaction, TransactionSlug, TransactionStatus } from "../../../services/axios/get-activities-service/type";
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
  const status = activityData?.transaction_status;
  const type = useMemo(() => {
    return activityData?.transaction_type;
  }, [activityData]);
  const slug = useMemo(() => {
    return type?.slug;
  }, [type]);
  const isIncrease = useMemo(() => {
    return slug === TransactionSlug.Deposit;
  }, [slug]);
  const descriptionElement = useMemo(() => {
    const isReceive = slug === TransactionSlug.Receive || slug === TransactionSlug.Deposit;
    if (isReceive) {
      return <>From: {compactWalletAddress(activityData?.from_address)}</>;
    }
    const isSend = slug === TransactionSlug.Send || slug === TransactionSlug.Withdrawn;
    if (isSend) {
      return <>To: {compactWalletAddress(activityData?.to_address)}</>;
    }

    return null;
  }, [slug, activityData?.from_address, activityData?.to_address]);
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
        flexGrow: "unset",
        boxShadow: theme.shadows[1],
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
        <Icon src={type?.link} width={24} />
      </Box>
      <Box
        sx={{
          ...theme.mixins.column,
          width: "fit-content",
        }}
      >
        <Text sx={theme.mixins.activityTitle}>{type?.name}</Text>
        <Text sx={theme.mixins.activityDescription}>{descriptionElement}</Text>
        {status !== TransactionStatus.Success && (
          <Box sx={{ ...theme.mixins.row, gap: theme.mixins.gaps.g4 }}>
            {status === TransactionStatus.Processing && <CircularProgress color="secondary" size={16} />}
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
          <Formatter start={isIncrease ? "+" : "-"} value={activityData.amount} unit={activityData.currency_slug} />
        </Text>

        <Text sx={{ ...theme.mixins.valueDescription, textAlign: "right" }}>
          {formatDate(activityData.date_created)}
        </Text>
      </Box>
    </ListItemButton>
  );
}

export default ActivityItem;
