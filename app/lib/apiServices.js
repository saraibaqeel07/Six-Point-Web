import axiosInstance from "./axios";
import ROUTES from "./routes";

// ── Auth ──────────────────────────────────────────────────────────────────────

export const loginService = async (email, password) => {
  const { data } = await axiosInstance.post(ROUTES.AUTH.LOGIN, { email, password });
  return data;
};

export const signupService = async ({ firstName, lastName, gender, role, email, password, confirmPassword }) => {
  const { data } = await axiosInstance.post(ROUTES.AUTH.SIGNUP, {
    firstName,
    lastName,
    gender,
    role,
    email,
    password,
    confirmPassword,
  });
  return data;
};

// ── Client ────────────────────────────────────────────────────────────────────

// ── Book a Class ──────────────────────────────────────────────────────────────

export const getClassTypesService = async ({ q, page = 1, limit = 10, activeOnly } = {}) => {
  const params = { page, limit };
  if (q) params.q = q;
  if (activeOnly !== undefined) params.activeOnly = activeOnly;
  const { data } = await axiosInstance.get(ROUTES.PUBLIC.CLASS_TYPES, { params });
  return data;
};

export const getTrainersService = async () => {
  const { data } = await axiosInstance.get(ROUTES.PUBLIC.TRAINERS);
  return data;
};

export const getAvailableSlotsService = async ({ date, classTypeId, coachId } = {}) => {
  const params = { date };
  if (classTypeId) params.classTypeId = classTypeId;
  if (coachId) params.coachId = coachId;
  const { data } = await axiosInstance.get(ROUTES.CLIENT.SLOTS, { params });
  return data;
};

export const createBookingService = async (classId) => {
  const { data } = await axiosInstance.post(ROUTES.CLIENT.CREATE_BOOKING, { classId });
  return data;
};

// ── Client Bookings ───────────────────────────────────────────────────────────

export const getClientBookingsService = async ({ status, page = 1, limit = 10 } = {}) => {
  const params = { page, limit };
  if (status) params.status = status;
  const { data } = await axiosInstance.get(ROUTES.CLIENT.BOOKINGS, { params });
  return data;
};

// ── Membership ────────────────────────────────────────────────────────────────

export const getMembershipDetailsService = async () => {
  const { data } = await axiosInstance.get(ROUTES.MEMBERSHIP.MY_DETAILS);
  return data;
};

export const subscribeMembershipService = async (membershipId) => {
  const { data } = await axiosInstance.post(ROUTES.MEMBERSHIP.SUBSCRIBE(membershipId));
  return data;
};

// ── Slots ─────────────────────────────────────────────────────────────────────

export const getNextClassService = async () => {
  const { data } = await axiosInstance.get(ROUTES.SLOTS.NEXT_CLASS);
  return data;
};

// ── Users ─────────────────────────────────────────────────────────────────────

export const updateUserService = async (id, payload) => {
  const { data } = await axiosInstance.patch(ROUTES.USERS.UPDATE(id), payload);
  return data;
};

// ── Transactions ──────────────────────────────────────────────────────────────

export const getMyWalletService = async () => {
  const { data } = await axiosInstance.get(ROUTES.TRANSACTIONS.MY_WALLET);
  return data;
};

export const getMyHistoryService = async () => {
  const { data } = await axiosInstance.get(ROUTES.TRANSACTIONS.MY_HISTORY);
  return data;
};

// ── Events ────────────────────────────────────────────────────────────────────

export const getEventsService = async ({ filter, search } = {}) => {
  const params = {};
  if (filter) params.filter = filter;
  if (search) params.search = search;
  const { data } = await axiosInstance.get(ROUTES.EVENTS.LIST, { params });
  return data;
};

export const registerEventService = async (id) => {
  const { data } = await axiosInstance.post(ROUTES.EVENTS.REGISTER(id));
  return data;
};

// ── Referrals ─────────────────────────────────────────────────────────────────

export const getMyReferralsService = async () => {
  const { data } = await axiosInstance.get(ROUTES.REFERRALS.MY_REFERRALS);
  return data;
};

export const createReferralService = async ({ fullName, email, phoneNumber, notes }) => {
  const { data } = await axiosInstance.post(ROUTES.REFERRALS.CREATE, { fullName, email, phoneNumber, notes });
  return data;
};

// ── My Schedule ───────────────────────────────────────────────────────────────

export const getMyScheduleService = async ({ month, year } = {}) => {
  const { data } = await axiosInstance.get(ROUTES.BOOKINGS.MY_SCHEDULE, { params: { month, year } });
  return data;
};

// ── OTP ───────────────────────────────────────────────────────────────────────

export const sendOtpService = async (identifier, purpose) => {
  const { data } = await axiosInstance.post(ROUTES.OTP.SEND, { identifier, purpose });
  return data;
};

export const verifyOtpService = async (identifier, purpose, code) => {
  const { data } = await axiosInstance.post(ROUTES.OTP.VERIFY, { identifier, purpose, code });
  return data;
};
