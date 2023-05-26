import React, { memo, useEffect } from "react";
import SkeletonCard from "../../../common/Skeletons/SkeletonCard";
import Text from "../../../common/Text/Text";
import SubscriptionCard from "../../../common/SubscriptionCard/SubscriptionCard";
import CustomHeader from "../../../layout/Header/CustomHeader";
import BookedLessonsList from "../../../common/BookedLessons/BookedLessonsList";
import PageLayout from "../../../layout/PageLayout/PageLayout";
import { Record, Subscription } from "../../../../types/types";
import { Swiper, SwiperSlide } from "swiper/react";
import styled from "styled-components";
import { RootState, useAppDispatch } from "../../../../store/store";
import { LOAD_USER_DATA } from "../../../../store/user/actions";
import { connect } from "react-redux";
import { getUserName, isAuthorized } from "../../../../store/auth/selectors";
import { useHistory } from "react-router-dom";

const StyledSwipper = styled(Swiper)`
  .swiper-wrapper {
    display: flex;
  }
`;

const Container = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const mapStateToProps = (state: RootState) => ({
  username: getUserName(state),
  subscriptions: state.user.subscriptions,
  upcomingLessons: state.user.lessons.filter(
    (record: Record) => record.status === "Upcoming"
  ),
  hasSubscriptions: state.user.hasSubscriptions,
  isAuthorized: isAuthorized(state),
});
interface TProps {
  hasSubscriptions: boolean;
  username: string;
  subscriptions?: Subscription[];
  upcomingLessons: Record[];
  isAuthorized: boolean;
}
const DashboardPage = ({
  hasSubscriptions,
  subscriptions,
  username,
  upcomingLessons,
  isAuthorized,
}: TProps) => {
  const call = useAppDispatch();
  const history = useHistory();

  useEffect(() => {
    isAuthorized && call({ type: LOAD_USER_DATA });
  }, []);
  const title: string = "Welcome, " + username;
  return (
    <PageLayout Header={<CustomHeader title={title} buttonText="Sign out" />}>
      <StyledSwipper
        spaceBetween={10}
        slidesPerView={1.01}
        slidesPerGroup={1}
        grabCursor={true}
        // autoplay={{ delay: 3000 }}
        navigation
        style={{ display: "flex", flexDirection: "row" }}
      >
        {hasSubscriptions && subscriptions ? (
          subscriptions?.map((subscription, index) => (
            <SwiperSlide key={`slide_${index}`}>
              <SubscriptionCard subscription={subscription} />
            </SwiperSlide>
          ))
        ) : (
          <SkeletonCard type="default" />
        )}
      </StyledSwipper>
      <Container>
        <Text weight="bold">Upcoming trainings</Text>
        <BookedLessonsList
          lessons={upcomingLessons || []}
          showSkeleton={true}
        />
      </Container>
    </PageLayout>
  );
};

export default connect(mapStateToProps)(
  memo(DashboardPage, (prevProps, nextProps) => {
    return (
      prevProps.upcomingLessons?.length === nextProps.upcomingLessons?.length &&
      prevProps.isAuthorized !== nextProps.isAuthorized
    );
  })
);
