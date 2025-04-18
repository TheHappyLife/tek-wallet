import { SxProps } from "@mui/system";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type UnknownFunction = (data?: any) => any;

export type GeneralProps = {
  children?: React.ReactNode;
  onClick?: UnknownFunction;
  sx?: SxProps;
  className?: string;
};
