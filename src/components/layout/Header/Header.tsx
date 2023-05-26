import React from "react";
import { IonHeader, IonIcon, IonTitle, IonToolbar } from "@ionic/react";
import styled from "styled-components";
import { chevronBackOutline, helpOutline } from "ionicons/icons";
import Chip from "../../common/Chip/Chip";
import { useHistory } from "react-router-dom";

interface IProps {
  showButtons?: boolean;
  showLogo?: boolean;
  rightButton?: any;
  title?: string;
}
const Logo = styled(IonTitle)`
  font-size: 1.35rem;
  color: var(--ion-color-dark);
  letter-spacing: 0.2rem;
  font-weight: bold;
  text-transform: uppercase;
`;

const StyledIonIcon = styled(IonIcon)`
  margin: 0;
  color: var(--ion-color-dark);
`;

const Header = ({ showButtons = true }: IProps) => {
  const history = useHistory();

  return (
    <IonHeader className="ion-no-border">
      <IonToolbar color="translucent" className="ion-no-padding">
        {showButtons && (
          <Chip
            onClick={() => history.goBack()}
            slot="start"
            margin="0 0 0 1rem"
            padding="0.5rem"
          >
            <StyledIonIcon icon={chevronBackOutline}></StyledIonIcon>
          </Chip>
        )}
        <Logo>LATINA PRAGUE</Logo>
        {showButtons && (
          <Chip slot="end" margin="0 1rem 0 0" padding="0.5rem">
            <StyledIonIcon icon={helpOutline}></StyledIonIcon>
          </Chip>
        )}
      </IonToolbar>
    </IonHeader>
  );
};
export default Header;
