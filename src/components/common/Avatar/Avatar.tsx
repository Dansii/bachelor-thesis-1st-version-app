import React from "react";
import styled from "styled-components";
import { IonAvatar, IonImg } from "@ionic/react";
import { JSX } from "@ionic/core/dist/types/components";

interface IProps extends JSX.IonImg {
  size: string;
}
const Avatar = ({ size, ...props }: IProps) => {
  const StyledAvatar = styled(IonAvatar)`
    width: ${size};
    height: ${size};
  `;
  const StyledIonImg = styled(IonImg)`
    border-radius: 0.5rem;
  `;

  return (
    <StyledAvatar>
      <StyledIonImg {...props} />
    </StyledAvatar>
  );
};
export default Avatar;
