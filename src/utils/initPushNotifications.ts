import { PushNotifications, Token } from "@capacitor/push-notifications";
import { FCM } from "@capacitor-community/fcm";
import { getDatabase, ref, set } from "firebase/database";

import { store } from "../store/main";

const initPushNotifications = async () => {
  const { auth } = store.getState();
  if (!auth.userData) throw new Error("User not logged in!");

  const phoneNumber = auth.userData.phone.replace("+", "");

  let permStatus = await PushNotifications.checkPermissions();

  if (permStatus.receive === "prompt") {
    permStatus = await PushNotifications.requestPermissions();
  }

  if (permStatus.receive !== "granted") {
    throw new Error("User denied permissions!");
  }

  await PushNotifications.register();
  // now you can subscribe to a specific topic
  FCM.subscribeTo({ topic: phoneNumber })
    .then(() => alert(`subscribed to topic`))
    .catch((err) => console.log(err));

  PushNotifications.addListener("registration", async (token: Token) => {
    const db = getDatabase();
    set(ref(db, `user/${phoneNumber}/token`), token.value);
  });
  PushNotifications.addListener("pushNotificationReceived", console.log);
};

export default initPushNotifications;
