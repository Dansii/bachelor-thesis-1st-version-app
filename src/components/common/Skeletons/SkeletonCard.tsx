import React from "react";
import { IonCard, IonCardHeader, IonIcon, IonText } from "@ionic/react";
import styled from "styled-components";
import { addOutline } from "ionicons/icons";

const StyledCard = styled(IonCard)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 23rem;
  height: 200px;
  border-radius: 1.5rem;
`;

const OutlineCard = styled(IonCard)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 23rem;
  height: 200px;
  border: 1px solid #aab0b7;
  box-shadow: none;
  border-radius: 1.5rem;
`;

const StyleIonCardHeader = styled(IonCardHeader)`
  padding: 0;
  flex-direction: column;
`;

const StyledIonIcon = styled(IonIcon)`
  color: var(--ion-color-medium);
  margin-bottom: 1rem;
  align-self: center;
  background-color: #f2f2f2;
  padding: 0.5rem;
  border-radius: 0.5rem;
`;
const StyledIonText = styled(IonText)`
  margin: 0 3.5rem;
  text-align: center;
`;

interface TProps {
  type: "outline" | "default";
}
const SkeletonCard = ({ type = "default" }: TProps) => {
  const Card = type === "outline" ? OutlineCard : StyledCard;
  const Text =
    type === "default"
      ? "You don’t have available subscription. You can buy one to save on trainings."
      : "You don’t have any lessons booked. Let’s create first one";

  return (
    <Card>
      <StyleIonCardHeader>
        <StyledIonIcon size="large" icon={addOutline} />
        <StyledIonText>{Text}</StyledIonText>
      </StyleIonCardHeader>
    </Card>
  );
};

export default SkeletonCard;
