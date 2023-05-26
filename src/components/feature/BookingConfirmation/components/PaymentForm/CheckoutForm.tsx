import { IonCard, IonCardContent } from "@ionic/react";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { StyledPrimaryButton } from "../../../../../styles/styles";
import { useState } from "react";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [readyToPay, setReadyToPay] = useState<boolean>(false);
  const canPay = elements && stripe && readyToPay;
  const handlePay = async () => {
    if (!canPay) return;
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:8100/",
      },
    });

    console.log({ error });
  };

  return (
    <>
      <IonCard>
        <IonCardContent>
          <PaymentElement
            id="payment-element"
            options={{ layout: "tabs" }}
            onChange={({ complete }) => setReadyToPay(complete)}
          />
        </IonCardContent>
      </IonCard>

      <StyledPrimaryButton expand="full" onClick={handlePay} disabled={!canPay}>
        Pay
      </StyledPrimaryButton>
    </>
  );
};

export default CheckoutForm;
