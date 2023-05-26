import React from "react";
import {
  IonAvatar,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonText,
} from "@ionic/react";

import styled from "styled-components";

import Card from "../Card/Card";
import Chip from "../Chip/Chip";
import { Subscription } from "../../../types/types";
import { formatDateToDayMonthYear } from "../../../utils/utils";

const StyledCardHeader = styled(IonCardHeader)`
  padding: 1rem;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
`;

const StyledContainer = styled("div")`
  display: flex;
  flex-direction: row;
`;

const StyledAvatar = styled(IonAvatar)`
  position: absolute;
  top: 1rem;
  left: 1rem;
  width: 2.25rem;
  height: 2.25rem;
  align-self: center;
`;

const StyledTitle = styled(IonCardTitle)`
  color: var(--ion-color-light);
  margin-left: 3.125rem;
  font-size: 1rem;
  align-self: center;
`;

const StyledSubTitle = styled(IonCardSubtitle)`
  color: var(--ion-color-light);
  text-align: right;
  font-size: 0.65rem;
  text-transform: none;
  align-self: center;
  font-weight: normal;
`;

const StyledCardContent = styled(IonCardContent)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 0.75rem;
`;

const StyledIonText = styled(IonText)`
  color: var(--ion-color-light);
  align-self: center;
`;

interface IProps {
  subscription: Subscription;
}

const SubscriptionCard = ({ subscription }: IProps) => {
  return (
    <Card>
      <StyledCardHeader>
        <StyledContainer>
          <StyledAvatar>
            <img
              alt="Silhouette of a person's head"
              src="https://assets.alteg.io/general/4/42/427807bb5eb6f9c_20230129175117.png"
            />
          </StyledAvatar>
          <StyledTitle>{subscription.title}</StyledTitle>
        </StyledContainer>
        <StyledSubTitle>
          {subscription.activeTill
            ? "active till " + formatDateToDayMonthYear(subscription.activeTill)
            : "inactive"}
        </StyledSubTitle>
      </StyledCardHeader>
      <StyledCardContent>
        <StyledIonText>
          Left {subscription.left}/{subscription.balance}
        </StyledIonText>
        <StyledContainer>
          {subscription.directions &&
            subscription.directions.map((direction, index) => (
              <Chip
                key={index}
                backgroundColor="--ion-color-light"
                fontSize="0.75rem"
              >
                {direction.name}
              </Chip>
            ))}
        </StyledContainer>
      </StyledCardContent>
    </Card>
  );
};

export default SubscriptionCard;
