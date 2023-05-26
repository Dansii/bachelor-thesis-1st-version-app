export type ApiRecordsResponse = {
  success: boolean;
  data: ResponseRecord[];
  meta: Meta;
};

export type ResponseRecord = {
  id: number;
  company_id: number;
  staff_id: number;
  services: ResponseService[];
  goods_transactions: any[];
  staff: ResponseStaff;
  client: Client;
  comer: any;
  clients_count: number;
  date: string;
  datetime: string;
  create_date: string;
  comment: string;
  online: boolean;
  visit_attendance: number;
  attendance: number;
  confirmed: number;
  seance_length: number;
  length: number;
  sms_before: number;
  sms_now: number;
  sms_now_text: string;
  email_now: number;
  notified: number;
  master_request: number;
  api_id: string;
  from_url: string;
  review_requested: number;
  visit_id: number;
  created_user_id: number;
  deleted: boolean;
  paid_full: number;
  payment_status: number;
  prepaid: boolean;
  prepaid_confirmed: boolean;
  last_change_date: string;
  custom_color: string;
  custom_font_color: string;
  record_labels: any[];
  activity_id: number;
  custom_fields: any[];
  sms_remain_hours: number;
  email_remain_hours: number;
  bookform_id: number;
  record_from: string;
  is_mobile: number;
  is_sale_bill_printed: boolean;
  resource_instance_ids: any[];
};

export type ResponseService = {
  id: number;
  title: string;
  cost: number;
  cost_to_pay: number;
  manual_cost: number;
  cost_per_unit: number;
  discount: number;
  first_cost: number;
  amount: number;
};

export type ResponseStaff = {
  id: number;
  api_id: any;
  name: string;
  specialization: string;
  position: Position;
  avatar: string;
  avatar_big: string;
  rating: number;
  votes_count: number;
};

export type Position = {
  id: number;
  title: string;
};

export type Client = {
  id: number;
  name: string;
  surname: string;
  patronymic: string;
  display_name: string;
  phone: string;
  card: string;
  email: string;
  success_visits_count: number;
  fail_visits_count: number;
  discount: number;
  is_new: boolean;
  custom_fields: any[];
};

export type Meta = {
  page: number;
  total_count: number;
};
