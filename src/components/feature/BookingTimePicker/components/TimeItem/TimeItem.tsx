import React from "react";
import { IonText } from "@ionic/react";
import styled from "styled-components";
import OutlineChip from "../../../../common/Outline/OutlineChip";
import { BOOK_INDIVIDUAL_LESSON } from "../../../../../store/booking/actions";
import { useAppDispatch } from "../../../../../store/store";

interface TProps {
  from: string;
  to: string;
  serviceId: string;
  coachId: string;
  selectedDate: string;
}

const StyledText = styled(IonText)`
  font-size: 0.75rem;
  font-weight: bold;
`;

const TimeItem = ({ serviceId, coachId, selectedDate, from, to }: TProps) => {
  const call = useAppDispatch();
  const handleClick = () => {
    call({
      type: BOOK_INDIVIDUAL_LESSON,
      payload: {
        serviceId: serviceId,
        coachId: coachId,
        selectedDate: selectedDate,
        from: from,
        to: to,
      },
    });
  };

  return (
    <OutlineChip onClick={handleClick}>
      <StyledText>
        {from} - {to}
      </StyledText>
    </OutlineChip>
  );
};
export default TimeItem;
