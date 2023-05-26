import styled from "styled-components";
import { IonButton, IonIcon, IonImg, IonItemGroup } from "@ionic/react";

export const StyledFilledIcon = styled(IonIcon)`
  color: var(--ion-color-light);
  background-color: var(--ion-color-primary);
  padding: 0.65rem;
  border-radius: 1rem;
`;

export const StyledPrimaryButton = styled(IonButton)`
  --border-radius: 0.25rem;
  --box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.1);
`;

export const ItemGroup = styled(IonItemGroup)`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;
