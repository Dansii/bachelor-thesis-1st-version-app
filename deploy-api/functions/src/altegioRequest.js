const axios = require("axios");
const COMPANY_ID = 723004;
const ACCOUNT_ID = 1468225;

const $api = axios.create({
  baseURL: "https://api.alteg.io/api/v1",
  headers: {
    Accept: "application/vnd.api.v2+json",
  },
});

$api.defaults.headers.common[
  "Authorization"
] = `Bearer ${process.env.ALTEGIO_BEARER_KEY}, User ${process.env.ALTEGIO_USER_KEY}`;

const altegioRequest = {
  createBooking: async (name, phone, email, activityId) => {
    const { data } = await $api.post(
      `/activity/${COMPANY_ID}/${activityId}/book`,
      {
        fullname: name,
        phone,
        email,
      }
    );
    return data?.data?.id;
  },
  getDocumentId: async (activity_id, client_id) => {
    const { data } = await $api.get(
      `/records/${COMPANY_ID}/?activity_id=${activity_id}&client_id=${client_id}`
    );

    return data?.data[0].documents[0]?.id;
  },
  setAttendance: async (record_id) => {
    await $api.post(`/company/${COMPANY_ID}/records/${record_id}/attendance`, {
      attendance: 1,
    });
    return true;
  },
  createPayment: async (document_id, amount) => {
    try {
      const { data } = await $api.post(
        `/company/${COMPANY_ID}/sale/${document_id}/payment`,
        {
          payment: {
            method: {
              slug: "account",
              account_id: ACCOUNT_ID,
            },
            amount,
            analytics_is_fast_payment_tab: true,
          },
        }
      );
      return data?.success;
    } catch (e) {
      return e;
    }
  },
};

module.exports = altegioRequest;
