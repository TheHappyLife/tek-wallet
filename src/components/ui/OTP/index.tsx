import OtpInput, { InputProps, OTPInputProps } from "react-otp-input";

export enum OtpInputType {
  TEXT = "text",
  PASSWORD = "password",
}

interface CustomOtpInputProps extends Omit<OTPInputProps, "renderInput"> {
  otpInputType?: OtpInputType;
  renderInput?: (inputProps: InputProps, index: number) => React.ReactNode;
}

const CustomOtpInput = (props: CustomOtpInputProps) => {
  const { otpInputType, ...rest } = props;

  switch (otpInputType) {
    case OtpInputType.PASSWORD:
      return (
        <OtpInput
          {...rest}
          inputType="password"
          inputStyle={{
            border: "1px solid #ffffff58",
            borderRadius: "0.75rem",
            width: "2.8rem",
            aspectRatio: "1/1.1",
            margin: "0 0.25rem",
            outline: "none",
            color: "#ffffff",
            backgroundColor: "#ffffff29",
          }}
          renderInput={(props) => (
            <>
              <input {...props} inputMode="decimal" />
              <style>
                {`input::selection {
            background-color: transparent; 
            color: white; 
          }`}
              </style>
            </>
          )}
        />
      );
    default:
      return (
        <OtpInput
          {...rest}
          renderInput={(props) => (
            <input {...props} inputMode="text" type="text" />
          )}
        />
      );
  }
};

export default CustomOtpInput;
