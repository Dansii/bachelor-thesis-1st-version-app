import axios from "axios";
import { getUserAuthData } from "../services/authService";

const $api = axios.create({
  baseURL: "https://api.alteg.io/api/v1",
  headers: {
    Accept: "application/vnd.api.v2+json",
  },
});

const setAuthToken = () => {
  $api.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${process.env.REACT_APP_ALTEGIO_BEARER_KEY}`;
};

const setAuthAdminToken = () => {
  $api.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${process.env.REACT_APP_ALTEGIO_BEARER_KEY}, User ${process.env.REACT_APP_ALTEGIO_USER_KEY}`;
};

const setAuthUserToken = async () => {
  const { token } = await getUserAuthData();
  $api.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${process.env.REACT_APP_ALTEGIO_BEARER_KEY}, User ${token}`;
};

export { $api, setAuthToken, setAuthUserToken, setAuthAdminToken };
