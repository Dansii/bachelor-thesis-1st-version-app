import { useEffect, useState } from "react";
import getClientSecret from "../../utils/getClientSecret";
import { Elements } from "@stripe/react-stripe-js";
import stripePromise from "../../../../../constants/stripePromise";
import { IonContent, IonHeader, IonTitle, IonToolbar } from "@ionic/react";
import CheckoutForm from "./CheckoutForm";
import { useSelector } from "react-redux";
import {
  getClientId,
  getUserEmail,
  getUserName,
  getUserPhone,
} from "../../../../../store/auth/selectors";

interface IProps {
  amount: number;
  activity_id: number;
}

const PaymentForm = ({ amount, activity_id }: IProps) => {
  const [clientSecret, setClientSecret] = useState<string>();

  const clientId = useSelector(getClientId);
  const name = useSelector(getUserName);
  const phone = useSelector(getUserPhone);
  const email = useSelector(getUserEmail);

  useEffect(() => {
    getClientSecret(amount, clientId, activity_id, name, phone, email).then(
      setClientSecret
    );
  }, [amount]);

  if (!clientSecret) return <h1>Placeholder gonna be here</h1>;

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Pay {amount}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Elements
          options={{ clientSecret, appearance: { theme: "stripe" } }}
          stripe={stripePromise}
        >
          <CheckoutForm />
        </Elements>
      </IonContent>
    </>
  );
};

export default PaymentForm;
