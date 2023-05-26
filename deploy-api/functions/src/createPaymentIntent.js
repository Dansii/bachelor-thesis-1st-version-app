const stripe = require("stripe")(`${process.env.STRIPE_KEY}`);

const createPaymentIntent = async (body) => {
  const { amount, client_id, activity_id, record_id, name, phone, email } =
    body;

  // Create a PaymentIntent with the order amount and currency
  return await stripe.paymentIntents.create({
    amount,
    currency: "czk",
    automatic_payment_methods: {
      enabled: true,
    },
    metadata: {
      client_id,
      activity_id,
      record_id,
      name,
      phone,
      email,
    },
  });
};

module.exports = createPaymentIntent;
