import { AxiosResponse } from "axios";
import { $api, setAuthToken, setAuthUserToken } from "../api/api";
import { COMPANY_ID } from "../constants/constants";
import { Preferences } from "@capacitor/preferences";

export function setUserAuthData(token: string, code: number, phone: string) {
  return Preferences.set({
    key: "userAuth",
    value: JSON.stringify({ token, code, phone }),
  });
}

export async function getUserAuthData() {
  const data = await Preferences.get({ key: "userAuth" });
  if (!data.value) return null;
  return JSON.parse(data.value);
}

export async function removeUserToken() {
  await Preferences.remove({ key: "userAuth" });
}

export const sendCodeVerification = async (
  phone: string
): Promise<AxiosResponse> => {
  setAuthToken();
  return $api.post(`/book_code/${COMPANY_ID}`, { phone });
};

export const phoneVerification = async (
  phone: string,
  code: string
): Promise<AxiosResponse> => {
  setAuthToken();
  return $api.post(`/user/auth`, {
    code,
    phone,
    company_id: COMPANY_ID,
  });
};

export const registerClient = async (
  name: string,
  phone: string,
  email: string
): Promise<AxiosResponse> => {
  await setAuthUserToken();
  return $api.post(`/clients/${COMPANY_ID}`, {
    name,
    phone,
    email,
  });
};
