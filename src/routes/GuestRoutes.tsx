import { Redirect, Route } from "react-router-dom";

import LoginPage from "../components/feature/Login/page/LoginPage";
import ConfirmationCodePage from "../components/feature/Login/page/ConfirmationCodePage";
import FinishRegistrationPage from "../components/feature/Registration/page/FinishRegistrationPage";
import React from "react";
import { Switch } from "react-router";

const GuestRoutes = () => {
  return (
    <Switch>
      <Route exact={true} path="/" component={LoginPage}></Route>
      <Route
        exact={true}
        path="/registration"
        component={FinishRegistrationPage}
      ></Route>
      <Route
        exact={true}
        path="/verification"
        component={ConfirmationCodePage}
      ></Route>
      <Redirect to="/" />
    </Switch>
  );
};

export default GuestRoutes;
