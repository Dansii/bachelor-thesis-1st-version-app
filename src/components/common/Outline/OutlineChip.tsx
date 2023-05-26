import React from "react";
import styled from "styled-components";
import { IonChip } from "@ionic/react";

interface TProps {
  children: React.ReactNode;
  onClick?: () => void;
}
const StyledIonChip = styled(IonChip)`
  border-radius: 0.75rem;
  border: 1px solid #aab0b7;
  --background: transparent;
  width: 100%;
  justify-content: center;
`;

const OutlineChip = ({ children, onClick }: TProps) => {
  return (
    <StyledIonChip onClick={onClick} className="ion-no-padding ion-no-margin">
      {children}
    </StyledIonChip>
  );
};

export default OutlineChip;
