import React from "react";
import { IonCard } from "@ionic/react";
import styled from "styled-components";

const StyledCard = styled(IonCard)`
  max-width: 23rem;
  height: 200px;
  background: linear-gradient(
    106deg,
    #d9d9d9 -0.71%,
    #a1779c -0.7%,
    #c7adc4 98.73%
  );
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-self: center;
  border-radius: 1.5rem;
  margin: 0 0 2rem;
`;

interface TProps {
  children: React.ReactNode;
}

const Card = ({ children }: TProps) => {
  return <StyledCard>{children}</StyledCard>;
};
export default Card;
