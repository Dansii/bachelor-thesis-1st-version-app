import React, { useEffect } from "react";
import Services from "../component/Services/Services";
import { ServiceCategory } from "../../../../types/types";
import CustomHeader from "../../../layout/Header/CustomHeader";
import PageLayout from "../../../layout/PageLayout/PageLayout";
import { connect } from "react-redux";
import { RootState, useAppDispatch } from "../../../../store/store";

import { LOAD_SERVICES } from "../../../../store/booking/actions";

const mapStateToProps = (state: RootState) => ({
  serviceCategories: state.booking.serviceCategories,
});
interface TProps {
  serviceCategories?: ServiceCategory[];
}

const ServiceCatalogPage = ({ serviceCategories }: TProps) => {
  const call = useAppDispatch();

  useEffect(() => {
    call({
      type: LOAD_SERVICES,
    });
  }, []);
  return (
    <PageLayout Header={<CustomHeader title="Choose your service" />}>
      <Services serviceCategories={serviceCategories || []} />
    </PageLayout>
  );
};
export default connect(mapStateToProps)(ServiceCatalogPage);
