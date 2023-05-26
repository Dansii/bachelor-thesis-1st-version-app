import React, { useEffect, useState } from "react";
import Chip from "../../common/Chip/Chip";
import {
  arrowDown,
  chevronBackOutline,
  chevronForwardOutline,
} from "ionicons/icons";
import {
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonSegment,
  IonSegmentButton,
  IonToolbar,
  SegmentChangeEventDetail,
  useIonViewDidLeave,
  useIonViewWillEnter,
} from "@ionic/react";
import Text from "../../common/Text/Text";
import styled from "styled-components";
import { IonSegmentCustomEvent } from "@ionic/core/dist/types/components";
import { PERIOD, TODAY_ISO } from "../../../constants/constants";
import { dateToISOString } from "../../../utils/utils";
import { TWeekDay, TWeekItem } from "../../../types/types";

const StyledText = styled(Text)`
  margin-left: 1rem;
`;
const StyledSegment = styled(IonSegment)`
  width: calc(100% - 2rem);
  margin: 1rem auto;
`;

const StyledLabel = styled(IonLabel)`
  display: flex;
  flex-direction: column;
`;

const StyledIonSegmentButton = styled(IonSegmentButton)`
  min-width: 0;
  margin: 0.25rem;
`;

interface IProps {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
}
const CalendarHeader = ({ selectedDate, setSelectedDate }: IProps) => {
  const [firstDay, setFirstDay] = useState<Date | null>(null);
  const [week, setWeek] = useState<TWeekItem[]>([]);

  useIonViewWillEnter(() => {
    const now = new Date();
    now.setDate(now.getDate() - now.getDay() + 1);
    setFirstDay(now);
    setSelectedDate(TODAY_ISO);
  }, []);

  useIonViewDidLeave(() => {
    setFirstDay(null);
  });

  useEffect(() => {
    if (!firstDay) return;

    const newWeek: TWeekItem[] = [];
    const dayIterator = new Date(firstDay);

    for (let i = 0; i < PERIOD; i++) {
      const value = dateToISOString(dayIterator);
      newWeek.push({
        day: dayIterator.toLocaleString("en-US", {
          weekday: "short",
        }) as TWeekDay,
        date: dayIterator.getDate(),
        disabled: value < TODAY_ISO,
        value,
      });
      dayIterator.setDate(dayIterator.getDate() + 1);
    }

    setWeek(newWeek);
  }, [firstDay]);

  const handleChange = (e: IonSegmentCustomEvent<SegmentChangeEventDetail>) => {
    setSelectedDate(e.detail.value || dateToISOString(new Date()));
  };

  const handlePeriod = (period: number = PERIOD) => {
    if (!firstDay) return;
    const firstDayCopy = new Date(firstDay);
    firstDayCopy.setDate(firstDayCopy.getDate() + period);

    setFirstDay(firstDayCopy);

    const dateISO = dateToISOString(firstDayCopy);
    setSelectedDate(dateISO < TODAY_ISO ? TODAY_ISO : dateISO);
  };

  return (
    <>
      <IonHeader class="ion-no-border">
        <IonToolbar color="translucent" className="ion-no-padding">
          <StyledText weight="bold" size="1.375rem">
            {firstDay?.toLocaleDateString("en-US", { month: "long" })}
          </StyledText>

          <Chip
            margin="0 1rem 0 0"
            padding="0.5rem"
            slot="end"
            disabled={!firstDay || dateToISOString(firstDay) <= TODAY_ISO}
            onClick={() => handlePeriod(-PERIOD)}
          >
            <IonIcon className="ion-no-margin" icon={chevronBackOutline} />
          </Chip>
          <Chip
            margin="0 1rem 0 0"
            padding="0.5rem"
            slot="end"
            onClick={() => handlePeriod(PERIOD)}
          >
            <IonIcon className="ion-no-margin" icon={chevronForwardOutline} />
          </Chip>
        </IonToolbar>
        <StyledSegment value={selectedDate} onIonChange={handleChange}>
          {week.map(({ day, date, value, disabled }, index) => (
            <StyledIonSegmentButton
              disabled={disabled}
              key={index}
              value={value}
            >
              <StyledLabel>
                <Text>{day}</Text>
                <Text weight="bold">{date}</Text>
              </StyledLabel>
            </StyledIonSegmentButton>
          ))}
        </StyledSegment>
      </IonHeader>
    </>
  );
};

export default CalendarHeader;
// const [currentWeek, setCurrentWeek] = useState<Date[]>([]);
// const [selectedDayOfWeek, setSelectedDayOfWeek] = useState<
//     string | undefined
// >("");

// function getStartOfWeek(date: Date) {
//   const dayOfWeek = date.getDay() || 7; // Воскресенье имеет значение 0, поэтому используем 7 для правильного расчета
//   const startOfWeek = new Date(date);
//   startOfWeek.setDate(date.getDate() - dayOfWeek + 1);
//   return startOfWeek;
// }
//
// // Функция для создания массива дат текущей недели
// function getCurrentWeek() {
//   const today = new Date();
//   const startOfWeek = getStartOfWeek(today);
//   const week = [];
//
//   for (let i = 0; i < 7; i++) {
//     const day = new Date(startOfWeek);
//     day.setDate(startOfWeek.getDate() + i);
//     week.push(day);
//   }
//
//   return week;
// }
//
// const handleDaySelection = (selectedDate: string | undefined) => {
//   console.log(selectedDate);
//   setSelectedDayOfWeek(selectedDate);
// };
//
// useEffect(() => {
//   setCurrentWeek(getCurrentWeek());
// }, []);
// // Используйте эту функцию для получения массива дат текущей недели
