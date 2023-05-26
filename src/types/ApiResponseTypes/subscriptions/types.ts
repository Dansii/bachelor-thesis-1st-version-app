export type ApiSubscriptionsResponse = {
  success: boolean;
  data: ApiSubscription[];
  meta: {
    count: number;
  };
};

export type ApiSubscription = {
  id: number;
  number: string;
  balance_string: string;
  created_date: string;
  activated_date: string | null;
  is_frozen: boolean;
  freeze_period: number;
  period: number;
  period_unit_id: number;
  expiration_date: string | null;
  status: {
    id: number;
    title: string;
    extended_title: string;
  };
  is_united_balance: boolean;
  united_balance_services_count: number;
  balance_container: {
    links: ApiServiceLink[];
  };
  type: ApiSubscriptionType;
};

export type ApiServiceLink = {
  count: number;
  service: ApiService;
};

export type ApiService = {
  id: number;
  category_id: number;
  title: string;
};

export type ApiSubscriptionType = {
  id: number;
  salon_group_id: number;
  title: string;
  period: number;
  period_unit_id: number;
  allow_freeze: boolean;
  freeze_limit: number;
  is_allow_empty_code: boolean;
  is_united_balance: boolean;
  united_balance_services_count: number;
  is_code_required: boolean;
  cost: number;
  is_archived: boolean;
  date_archived: string | null;
  balance_container: {
    links: ApiServiceLink[];
  };
};
