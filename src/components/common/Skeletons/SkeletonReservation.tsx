import React from "react";
import { IonCard, IonCardContent, IonIcon } from "@ionic/react";
import { addOutline } from "ionicons/icons";
import styled from "styled-components";
import OutlineCard from "../Outline/OutlineCard";
import Text from "../Text/Text";

const StyledIonIcon = styled(IonIcon)`
  color: var(--ion-color-medium);
  background-color: #f2f2f2;
  padding: 0.5rem;
  border-radius: 0.5rem;
`;
const TextContainer = styled("div")`
  display: flex;
  flex: 1;
  justify-content: center;
`;

const Container = styled("div")`
  display: flex;
  align-items: center;
`;

interface TProps {
  type?: "emptyEvents";
}

const SkeletonReservation = ({ type }: TProps) => {
  return (
    <OutlineCard disabled={!!type} routerLink="/services" detail={false}>
      <Container>
        {type ? (
          <TextContainer>
            <Text>There are no classes available on this date</Text>
          </TextContainer>
        ) : (
          <>
            <StyledIonIcon size="medium" icon={addOutline} />
            <TextContainer>
              <Text>Book one more</Text>
            </TextContainer>
          </>
        )}
      </Container>
    </OutlineCard>
  );
};

export default SkeletonReservation;
