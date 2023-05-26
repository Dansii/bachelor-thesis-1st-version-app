import axios from "axios";

const HOST = `${process.env.REACT_APP_FIREBASE_HOST}`;
const getClientSecret = async (
  amount: number,
  client_id: number,
  activity_id: number,
  name: string,
  phone: string,
  email: string
) => {
  if (amount < 15) throw "Amount cannot be less than 15 CZK";
  const { data } = await axios.post(`${HOST}/create-payment-intent`, {
    // stripe receives amount in cents
    amount: amount * 100,
    client_id,
    activity_id,
    name,
    phone,
    email,
  });

  return data?.clientSecret;
};

export default getClientSecret;
