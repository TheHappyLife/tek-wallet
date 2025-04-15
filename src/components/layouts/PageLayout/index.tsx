import { GeneralProps } from "../../../types/ui";
import { forwardRef, useImperativeHandle, useState } from "react";
import { StatusDisplayType } from "../../../components/ui/StatusDisplay";
import StatusDisplay from "../../../components/ui/StatusDisplay";
import { styled } from "@mui/system";

interface PageLayoutProps extends GeneralProps {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  fullScreen?: boolean;
}

export type PageLayoutRef = {
  showNormal: () => void;
  showLoading: () => void;
  showSuccess: () => void;
  showError: () => void;
  showWarning: () => void;
};

const StyledPageLayout = styled("div")(() => ({
  height: "100%",
  width: "100%",
  position: "relative",
}));

const StyledHeader = styled("div")(() => ({
  height: "3.125rem",
  width: "100%",
  position: "absolute",
  top: 0,
  left: 0,
  zIndex: 50,
}));

const StyledContent = styled("div")<{
  hasHeader: boolean;
  fullScreen?: boolean;
}>(({ hasHeader, fullScreen }) => ({
  height: "100%",
  width: "100%",
  overflowX: "hidden",
  overflowY: "auto",
  ...(hasHeader &&
    !fullScreen && {
      paddingTop: "3.125rem",
    }),
}));

const StyledFooter = styled("div")(() => ({
  height: "3rem",
  width: "100%",
  position: "absolute",
  bottom: 0,
  left: 0,
  zIndex: 50,
}));

const StyledStatusOverlay = styled("div")(() => ({
  position: "absolute",
  inset: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "whiteText.main",
  zIndex: 50,
}));

const PageLayout = forwardRef<PageLayoutRef, PageLayoutProps>((props, ref) => {
  const { header, footer, fullScreen, children, sx } = props;
  const [status, setStatus] = useState<StatusDisplayType>(
    StatusDisplayType.Normal
  );

  useImperativeHandle(ref, () => {
    return {
      showNormal: () => {
        setStatus(StatusDisplayType.Normal);
      },
      showLoading: () => {
        setStatus(StatusDisplayType.Loading);
      },
      showSuccess: () => {
        setStatus(StatusDisplayType.Success);
      },
      showError: () => {
        setStatus(StatusDisplayType.Error);
      },
      showWarning: () => {
        setStatus(StatusDisplayType.Warning);
      },
    };
  });

  return (
    <StyledPageLayout sx={sx}>
      {header && <StyledHeader>{header}</StyledHeader>}
      <StyledContent hasHeader={!!header} fullScreen={fullScreen}>
        {children}
      </StyledContent>
      {footer && <StyledFooter>{footer}</StyledFooter>}
      {status !== StatusDisplayType.Normal && (
        <StyledStatusOverlay>
          <StatusDisplay status={status} />
        </StyledStatusOverlay>
      )}
    </StyledPageLayout>
  );
});

PageLayout.displayName = "PageLayout";

export default PageLayout;
