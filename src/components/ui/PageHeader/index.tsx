"use client";
import { useTheme } from "@mui/material";
import { GeneralProps } from "../../../types/ui";
import BackHeader from "../BackHeader";
import Text from "../Text";

interface PageHeaderProps extends GeneralProps {
  overrideBack?: (e: React.MouseEvent<HTMLDivElement>) => unknown;
  title?: React.ReactNode;
}

const PageHeader = (props: PageHeaderProps) => {
  const theme = useTheme();

  return (
    <BackHeader
      overrideBack={props.overrideBack}
      sx={{
        display: "flex",
        alignItems: "center",
        height: "100%",
        position: "relative",
        paddingLeft: theme.mixins.pagePadding.paddingLeft,
        paddingRight: theme.mixins.pagePadding.paddingRight,
        ...props.sx,
      }}
    >
      <Text
        sx={{
          ...theme.mixins.headerTitle,
          ...theme.mixins.center,
        }}
      >
        {props.title}
      </Text>
    </BackHeader>
  );
};

export default PageHeader;
