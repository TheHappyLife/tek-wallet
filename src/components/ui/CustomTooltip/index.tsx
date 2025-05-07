import * as React from "react";
import Popover, { PopoverProps } from "@mui/material/Popover";
import { Box } from "@mui/material";

interface CustomTooltipProps extends Omit<PopoverProps, "open"> {
  trigger: React.ReactNode;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

const CustomTooltip = ({
  trigger,
  children,
  disabled,
  anchorOrigin = {
    vertical: "bottom",
    horizontal: "center",
  },
  anchorPosition,
  transformOrigin,
  ...rest
}: CustomTooltipProps) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <Box
        component={"button"}
        disabled={disabled}
        aria-describedby={id}
        onClick={handleClick}
        sx={{ textAlign: "left" }}
      >
        {trigger}
      </Box>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={anchorOrigin}
        anchorPosition={anchorPosition}
        transformOrigin={transformOrigin}
        sx={{
          "& .MuiPopover-paper": {
            backgroundColor: "transparent",
          },
        }}
        {...rest}
      >
        {children}
      </Popover>
    </>
  );
};

export default CustomTooltip;
