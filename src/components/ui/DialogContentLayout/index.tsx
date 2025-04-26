import { Box, BoxProps, Divider, useTheme } from "@mui/material";
import { ReactNode } from "react";
import Text from "../Text";

interface DialogContentLayoutProps
  extends Omit<BoxProps, "content" | "actions"> {
  content?: ReactNode;
  actions?: ReactNode;
}

function DialogContentLayout(props: DialogContentLayoutProps) {
  const { content, actions, sx, ...rest } = props;
  const theme = useTheme();

  return (
    <Box
      sx={{
        ...theme.mixins.column,
        borderRadius: theme.mixins.theBorderRadius.r12,
        backgroundColor: theme.palette.background.black,
        boxShadow: theme.shadows[1],
        minWidth: "60%",
        ...theme.mixins.dialogContent,
        ...sx,
      }}
      {...rest}
    >
      <Text
        sx={{
          padding: theme.mixins.customPadding.p12,
        }}
      >
        {content}
      </Text>
      {!!actions && <Divider />}
      <Box
        sx={{
          px: theme.mixins.customPadding.p12,
          width: "100%",
          height: "fit-content",
        }}
      >
        {actions}
      </Box>
    </Box>
  );
}

export default DialogContentLayout;

/**
 *  LẤY ĐỊA CHỈ VÍ TỪ TEXT QR CODE
 *  Sử dụng hàm lấy địa chỉ ví của mạng Ton
 *    1.1 Không lấy được địa chỉ ví => Trả về chuỗi input và hiển thị chọn token
 *    1.2 Lấy được địa chỉ ví
 *      1.2.1 Không có thông tin token => chọn token
 *      1.2.2 Có thông tin token => hiện form
 */

/**
 * #Mặc định là mạng TON
 * Quét mã qr:
 *
 * 1. Không lấy được địa chỉ ví => Báo mã không được hỗ trợ
 * 2. Lấy được địa chỉ ví:
 *    2.1 Địa chỉ ví không khớp với mạng Ton => Báo mã không được hỗ trợ
 *    2.2 Địa chỉ ví khớp:
 *       2.2.1 Là của chính bản thân mình => Báo mày không thể send tới chính mày
 *       2.2.2 Là của người khác:
 *         2.2.2.1 Có trong hệ thống Tek Wallet => Đề xuất user transfer (send internal)
 *         2.2.2.2 Không có trong hệ thống => cho qua withdraw (send external)
 */
