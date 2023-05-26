import React, { useEffect, useState } from "react";
import PageLayout from "../../../layout/PageLayout/PageLayout";
import CalendarHeader from "../../../layout/CalendarHeader/CalendarHeader";
import GroupEvents from "../components/GroupEvents";
import { RouteComponentProps, useParams } from "react-router";
import { TODAY_ISO } from "../../../../constants/constants";
import { useAppDispatch } from "../../../../store/store";
import { LOAD_GROUP_EVENTS } from "../../../../store/booking/actions";

interface BookingGroupServicePageProps
  extends RouteComponentProps<{
    serviceId: string;
  }> {}
const BookingGroupEventsPage = ({ match }: BookingGroupServicePageProps) => {
  const [selectedDate, setSelectedDate] = useState<string>(TODAY_ISO);
  const call = useAppDispatch();

  const serviceId = match.params.serviceId;

  useEffect(() => {
    call({
      type: LOAD_GROUP_EVENTS,
      payload: {
        serviceId,
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
      <GroupEvents />
    </PageLayout>
  );
};

export default BookingGroupEventsPage;
