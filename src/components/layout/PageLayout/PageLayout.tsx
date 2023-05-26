import React from "react";
import { IonContent, IonPage } from "@ionic/react";

interface IProps {
  Header?: React.ReactNode | string;
  Footer?: React.ReactNode | string;
  children: React.ReactNode;
}

const PageLayout = ({ Header, Footer, children }: IProps) => {
  return (
    <IonPage>
      {Header && Header}
      <IonContent className="ion-padding">{children}</IonContent>
      {Footer && Footer}
    </IonPage>
  );
};
export default PageLayout;
