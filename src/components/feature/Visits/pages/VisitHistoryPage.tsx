import React from "react";
import { IonText } from "@ionic/react";
import CustomHeader from "../../../layout/Header/CustomHeader";
import Text from "../../../common/Text/Text";
import { Record } from "../../../../types/types";
import BookedLessonsList from "../../../common/BookedLessons/BookedLessonsList";
import SkeletonCard from "../../../common/Skeletons/SkeletonCard";
import PageLayout from "../../../layout/PageLayout/PageLayout";
import { RootState } from "../../../../store/store";
import { connect } from "react-redux";
import styled from "styled-components";

const Container = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;
const mapStateToProps = (state: RootState) => ({
  upcomingLessons: state.user.lessons.filter(
    (record: Record) => record.status === "Upcoming"
  ),
  previousLessons: state.user.lessons.filter(
    (record: Record) =>
      record.status === "Visited" || record.status === "Cancelled"
  ),
});
interface TProps {
  upcomingLessons?: Record[];
  previousLessons?: Record[];
}
const VisitHistoryPage = ({
  upcomingLessons,
  previousLessons = [],
}: TProps) => {
  return (
    <PageLayout
      Header={<CustomHeader textAlign="center" title="Your attendence" />}
    >
      {upcomingLessons?.length === 0 && previousLessons?.length === 0 ? (
        <SkeletonCard type="outline" />
      ) : (
        <div>
          {upcomingLessons?.length !== 0 ? (
            <Container>
              <Text weight="700">Upcoming lessons:</Text>
              <BookedLessonsList
                lessons={upcomingLessons || []}
                showSkeleton={previousLessons?.length === 0}
              />
            </Container>
          ) : (
            <SkeletonCard type="outline" />
          )}
          {previousLessons && (
            <Container>
              <Text weight="700">Previous lessons:</Text>
              <BookedLessonsList
                lessons={previousLessons}
                showSkeleton={previousLessons?.length !== 0}
              />
            </Container>
          )}
        </div>
      )}
    </PageLayout>
  );
};
export default connect(mapStateToProps)(VisitHistoryPage);
