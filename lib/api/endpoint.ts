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
};