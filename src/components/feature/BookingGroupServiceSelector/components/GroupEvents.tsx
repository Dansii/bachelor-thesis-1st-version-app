import React from "react";
import { ItemGroup } from "../../../../styles/styles";
import EventCard from "../../../common/ServiceCard/MultiTypeCard";
import { connect } from "react-redux";
import { GroupEvent } from "../../../../types/types";
import SkeletonReservation from "../../../common/Skeletons/SkeletonReservation";

const mapStateToProps = (state: any) => ({
  groupEvents: state.booking.groupEvents,
});

interface IProps {
  groupEvents: GroupEvent[];
}
const GroupEvents = ({ groupEvents }: IProps) => {
  const groupEventsArray = Object.entries(groupEvents).map(([key, value]) => ({
    key,
    ...value,
  }));
  return (
    <ItemGroup>
      {groupEventsArray.length === 0 && (
        <SkeletonReservation type="emptyEvents" />
      )}
      {groupEventsArray.map((event, index) => (
        <EventCard
          key={index}
          event={event}
          service={event.service}
          coach={event.coach}
        />
      ))}
    </ItemGroup>
  );
};

export default connect(mapStateToProps)(GroupEvents);
