export type ApiIndividualService = {
  id: number;
  title: string;
  category_id: number;
  price_min: number;
  price_max: number;
  discount: number;
  comment: string;
  weight: number;
  active: number;
  sex: number;
  image: string;
  prepaid: string;
  seance_length: null | number;
  abonement_restriction: number;
};

export type ApiIndividualCategory = {
  id: number;
  title: string;
  sex: number;
  api_id: number;
  weight: number;
};

export type ApiIndividualData = {
  events: any[];
  services: ApiIndividualService[];
  category: ApiIndividualCategory[];
};

export type ApiIndividualServicesResponse = {
  success: boolean;
  data: ApiIndividualData;
  meta: any[];
};

export type ApiGroupServiceStaff = {
  id: number;
  name: string;
  length: number;
};

export type ApiGroupServiceCategory = {
  id: number;
  title: string;
};

export type ApiGroupService = {
  id: number;
  title: string;
  capacity: number;
  price_min: number;
  price_max: number;
  is_multi: boolean;
  category: ApiGroupServiceCategory;
  staff: ApiGroupServiceStaff[];
  resources: any[];
};

export type ApiGroupServicesResponse = {
  success: boolean;
  data: ApiGroupService[];
  meta: any;
};

export type ApiGroupEventStaff = {
  id: number;
  name: string;
  specialization: string;
  user_id: number;
  avatar: string;
  avatar_big: string;
  prepaid: string;
};

export type ApiGroupEventService = {
  id: number;
  category_id: number;
  title: string;
  price_min: number;
  price_max: number;
  comment: string;
  prepaid: string;
};

export type ApiGroupEvent = {
  id: number;
  service_id: number;
  company_id: number;
  staff_id: number;
  date: string;
  length: number;
  capacity: number;
  records_count: number;
  instructions: string;
  comment: null | string;
  timestamp: number;
  prepaid: string;
  service: ApiGroupEventService;
  staff: ApiGroupEventStaff;
};

export type ApiGroupEventResponse = {
  success: boolean;
  data: ApiGroupEvent[];
  meta: any;
};

export type ApiIndividualTimeResponse = {
  success: boolean;
  data: TimeResponse[];
  meta: any[];
};

export type TimeResponse = {
  time: string;
  seance_length: number;
  sum_length: number;
  datetime: string;
};
