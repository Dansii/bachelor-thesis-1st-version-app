import React from "react";
import BookedLesson from "./BookedLesson";
import SkeletonReservation from "../Skeletons/SkeletonReservation";
import { Record } from "../../../types/types";
import { ItemGroup } from "../../../styles/styles";

interface TProps {
  lessons: Record[];
  showSkeleton?: boolean;
}
const BookedLessonsList = ({ lessons, showSkeleton = false }: TProps) => {
  return (
    <ItemGroup>
      {lessons &&
        lessons.map((lesson, index) => (
          <BookedLesson
            key={index}
            date={lesson.date}
            recordId={lesson.recordId}
            service={lesson.service}
            length={lesson.length}
            coach={lesson.coach}
            status={lesson.status}
          />
        ))}
      {showSkeleton && <SkeletonReservation />}
    </ItemGroup>
  );
};

export default BookedLessonsList;
