import React, { Dispatch, SetStateAction } from "react";
import OtpInput from "react-otp-input";

interface TProps {
  otp: string;
  setOtp: Dispatch<SetStateAction<string>>;
  containerStyle?: any;
}
const ConfirmationCode = ({ otp, setOtp, containerStyle }: TProps) => {
  return (
    <>
      <OtpInput
        value={otp}
        onChange={setOtp}
        numInputs={4}
        inputType="number"
        renderInput={(props) => <input pattern="[0-9]*" {...props} />}
        inputStyle={{
          width: "3rem",
          height: "3rem",
          margin: "0 0.5rem",
          borderRadius: "1rem",
          border: "1px solid #C7ADC4",
          boxShadow: "0 0 40px rgba(0, 0, 0, 0.1)",
          background: "#F2F2F2",
        }}
        containerStyle={containerStyle}
      />
    </>
  );
};

export default ConfirmationCode;
