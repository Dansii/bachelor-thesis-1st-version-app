import React, { useEffect, useState } from "react";
import {
  IonFooter,
  IonItem,
  IonLabel,
  IonText,
  IonToggle,
  useIonModal,
} from "@ionic/react";
import CustomHeader from "../../../layout/Header/CustomHeader";
import AlertCard from "../components/AlertCard/AlertCard";
import styled from "styled-components";
import PageLayout from "../../../layout/PageLayout/PageLayout";
import { ItemGroup, StyledPrimaryButton } from "../../../../styles/styles";
import { RouteComponentProps } from "react-router";
import { RootState, useAppDispatch } from "../../../../store/store";
import {
  BOOK_GROUP_EVENT,
  LOAD_SELECTED_BOOKING,
} from "../../../../store/booking/actions";
import PaymentForm from "../components/PaymentForm/PaymentForm";
import { connect } from "react-redux";
import { GroupEvent } from "../../../../types/types";
import MultiTypeCard from "../../../common/ServiceCard/MultiTypeCard";

const StyledText = styled(IonText)`
  font-size: 0.75rem;
  font-weight: 300;
`;

const StyledContainer = styled("div")`
  display: flex;
  justify-content: center;
`;

const StyledFooter = styled(IonFooter)`
  display: flex;
  flex-direction: column;
  text-align: center;
  padding-right: 1.25rem;
  padding-left: 1.25rem;
  margin-bottom: 1.25rem;
`;

const mapStateToProps = (state: RootState) => ({
  selectedBooking: state.booking.selectedBooking,
});
interface BookingConfirmationPageProps
  extends RouteComponentProps<{
    eventId: string;
  }> {
  selectedBooking?: GroupEvent;
}
const BookingConfirmationPage = ({
  match,
  selectedBooking,
}: BookingConfirmationPageProps) => {
  const [pay, setPay] = useState<boolean>(false);
  const call = useAppDispatch();

  const [present, dismiss] = useIonModal(PaymentForm, {
    amount: selectedBooking?.service ? selectedBooking?.service.price : 350,
    activity_id: match.params.eventId,
  });
  const handleBook = () => {
    if (pay)
      present({
        breakpoints: [0.5, 0.7],
        initialBreakpoint: 0.5,
      });
    else
      call({
        type: BOOK_GROUP_EVENT,
        payload: {
          eventId: match.params.eventId,
        },
      });
  };

  useEffect(() => {
    call({
      type: LOAD_SELECTED_BOOKING,
      payload: { eventId: match.params.eventId },
    });
  }, []);
  console.log(selectedBooking);
  return (
    <PageLayout
      Header={<CustomHeader backButton={true} title="Your booking" />}
      Footer={
        <StyledFooter class="ion-no-border">
          <StyledPrimaryButton
            onClick={handleBook}
            className="ion-margin-bottom"
          >
            <IonText class="ion-text-uppercase" color="light">
              Book
            </IonText>
          </StyledPrimaryButton>
          <StyledText>
            By pressing «Book», you accept Terms of Use and Privacy Policy.
          </StyledText>
        </StyledFooter>
      }
    >
      <ItemGroup>
        {selectedBooking?.service && (
          <MultiTypeCard
            service={selectedBooking?.service}
            coach={selectedBooking?.coach}
            type="event"
          />
        )}

        <AlertCard />
        <IonItem lines="none" className="ion-no-padding ">
          <IonLabel>Pay online</IonLabel>
          <IonToggle onIonChange={(e) => setPay(e.detail.checked)} slot="end" />
        </IonItem>
      </ItemGroup>

      <StyledContainer>
        <StyledText>
          <b>Note:</b> you will need to pay in cash on lesson
        </StyledText>
      </StyledContainer>
    </PageLayout>
  );
};

export default connect(mapStateToProps)(BookingConfirmationPage);
