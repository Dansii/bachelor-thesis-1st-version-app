import React from "react";
import { IonPage, IonText } from "@ionic/react";
import styled from "styled-components";
import Login1 from "../components/Login/Login";

const Logo = styled(IonText)`
  font-size: 1.35rem;
  color: var(--ion-color-dark);
  letter-spacing: 0.35rem;
  font-weight: bold;
  text-transform: uppercase;
  text-align: center;
  margin-top: 11rem;
`;
const LoginPage = () => {
  return (
    <IonPage>
      <Logo>LATINA PRAGUE</Logo>
      <Login1 />
    </IonPage>
  );
};

export default LoginPage;
