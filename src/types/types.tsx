export type Service = {
  name: string;
  serviceId?: number;
  duration?: string | number | null;
  price: number;
  cancellationTime?: string;
  date?: string;
  capacity?: number;
  coaches?: Coach[];
};

export type ServiceCategory = {
  type: "individual" | "group";
  categoryId: number;
  services: Service[];
};

export type Coach = {
  name: string;
  coachId?: number;
  bio?: string;
  avatar?: string;
};

export type TimeSlot = {
  from: string;
  to: string;
  date: string;
};

export type GroupEvent = {
  eventId: number;
  date: string;
  duration: number;
  capacity: number;
  booked: number;
  service: Service;
  coach: Coach;
};

export type Record = {
  recordId: number;
  service: Service;
  coach: Coach;
  date: string;
  length: number;
  status?: "Visited" | "Cancelled" | "Upcoming";
};

export type Subscription = {
  title: string;
  balance: number;
  left: number;
  active: boolean;
  activeTill?: string | null;
  directions: Direction[];
};

export type Direction = {
  name: string;
};

export type User = {
  id: number;
  userToken: string;
  name: string;
  phone: string;
  avatar: string;
};

export type TWeekDay = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";

export type TWeekItem = {
  day: TWeekDay;
  date: number;
  value: string;
  disabled: boolean;
};
