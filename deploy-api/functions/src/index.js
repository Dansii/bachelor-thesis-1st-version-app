// @ts-ignore
const functions = require("firebase-functions");
const express = require("express");
const stripe = require("stripe")(`${process.env.STRIPE_KEY}`);
const cors = require("cors");
const createPaymentIntent = require("./createPaymentIntent");
const handlePaymentStripe = require("./handlePaymentStripe");
const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(cors());

const endpointSecret = `${process.env.ENDPOINT_KEY}`;

app.post("/create-payment-intent", async (req, res) => {
  const paymentIntent = await createPaymentIntent(req.body);
  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.post("/stripe-webhook", async (request, response) => {
  const sig = request.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      request.rawBody,
      sig,
      endpointSecret
    );
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  const res = await handlePaymentStripe(event);

  response.send(res);
});

exports.app = functions.https.onRequest(app);
