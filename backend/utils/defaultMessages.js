export const NO_AUTH_HEADER = "No authorization header found";
export const INVALID_AUTH_HEADER = "Authorization header is invalid";

export const createTextMessage = (message) => ({
  message,
});

export const createJwtMessage = (token) => ({
  jwt: token,
});
