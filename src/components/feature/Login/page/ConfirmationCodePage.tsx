import React, { useEffect, useState } from "react";
import Header from "../../../layout/Header/Header";
import { IonText } from "@ionic/react";
import styled from "styled-components";
import { callOutline } from "ionicons/icons";
import ConfirmationCode from "../../../common/ConfirmationCode/ConfirmationCode";
import PageLayout from "../../../layout/PageLayout/PageLayout";
import { StyledFilledIcon } from "../../../../styles/styles";
import { PHONE_VERIFICATION } from "../../../../store/auth/actions";
import { RootState, useAppDispatch } from "../../../../store/store";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

const Container = styled("div")`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  text-align: center;
  align-items: center;
  margin: 0 3.125rem;
  height: 100%;
`;

const StyledText = styled(IonText)`
  margin-top: 0.5rem;
`;

interface TProps {
  phone: string;
  newUser?: boolean;
}
const mapState = (state: RootState) => ({
  newUser: state.auth.newUser,
});
const ConfirmationCodePage = ({ phone, newUser }: TProps) => {
  const [otp, setOtp] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (otp.length === 4) {
      handleSignIn();
    }
  }, [otp]);

  useEffect(() => {
    if (newUser) {
      history.push("/registration");
    }
  }, [newUser]);

  const call = useAppDispatch();

  const handleSignIn = () =>
    call({ type: PHONE_VERIFICATION, payload: { otp } });

  return (
    <PageLayout Header={<Header showButtons={true} />}>
      <Container>
        <StyledFilledIcon
          className="ion-margin-bottom"
          size="large"
          icon={callOutline}
        />
        <b>Enter your SMS code</b>
        <StyledText>
          We have send you code on your phone number
          <b> {phone}</b>
        </StyledText>
        <ConfirmationCode
          otp={otp}
          setOtp={setOtp}
          containerStyle={{
            display: "flex",
            justifyContent: "center",
            padding: "2rem 0",
          }}
        />

        <IonText>
          If you didn’t received an SMS, please check your Telegram or WhatsApp
        </IonText>
      </Container>
    </PageLayout>
  );
};

export default connect(mapState)(ConfirmationCodePage);
