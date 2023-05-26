import React from "react";
import Text from "../Text/Text";
import Avatar from "../Avatar/Avatar";
import styled from "styled-components";
import Chip from "../Chip/Chip";
import OutlineCard from "../Outline/OutlineCard";
import { Coach, GroupEvent, Service } from "../../../types/types";
import { secondsToHoursOrMinutes } from "../../../utils/utils";
import { useHistory } from "react-router-dom";

const InnerContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

interface IProps {
  service: Service;
  event?: GroupEvent;
  coach?: Coach;
  serviceCategoryType?: "individual" | "group";
  type?: "service" | "event";
}
const MultiTypeCard = ({
  service,
  event,
  coach,
  serviceCategoryType,
  type = (serviceCategoryType && "service") || (coach && "event"),
}: IProps) => {
  const Container = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 0.75rem;
    font-weight: 300;
    gap: ${coach ? "0.3rem" : "0.625rem"};
  `;

  const history = useHistory();
  const handleClick = () => {
    type === "service"
      ? serviceCategoryType === "individual"
        ? history.push(`/services/coaches/${service.serviceId}`)
        : history.push(`/selectGroupEvent/${service.serviceId}`)
      : history.push(`/bookingConfirmation/${event?.eventId}`);
  };

  return (
    <OutlineCard
      disabled={event && event.capacity === event.booked}
      detail={false}
      onClick={handleClick}
      Icon={
        coach && (
          <Avatar
            size="4rem"
            src="https://assets.alteg.io/masters/sm/1/1f/1fbabd9995849fa_20230129175812.png"
          />
        )
      }
    >
      <Container>
        <InnerContainer>
          <Text weight="bold" color="dark">
            {service.name}
          </Text>
          <Text weight="bold" color="dark">
            {type === "event" && event?.date.substring(11, 16)}
            {type === "service" &&
              service.duration &&
              secondsToHoursOrMinutes(service.duration)}
          </Text>
        </InnerContainer>
        {coach && <Text>Coach: {coach.name}</Text>}
        <InnerContainer>
          <Text>
            {coach
              ? "Duration: 1 hour"
              : "Booking free cancellation 9 hours before"}
          </Text>
          <Chip margin="0 0 0 0">
            <Text weight="300" size="0.75rem">
              {service.price} Kč
            </Text>
          </Chip>
        </InnerContainer>
      </Container>
    </OutlineCard>
  );
};
export default MultiTypeCard;
