const altegioRequest = require("./altegioRequest");
const processPayment = async (event) => {
  const { metadata, amount } = event;
  if (!metadata?.client_id) return { success: false, error: "No client id" };
  if (!metadata?.activity_id)
    return { success: false, error: "No activity id" };
  if (!metadata?.email) return { success: false, error: "No email" };
  if (!metadata?.phone) return { success: false, error: "No phone" };
  if (!metadata?.name) return { success: false, error: "No name" };

  const { activity_id, client_id, email, phone, name } = metadata;

  const record_id = await altegioRequest.createBooking(
    name,
    phone,
    email,
    activity_id
  );
  const document_id = await altegioRequest.getDocumentId(
    activity_id,
    client_id
  );
  await altegioRequest.setAttendance(record_id);
  const success = altegioRequest.createPayment(document_id, amount / 100);

  return { success };
};

handlePaymentStripe = (event) => {
  switch (event.type) {
    case "payment_intent.succeeded":
      return processPayment(event.data.object);
    default:
      return { success: false, message: `Unhandled event type ${event.type}` };
  }
};

module.exports = handlePaymentStripe;
