import React, { useEffect } from "react";
import { Coach } from "../../../../types/types";
import CustomHeader from "../../../layout/Header/CustomHeader";
import Coaches from "../components/Coaches/Coaches";
import PageLayout from "../../../layout/PageLayout/PageLayout";
import { RouteComponentProps } from "react-router";
import { useAppDispatch } from "../../../../store/store";
import { LOAD_COACHES_FOR_INDIVIDUAL_SERVICE } from "../../../../store/booking/actions";
import { connect } from "react-redux";

const mapStateToProps = (state: any) => ({
  coaches: state.booking.availableCoaches,
});
interface TProps extends RouteComponentProps<{ serviceId: string }> {
  coaches?: Coach[];
}
const CoachCatalogPage = ({ match, coaches }: TProps) => {
  const call = useAppDispatch();
  useEffect(() => {
    if (!match.params.serviceId) return;
    call({
      type: LOAD_COACHES_FOR_INDIVIDUAL_SERVICE,
      payload: { serviceId: match.params.serviceId },
    });
  }, [match.params.serviceId]);

  return (
    <PageLayout Header={<CustomHeader title="Choose your coach" />}>
      <Coaches coaches={coaches || []} serviceId={match.params.serviceId} />
    </PageLayout>
  );
};
export default connect(mapStateToProps)(CoachCatalogPage);
