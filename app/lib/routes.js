const ROUTES = {
  AUTH: {
    LOGIN: "/api/auth/login",
    SIGNUP: "/api/auth/signup",
  },
  OTP: {
    SEND: "/api/otp/send",
    VERIFY: "/api/otp/verify",
  },
  CLIENT: {
    BOOKINGS: "/api/client/bookings",
    SLOTS: "api/client/slots",
    CREATE_BOOKING: "api/client/bookings",
  },
  PUBLIC: {
    CLASS_TYPES: "api/public/class-types",
    TRAINERS: "api/users/trainers",
  },
  SLOTS: {
    NEXT_CLASS: "/api/slots/next-class",
  },
  BOOKINGS: {
    MY_SCHEDULE: "/api/bookings/my-schedule",
  },
  REFERRALS: {
    MY_REFERRALS: "/api/referrals/my-referrals",
    CREATE: "/api/referrals",
  },
  EVENTS: {
    LIST: "/api/events",
    REGISTER: (id) => `/api/events/${id}/register`,
  },
  USERS: {
    UPDATE: (id) => `/api/users/${id}`,
  },
  TRANSACTIONS: {
    MY_WALLET: "/api/transactions/my-wallet",
    MY_HISTORY: "/api/transactions/my-history",
  },
  MEMBERSHIP: {
    MY_DETAILS: "api/membership/my-details",
    SUBSCRIBE: (id) => `api/membership/subscribe/${id}`,
  },
};

export default ROUTES;
