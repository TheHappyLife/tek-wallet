"use client";
import { headerTitle } from "../../../theme/mui/styles";
import theme from "../../../theme/mui/theme";
import { GeneralProps } from "../../../types/ui";
import BackHeader from "../BackHeader";
import Text from "../Text";

interface PageHeaderProps extends GeneralProps {
  overrideBack?: (e: React.MouseEvent<HTMLDivElement>) => unknown;
  title?: React.ReactNode;
}

const PageHeader = (props: PageHeaderProps) => {
  return (
    <BackHeader
      overrideBack={props.overrideBack}
      sx={{
        display: "flex",
        alignItems: "center",
        height: "100%",
        position: "relative",
        paddingLeft: theme.palette.padding.pageX,
        paddingRight: theme.palette.padding.pageX,
        ...props.sx,
      }}
    >
      <Text
        sx={{
          ...headerTitle,
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        {props.title}
      </Text>
    </BackHeader>
  );
};

export default PageHeader;
