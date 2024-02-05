export const USER_PROFILE = "user/profile";

export const FETCH_MODE_PAGE_VALUES = {
  paged: undefined,
  select_option: {
    limit: 999999,
    page: 1,
  },
};

export const SELECT_OPTIONS_CONFIG = {
  params: {
    limit: 999999999,
    page: 1,
  },
};

export const DEFAULT_RESPONSE_LIST: any = {
  meta: {
    current_page: 1,
    current_total: 1,
    final_page: 1,
    has_next_page: false,
    limit: 1,
    total: 0,
  },
  data: [],
  message: "",
};

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const DATE_FORMAT = "YYYY-MM-DD";
export const ACCOUNTING_DATE_FORMAT = "MM-DD-YYYY";
