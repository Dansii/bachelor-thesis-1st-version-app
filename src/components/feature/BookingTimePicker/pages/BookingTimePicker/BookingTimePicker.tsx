import React, { useEffect, useState } from "react";
import TimeItem from "../../components/TimeItem/TimeItem";
import PageLayout from "../../../../layout/PageLayout/PageLayout";
import CalendarHeader from "../../../../layout/CalendarHeader/CalendarHeader";
import { TODAY_ISO } from "../../../../../constants/constants";
import { RouteComponentProps } from "react-router";
import { useAppDispatch } from "../../../../../store/store";
import { LOAD_AVAILABLE_DATES_FOR_INDIVIDUAL_SERVICE } from "../../../../../store/booking/actions";
import { IonCol, IonGrid, IonRow } from "@ionic/react";
import { connect } from "react-redux";
import { TimeSlot } from "../../../../../types/types";

interface IProps
  extends RouteComponentProps<{ coachId: string; serviceId: string }> {
  availableSlots: TimeSlot[];
}

const mapStateToProps = (state: any) => {
  return {
    availableSlots: state.booking.availableSlots,
  };
};
const BookingTimePicker = ({ match, availableSlots }: IProps) => {
  const [selectedDate, setSelectedDate] = useState<string>(TODAY_ISO);
  const call = useAppDispatch();
  let availableSlotsArray = Object.entries(availableSlots).map(
    ([key, value]) => ({
      key,
      ...value,
    })
  );

  useEffect(() => {
    call({
      type: LOAD_AVAILABLE_DATES_FOR_INDIVIDUAL_SERVICE,
      payload: {
        serviceId: match.params.serviceId,
        coachId: match.params.coachId,
        selectedDate,
      },
    });
  }, [selectedDate]);

  return (
    <PageLayout
      Header={
        <CalendarHeader
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      }
    >
      <IonGrid>
        <IonRow>
          {availableSlotsArray?.map((slot, index) => (
            <IonCol size="4" key={index}>
              <TimeItem
                selectedDate={selectedDate}
                serviceId={match.params.serviceId}
                coachId={match.params.coachId}
                from={slot.from}
                to={slot.to}
              />
            </IonCol>
          ))}
        </IonRow>
      </IonGrid>
    </PageLayout>
  );
};
export default connect(mapStateToProps)(BookingTimePicker);
