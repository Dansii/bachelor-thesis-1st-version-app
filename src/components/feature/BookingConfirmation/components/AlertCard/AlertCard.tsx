import React from "react";
import Text from "../../../../common/Text/Text";
import { IonIcon } from "@ionic/react";
import { alertCircleOutline } from "ionicons/icons";
import styled from "styled-components";
import OutlineCard from "../../../../common/Outline/OutlineCard";

const Container = styled("div")`
  display: flex;
  white-space: break-spaces;
`;

const AlertCard = () => {
  return (
    <OutlineCard
      button={false}
      detail={false}
      Icon={<IonIcon size="small" color="primary" icon={alertCircleOutline} />}
    >
      <Container>
        <Text weight="300" size="0.75rem">
          IMPORTANT: Free 7-hour cancellation. If you cancel a class Less than 7
          hours in advance, the class will be deducted from your membership or
          you will be issued a debt equal to the amount of the class. Be sure to
          Make sure your contact information is correct!
        </Text>
      </Container>
    </OutlineCard>
  );
};
export default AlertCard;
