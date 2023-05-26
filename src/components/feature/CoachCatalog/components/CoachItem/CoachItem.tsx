import React from "react";
import styled from "styled-components";
import OutlineCard from "../../../../common/Outline/OutlineCard";
import Text from "../../../../common/Text/Text";
import Avatar from "../../../../common/Avatar/Avatar";

interface TProps {
  name: string;
  bio: string;
  onClick?: () => void;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;

  gap: 0.5rem;
`;

const CoachItem = ({ name, bio, onClick }: TProps) => {
  return (
    <OutlineCard
      onClick={onClick}
      detail={false}
      Icon={
        <Avatar
          size="2rem"
          src="https://assets.alteg.io/masters/sm/1/1f/1fbabd9995849fa_20230129175812.png"
        />
      }
    >
      <Container>
        <Text weight="bold" color="dark">
          {name}
        </Text>
        <Text color="dark" weight="300" size="0.75rem">
          {bio}
        </Text>
      </Container>
    </OutlineCard>
  );
};

export default CoachItem;
