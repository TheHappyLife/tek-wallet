import { SxProps } from "@mui/system";

export type UnknownFunction = (data?: unknown) => unknown;

export type GeneralProps = {
  children?: React.ReactNode;
  onClick?: UnknownFunction;
  sx?: SxProps;
  className?: string;
};
