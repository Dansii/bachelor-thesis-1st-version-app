import React from "react";
import {
  IonHeader,
  IonIcon,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import Chip from "../../common/Chip/Chip";
import styled from "styled-components";
import { chevronBackOutline } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import { removeUserToken } from "../../../services/authService";
import { useAppDispatch } from "../../../store/store";
import { SIGN_OUT } from "../../../store/auth/actions";

interface TProps {
  title: string;
  buttonText?: string;
  icon?: any;
  backButton?: boolean;
  textAlign?: "right" | "left" | "center";
}

const StyledText = styled(IonText)`
  font-size: 1.35rem;
  color: var(--ion-color-dark);
`;

const StyledIonIcon = styled(IonIcon)`
  margin: 0;
  color: var(--ion-color-dark);
`;

const CustomHeader = ({
  backButton,
  title,
  buttonText,
  icon,
  textAlign = "left",
}: TProps) => {
  const StyledToolbar = styled(IonToolbar)`
    text-align: ${textAlign};
  `;
  const history = useHistory();
  const call = useAppDispatch();

  const handleClick = () => {
    if (buttonText === "Sign out") {
      call({ type: SIGN_OUT });
    }
  };

  return (
    <IonHeader class="ion-no-border">
      <StyledToolbar color="translucent" className="ion-no-padding">
        {backButton ? (
          <div>
            <Chip
              onClick={() => history.goBack()}
              margin="0 0 0 1rem"
              padding="0.5rem"
              slot="start"
            >
              <StyledIonIcon icon={chevronBackOutline} />
            </Chip>
            <IonTitle>
              <StyledText>
                <b>{title}</b>
              </StyledText>
            </IonTitle>
          </div>
        ) : (
          <StyledText className="ion-margin-start">
            <b>{title}</b>
          </StyledText>
        )}

        {buttonText && (
          <Chip
            margin="0 1rem 0 0"
            padding="0.5rem"
            slot="end"
            onClick={handleClick}
          >
            <IonText>{buttonText}</IonText>
          </Chip>
        )}
        {icon && (
          <Chip margin="0 1rem 0 0" padding="0.5rem" slot="end">
            <StyledIonIcon icon={icon} />
          </Chip>
        )}
      </StyledToolbar>
    </IonHeader>
  );
};

export default CustomHeader;
