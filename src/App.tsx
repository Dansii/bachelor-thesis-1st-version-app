import { IonApp, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import React, { useEffect } from "react";
import AuthorizedRoutes from "./routes/AuthorizedRoutes";
import GuestRoutes from "./routes/GuestRoutes";
import { RootState, useAppDispatch } from "./store/store";
import { HIDE_TOAST, SHOW_TOAST } from "./store/ui/actions";
import Toast from "./components/common/Toast/Toast";
import { connect } from "react-redux";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { HANDLE_EXISTING_USER } from "./store/auth/actions";
import { getUserAuthData } from "./services/authService";
const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_FIREBASE_API_KEY}`,
  authDomain: `${process.env.REACT_APP_FIREBASE_AUTH_DOMAIN}`,
  projectId: `${process.env.REACT_APP_FIREBASE_AUTH_DOMAIN}`,
  storageBucket: `${process.env.REACT_APP_FIREBASE_STORAGE_BUCKET}`,
  messagingSenderId: `${process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID}`,
  appId: `${process.env.REACT_APP_FIREBASE_APP_ID}`,
  measurementId: `${process.env.REACT_APP_FIREBASE_MEASUREMENT_ID}`,
  databaseURL: `${process.env.REACT_APP_FIREBASE_DATABASE_URL}`,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

setupIonicReact();

interface TProps {
  isAuthorized?: boolean;
  phone?: string;
  toast?: {
    active: boolean;
    text: string;
  };
}

const mapStateToProps = (state: RootState) => ({
  isAuthorized: state.auth.isAuthorized,
  toast: state.ui.toast,
});
const App: React.FC = ({ isAuthorized, toast }: TProps) => {
  const call = useAppDispatch();

  useEffect(() => {
    getUserAuthData().then(
      (data) => data && call({ type: HANDLE_EXISTING_USER })
    );
  }, []);
  const setToastActive = (active: boolean) =>
    call({ type: active ? SHOW_TOAST : HIDE_TOAST });

  return (
    <IonApp>
      <IonReactRouter>
        {isAuthorized ? <AuthorizedRoutes /> : <GuestRoutes />}
        {toast && (
          <Toast
            active={toast.active}
            text={toast.text}
            setActive={setToastActive}
          />
        )}
      </IonReactRouter>
    </IonApp>
  );
};

export default connect(mapStateToProps)(App);
