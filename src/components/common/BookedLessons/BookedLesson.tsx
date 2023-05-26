import React, { useEffect, useState } from "react";
import { IonIcon, useIonActionSheet, useIonModal } from "@ionic/react";
import { chevronDown } from "ionicons/icons";
import styled from "styled-components";
import { OverlayEventDetail } from "@ionic/react/dist/types/components/react-component-lib/interfaces";
import Chip from "../Chip/Chip";
import Avatar from "../Avatar/Avatar";
import OutlineCard from "../Outline/OutlineCard";
import Text from "../Text/Text";
import { Coach, Service } from "../../../types/types";
import { formatRecordDate } from "../../../utils/utils";
import { useAppDispatch } from "../../../store/store";
import { CANCEL_GROUP_EVENT } from "../../../store/booking/actions";
import PaymentForm from "../../feature/BookingConfirmation/components/PaymentForm/PaymentForm";

const Container = styled("div")`
  display: flex;
  justify-content: space-between;
`;
const InnerContainer = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: space-between;
`;

interface TProps {
  date: string;
  recordId?: number;
  coach: Coach;
  service: Service;
  length: number;
  status?: string;
}
const BookedLesson = ({
  date,
  coach,
  service,
  length,
  status,
  recordId,
}: TProps) => {
  const [present] = useIonActionSheet();
  const [result, setResult] = useState<OverlayEventDetail>();
  const call = useAppDispatch();
  const [presentPay, dismiss] = useIonModal(PaymentForm, {
    amount: service.price,
    activity_id: recordId,
  });

  useEffect(() => {
    if (!result?.data) return;
    switch (result?.data.action) {
      case "cancel":
        call({
          type: CANCEL_GROUP_EVENT,
          payload: { recordId: recordId },
        });
        break;
      case "pay":
        presentPay({
          breakpoints: [0.5, 0.7],
          initialBreakpoint: 0.5,
        });
        break;
      default:
        break;
    }
  }, [result]);

  const recordDate = formatRecordDate(date, length);
  return (
    <OutlineCard
      Icon={<Avatar size="2rem" src={coach.avatar} />}
      button={false}
      detail={false}
    >
      <Container>
        <InnerContainer>
          <Text size="0.75rem" weight="bold">
            {recordDate}
          </Text>
          <Text size="0.75rem" weight="300">
            Coach: {coach.name}
          </Text>
          <div>
            <Chip margin="0 0.5rem 0 0" fontSize="0.65rem">
              {service.name}
            </Chip>
            <Chip margin="0 0.5rem 0 0" fontSize="0.65rem">
              {service.price} Kč
            </Chip>
            {status && (
              <Chip
                margin="0 0.5rem 0 0"
                backgroundColor={
                  status === "Visited"
                    ? "---ion-color-success"
                    : status === "Cancelled"
                    ? "--ion-color-danger"
                    : "--ion-color-warning"
                }
                fontSize="0.65rem"
              >
                {status}
              </Chip>
            )}
          </div>
        </InnerContainer>
        <div className="ion-align-self-center">
          {status === "Upcoming" && (
            <IonIcon
              onClick={() =>
                present({
                  header: "What would you like to do?",
                  buttons: [
                    {
                      text: "Cancel",
                      role: "destructive",
                      data: {
                        action: "cancel",
                      },
                    },
                    {
                      text: "Pay",
                      data: {
                        action: "pay",
                      },
                    },
                    {
                      text: "Cancel",
                      role: "cancel",
                      data: {
                        action: "cancel",
                      },
                    },
                  ],
                  onDidDismiss: ({ detail }) => setResult(detail),
                })
              }
              size={"small"}
              icon={chevronDown}
            />
          )}
        </div>
      </Container>
    </OutlineCard>
  );
};

export default BookedLesson;
