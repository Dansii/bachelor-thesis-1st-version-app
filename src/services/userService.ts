import { AxiosResponse } from "axios";
import { Direction, Record, Subscription } from "../types/types";
import { ApiSubscription } from "../types/ApiResponseTypes/subscriptions/types";
import { parseDirectionsAndCount } from "../utils/utils";
import {
  ResponseRecord,
  ResponseService,
  ResponseStaff,
} from "../types/ApiResponseTypes/records/types";

export function extractSubscriptionDataFromResponse(
  response: AxiosResponse
): Subscription[] {
  const subscriptions: Subscription[] = [];

  const { data } = response.data;
  data.map((responseSubscription: ApiSubscription) => {
    const directions: Direction[] = [];

    const directionsAndRemainingCount = parseDirectionsAndCount(
      responseSubscription.balance_string
    );

    directionsAndRemainingCount.directions.map((direction) => {
      directions.push({ name: direction });
    });

    const subscription: Subscription = {
      title: responseSubscription.type.title,
      active:
        responseSubscription.activated_date === null ||
        responseSubscription.expiration_date === null,
      left: directionsAndRemainingCount.count,
      directions: directions,
      balance: responseSubscription.type.united_balance_services_count,
      activeTill: responseSubscription.expiration_date,
    };

    subscriptions.push(subscription);
  });
  return subscriptions;
}

export function extractUpcomingLessonsDataFromResponse(
  response: AxiosResponse
): Record[] {
  const records: Record[] = [];

  const { data } = response.data;

  data.map((responseRecord: ResponseRecord) => {
    {
      if (responseRecord.services.length > 0) {
        const service: ResponseService = responseRecord.services[0];
        const staff: ResponseStaff = responseRecord.staff;
        const record: Record = {
          recordId: responseRecord.id,
          service: { name: service.title, price: service.cost },
          coach: { name: staff.name, avatar: staff.avatar },
          date: responseRecord.date,
          length: responseRecord.length,
          status:
            responseRecord.attendance === 1 && !responseRecord.deleted
              ? "Visited"
              : responseRecord.deleted
              ? "Cancelled"
              : "Upcoming",
        };
        records.push(record);
      }
    }
  });

  return records;
}
