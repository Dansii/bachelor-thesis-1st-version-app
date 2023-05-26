import React from "react";
import { IonChip } from "@ionic/react";
import styled from "styled-components";
import { JSX } from "@ionic/core/dist/types/components";
import { JSXBase } from "@ionic/core/dist/types/stencil-public-runtime";

interface TProps
  extends JSX.IonChip,
    Pick<JSXBase.HTMLAttributes<HTMLIonChipElement>, "slot"> {
  children: any;
  backgroundColor?: string;
  textColor?: string;
  fontSize?: string;
  margin?: string;
  padding?: string;
  onClick?: () => void;
}
const Chip = ({
  children,
  backgroundColor,
  textColor,
  fontSize,
  margin,
  padding,
  onClick,
  ...props
}: TProps) => {
  const StyledChip = styled(IonChip)`
    height: 1.5rem;
    font-size: ${fontSize};
    background-color: var(${backgroundColor});
    margin: ${margin};
    padding: ${padding};
  `;

  return (
    <StyledChip onClick={onClick} color={textColor} {...props}>
      {children}
    </StyledChip>
  );
};

export default Chip;
