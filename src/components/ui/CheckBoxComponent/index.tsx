import { Checkbox, CheckboxProps } from "@mui/material";
interface CheckBoxComponentProps extends CheckboxProps {}

const CheckBoxComponent = (props: CheckBoxComponentProps) => {
  const { sx, ...rest } = props;

  return (
    <Checkbox
      {...rest}
      sx={{
        color: "currentColor",
        padding: 0,
        ...sx,
      }}
    />
  );
};

export default CheckBoxComponent;
