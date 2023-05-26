import React from "react";
import { IonText } from "@ionic/react";
import styled from "styled-components";
import { JSX } from "@ionic/core/dist/types/components";

interface IProps extends JSX.IonText {
  children?: React.ReactNode;
  weight?: string;
  size?: string;
}
const Text = ({ children, weight, size, ...props }: IProps) => {
  const StyledText = styled(IonText)`
    font-weight: ${weight};
    font-size: ${size};
  `;
  return <StyledText {...props}>{children}</StyledText>;
};
export default Text;
