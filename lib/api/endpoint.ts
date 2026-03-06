export const API = {
  AUTH: {
    LOGIN:    "/api/auth/login",
    REGISTER: "/api/auth/register",
    WHOAMI:   "/api/auth/whoami",
    LOGOUT:   "/api/auth/logout",
  },
  ADMIN_AUTH: {
    LOGIN:    "/api/admin/auth/login",
    REGISTER: "/api/admin/auth/register",
  },
  USER: {
    PROFILE:        "/api/user/profile",
    UPDATE_PROFILE: "/api/user/profile",
    UPLOAD_PHOTO:   "/api/user/upload-photo",
  },
  ADMIN: {
    USERS:       "/api/admin/users",
    DELETE_USER: (id: string) => `/api/admin/users/${id}`,
    UPDATE_USER: (id: string) => `/api/admin/users/${id}`,
    BUSES:       "/api/admin/buses",
  },
  BUSES: {
    GET_ALL:   "/api/admin/buses",
    GET_BY_ID: (id: string) => `/api/admin/buses/${id}`,
    CREATE:    "/api/admin/buses",
    UPDATE:    (id: string) => `/api/admin/buses/${id}`,
    DELETE:    (id: string) => `/api/admin/buses/${id}`,
    SEARCH:    "/api/buses/search",
  },
  BOOKINGS: {
    CREATE:      "/api/bookings",
    MY_BOOKINGS: "/api/user/bookings",
    GET_ALL:     "/api/admin/bookings",
    CANCEL:      (id: string) => `/api/bookings/${id}/cancel`,
  },
};