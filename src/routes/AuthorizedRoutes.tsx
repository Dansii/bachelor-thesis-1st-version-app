import {
  IonIcon,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { Redirect, Route } from "react-router-dom";
import { cardOutline, homeOutline, addOutline } from "ionicons/icons";
import DashboardPage from "../components/feature/Dashboard/pages/DashboardPage";
import VisitHistoryPage from "../components/feature/Visits/pages/VisitHistoryPage";
import CoachCatalogPage from "../components/feature/CoachCatalog/pages/CoachCatalogPage";
import BookingConfirmationPage from "../components/feature/BookingConfirmation/pages/BookingConfirmationPage";
import BookingTimePicker from "../components/feature/BookingTimePicker/pages/BookingTimePicker/BookingTimePicker";
import ServiceCatalogPage from "../components/feature/ServiceCatalog/page/ServiceCatalogPage";
import { Switch } from "react-router";
import React from "react";
import BookingGroupEventsPage from "../components/feature/BookingGroupServiceSelector/pages/BookingGroupEventsPage";

const AuthorizedRoutes = () => {
  return (
    <IonTabs>
      <IonRouterOutlet animated>
        <Switch>
          <Route exact={true} path="/" component={DashboardPage}></Route>
          <Route
            exact={true}
            path="/history"
            component={VisitHistoryPage}
          ></Route>
          <Route
            exact={true}
            path="/:tab(services)"
            component={ServiceCatalogPage}
          ></Route>
          <Route
            exact={true}
            path="/:tab(services)/coaches"
            component={CoachCatalogPage}
          ></Route>
          <Route
            exact={true}
            path="/:tab(services)/coaches/:serviceId"
            component={CoachCatalogPage}
          ></Route>
          <Route
            exact={true}
            path="/bookingConfirmation/:eventId"
            component={BookingConfirmationPage}
          ></Route>
          <Route
            exact={true}
            path="/selectGroupEvent/:serviceId"
            component={BookingGroupEventsPage}
          ></Route>
          <Route
            exact={true}
            path="/selectGroupEvent"
            component={BookingGroupEventsPage}
          ></Route>
          <Route
            exact={true}
            path="/bookingTime/:serviceId/:coachId"
            component={BookingTimePicker}
          ></Route>
          <Redirect to="/" />
        </Switch>
      </IonRouterOutlet>

      <IonTabBar translucent className="ion-padding-top " slot="bottom">
        <IonTabButton tab="tab1" href="/">
          <IonIcon aria-hidden="true" icon={homeOutline} />
        </IonTabButton>
        <IonTabButton tab="services" href="/services">
          <IonIcon
            style={{
              backgroundColor: "#A1779C ",
              color: "#FFFFFF",
              borderRadius: "20rem",
              width: "2.5rem",
              height: "2.5rem",
              padding: "0.4rem",
            }}
            aria-hidden="true"
            icon={addOutline}
          />
        </IonTabButton>
        <IonTabButton tab="tab3" href="/history">
          <IonIcon aria-hidden="true" icon={cardOutline} />
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default AuthorizedRoutes;
