import React from "react";
import { Coach } from "../../../../../types/types";
import CoachItem from "../CoachItem/CoachItem";
import { ItemGroup } from "../../../../../styles/styles";
import { useHistory } from "react-router-dom";

interface TProps {
  coaches: Coach[];
  serviceId: string;
}

const Coaches = ({ coaches, serviceId }: TProps) => {
  let coachesTypeArray = Object.entries(coaches).map(([key, value]) => ({
    key,
    ...value,
  }));
  const history = useHistory();

  const handleClick = (coachId: number) => {
    history.push(`/bookingTime/${serviceId}/${coachId}`);
  };
  return (
    <ItemGroup>
      {coaches &&
        coachesTypeArray.map((coach, index) => (
          <CoachItem
            onClick={() => coach.coachId && handleClick(coach.coachId)}
            key={index}
            name={coach.name}
            bio={coach.bio || "Coach"}
          />
        ))}
    </ItemGroup>
  );
};
export default Coaches;
