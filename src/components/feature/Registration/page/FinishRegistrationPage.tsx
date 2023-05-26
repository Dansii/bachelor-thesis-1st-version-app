import React, { useState } from "react";
import { IonText } from "@ionic/react";
import Header from "../../../layout/Header/Header";
import { personOutline } from "ionicons/icons";
import styled from "styled-components";
import RegistrationForm from "../components/RegistrationForm/RegistrationForm";
import PageLayout from "../../../layout/PageLayout/PageLayout";
import {
  StyledFilledIcon,
  StyledPrimaryButton,
} from "../../../../styles/styles";
import { useAppDispatch } from "../../../../store/store";
import { REGISTRATION } from "../../../../store/auth/actions";

const Container = styled("div")`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  text-align: left;
  height: 100%;
`;
const TextContainer = styled("div")`
  margin-right: 3.75rem;
  margin-left: 1rem;
`;

const StyledTextP = styled("p")`
  margin-bottom: 1.5rem;
  margin-top: 0.5rem;
`;

const FinishRegistrationPage = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const call = useAppDispatch();

  const handleSignIn = () =>
    call({ type: REGISTRATION, payload: { email, name } });

  return (
    <PageLayout Header={<Header showButtons={false} />}>
      <Container>
        <StyledFilledIcon
          className="ion-margin-start"
          size="large"
          icon={personOutline}
        />
        <TextContainer>
          <IonText>
            <h3 className="ion-margin-top">
              <b>Looks like we don’t know each other</b>
            </h3>
          </IonText>
          <StyledTextP>Please, fill in information bellow</StyledTextP>
        </TextContainer>
        <RegistrationForm
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
        />
        <StyledPrimaryButton
          className="ion-padding-horizontal ion-margin-top"
          type="submit"
          onClick={handleSignIn}
        >
          <IonText color="light">
            <b>Finish registration</b>
          </IonText>
        </StyledPrimaryButton>
      </Container>
    </PageLayout>
  );
};

export default FinishRegistrationPage;
