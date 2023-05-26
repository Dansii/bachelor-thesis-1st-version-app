import { AxiosResponse } from "axios";
import { Coach, GroupEvent, Service, ServiceCategory } from "../types/types";
import {
  ApiGroupEvent,
  ApiGroupEventResponse,
  ApiGroupService,
  ApiGroupServicesResponse,
  ApiGroupServiceStaff,
  ApiIndividualService,
} from "../types/ApiResponseTypes/services/types";

export function extractGroupEventsDataFromResponse(
  response: AxiosResponse
): GroupEvent[] {
  const groupEvents: GroupEvent[] = [];

  const responseData: ApiGroupEventResponse = response.data;

  responseData.data.map((apiEvent: ApiGroupEvent) => {
    const coach: Coach = {
      name: apiEvent.staff.name,
      coachId: apiEvent.staff.id,
      avatar: apiEvent.staff.avatar,
      bio: apiEvent.staff.specialization,
    };
    const service: Service = {
      serviceId: apiEvent.service.id,
      name: apiEvent.service.title,
      price: apiEvent.service.price_min,
    };
    const { id, date, length, capacity, records_count } = apiEvent;

    groupEvents.push({
      eventId: id,
      date: date,
      duration: length,
      capacity: capacity,
      booked: records_count,
      coach: coach,
      service: service,
    });
  });

  return groupEvents;
}

export function extractEventFromResponse(response: AxiosResponse) {
  const { data } = response;

  const coach: Coach = {
    name: data.data.staff.name,
    coachId: data.data.staff.id,
    avatar: data.data.staff.avatar,
    bio: data.data.staff.specialization,
  };
  const service: Service = {
    serviceId: data.data.service.id,
    name: data.data.service.title,
    price: data.data.service.price_min,
  };
  const { id, date, length, capacity, records_count } = data.data;

  const groupEvent: GroupEvent = {
    eventId: id,
    date: date,
    duration: length,
    capacity: capacity,
    booked: records_count,
    coach: coach,
    service: service,
  };
  return groupEvent;
}

export function extractGroupServicesDataFromResponse(response: AxiosResponse): {
  serviceCategory: ServiceCategory;
} {
  const services: Service[] = [];
  let serviceCategoryId = 0;

  const responseData: ApiGroupServicesResponse = response.data;

  responseData.data.map((groupService: ApiGroupService) => {
    const coaches: Coach[] = [];
    serviceCategoryId = groupService.category.id;
    const { id, title, capacity, price_min } = groupService;
    const staff: ApiGroupServiceStaff[] = groupService.staff;
    staff.map((staff) => {
      const { id, name } = staff;
      coaches.push({ coachId: id, name: name });
    });

    services.push({
      serviceId: id,
      price: price_min,
      name: title,
      duration: staff[0].length,
      capacity: capacity,
      cancellationTime: "Booking free cancellation  7 hours before",
      coaches: coaches,
    });
  });
  const serviceCategory: ServiceCategory = {
    categoryId: serviceCategoryId,
    type: "group",
    services: services,
  };

  return { serviceCategory: serviceCategory };
}

export function extractIndividualServicesDataFromResponse(
  response: AxiosResponse
): {
  serviceCategory: ServiceCategory;
} {
  const services: Service[] = [];

  const { data } = response.data;
  data.services.map((individualService: ApiIndividualService) => {
    const { id, price_min, title, seance_length, comment } = individualService;
    services.push({
      serviceId: id,
      price: price_min,
      name: title,
      duration: seance_length ? seance_length : 3600,
      cancellationTime: comment,
    });
  });
  const serviceCategory: ServiceCategory = {
    categoryId: data.category.id,
    type: "individual",
    services: services,
  };

  return { serviceCategory: serviceCategory };
}
