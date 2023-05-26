import React, { useEffect, useState } from "react";
import styled from "styled-components";
import InputField from "../../../../common/InputField/InputField";
import Text from "../../../../common/Text/Text";
import { StyledPrimaryButton } from "../../../../../styles/styles";
import { SEND_CODE_VERIFICATION } from "../../../../../store/auth/actions";
import { RootState, useAppDispatch } from "../../../../../store/store";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

const StyledContainer = styled("div")`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
`;

interface IProps {
  isSmsSent?: boolean;
}
const mapStateToProps = (state: RootState) => ({
  isSmsSent: state.auth.smsSent,
});

const Login = ({ isSmsSent }: IProps) => {
  const [phone, setPhone] = useState<string>("");

  const history = useHistory();
  const call = useAppDispatch();

  const handleSignIn = () =>
    call({
      type: SEND_CODE_VERIFICATION,
      payload: { phone },
    });

  useEffect(() => {
    isSmsSent && history.push("/verification");
  }, [isSmsSent]);

  return (
    <StyledContainer>
      <InputField
        value={phone}
        setValue={setPhone}
        placeholder="+420 777 777 777"
        title="Phone"
      />
      {phone?.length === 13 && (
        <StyledPrimaryButton
          className="ion-margin-top ion-padding-horizontal"
          type="submit"
          onClick={handleSignIn}
        >
          <Text weight="bold" color="light">
            Login
          </Text>
        </StyledPrimaryButton>
      )}
    </StyledContainer>
  );
};

export default connect(mapStateToProps)(Login);
