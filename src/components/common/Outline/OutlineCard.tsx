import React from "react";
import { IonItem, IonLabel } from "@ionic/react";
import styled from "styled-components";

import { JSX } from "@ionic/core/dist/types/components";

const OutlineItem = styled(IonItem)`
  --inner-padding-end: 0;
  border-radius: 0.75rem;
  border: 0.1rem solid #aab0b7;
  ::part(native) {
    border-radius: 0.75rem;
  }
`;

const Container = styled("div")`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  flex: 1;
  padding: 0.75rem 0.75rem 1rem 0.75rem;
`;

interface IProps extends JSX.IonItem {
  children: React.ReactNode;
  Icon?: React.ReactNode;
  detail?: boolean;
  button?: boolean;
  routerLink?: string | undefined;
  onClick?: () => void;
}

const OutlineCard = ({
  Icon,
  children,
  detail = true,
  button = true,
  routerLink,
  onClick,
  ...props
}: IProps) => {
  const Label = styled(IonLabel)`
    flex: 1;
    margin: ${Icon ? "0 0 0 0.5rem" : "0 0 0 0"};
  `;

  return (
    <OutlineItem
      onClick={onClick}
      lines="none"
      button={button}
      className="ion-no-padding "
      detail={detail}
      routerLink={routerLink}
      {...props}
    >
      <Container>
        {Icon && Icon}
        <Label>{children}</Label>
      </Container>
    </OutlineItem>
  );
};

export default OutlineCard;
