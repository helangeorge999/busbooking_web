export const API = {
  AUTH: {
    LOGIN:           "/api/auth/login",
    REGISTER:        "/api/auth/register",
    WHOAMI:          "/api/auth/whoami",
    LOGOUT:          "/api/auth/logout",
    FORGOT_PASSWORD: "/api/auth/forgot-password",
    RESET_PASSWORD:  "/api/auth/reset-password",
  },
  ADMIN_AUTH: {
    LOGIN:    "/api/admin/auth/login",
    REGISTER: "/api/admin/auth/register",
  },
  USER: {
    PROFILE:         "/api/user/profile",
    UPDATE_PROFILE:  "/api/user/profile",
    UPLOAD_PHOTO:    "/api/user/upload-photo",
    CHANGE_PASSWORD: "/api/user/change-password",
  },
  ADMIN: {
    USERS:       "/api/admin/users",
    DELETE_USER: (id: string) => `/api/admin/users/${id}`,
    UPDATE_USER: (id: string) => `/api/admin/users/${id}`,
    BUSES:       "/api/buses",
  },
  BUSES: {
    GET_ALL:   "/api/buses",
    GET_BY_ID: (id: string) => `/api/buses/${id}`,
    CREATE:    "/api/buses",
    UPDATE:    (id: string) => `/api/buses/${id}`,
    DELETE:    (id: string) => `/api/buses/${id}`,
    SEARCH:    "/api/buses/search",
  },
  BOOKINGS: {
    CREATE:      "/api/bookings",
    MY_BOOKINGS: "/api/bookings/my-bookings",
    GET_ALL:     "/api/bookings",
    BOOKED_SEATS: "/api/bookings/booked-seats",
    CANCEL:      (id: string) => `/api/bookings/${id}/cancel`,
  },
};