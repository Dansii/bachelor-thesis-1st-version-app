import React from "react";
import { IonText } from "@ionic/react";
import { ServiceCategory } from "../../../../../types/types";
import ServiceCard from "../../../../common/ServiceCard/MultiTypeCard";
import { ItemGroup } from "../../../../../styles/styles";
import Chip from "../../../../common/Chip/Chip";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

interface TProps {
  serviceCategories: ServiceCategory[];
}

const Container = styled("div")`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Services = ({ serviceCategories }: TProps) => {
  let serviceTypeArray = Object.entries(serviceCategories).map(
    ([key, value]) => ({ key, ...value })
  );

  const history = useHistory();

  const handleClick = () => {
    history.push(`/selectGroupEvent`);
  };

  return (
    <ItemGroup>
      {serviceCategories &&
        serviceTypeArray?.map((serviceCategory, index) => {
          return [
            <Container>
              <IonText key={index}>
                <b>
                  {serviceCategory.type === "individual"
                    ? "Individual"
                    : "Group"}
                </b>
              </IonText>
              {serviceCategory.type === "group" && (
                <Chip onClick={handleClick}>show all</Chip>
              )}
            </Container>,
            serviceCategory.services.map((service, index) => (
              <ServiceCard
                key={index}
                service={service}
                serviceCategoryType={serviceCategory.type}
              />
            )),
          ];
        })}
    </ItemGroup>
  );
};
export default Services;
