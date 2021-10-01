import jwtDecode from "jwt-decode";
import hasOwnProperty from "utils/hasOwnProperty";

const STORAGE_AUTH_KEY = "auth";

enum UserRoles {
  donor = "donor",
  merchant = "merchant",
  youth = "youth",
}

interface UserJwt {
  username: string;
  role: UserRoles;
}

const decodeAuthToken = (): UserJwt | null => {
  let payload: Object = {};
  const authToken = localStorage.getItem(STORAGE_AUTH_KEY) || "";

  try {
    payload = jwtDecode(authToken);
  } catch (e) {
    return null;
  }

  if (
    hasOwnProperty(payload, "username") &&
    typeof payload.username === "string" &&
    hasOwnProperty(payload, "role") &&
    typeof payload.role === "string" &&
    payload.role in UserRoles
  ) {
    return {
      // @ts-ignore
      role: payload.role,
      username: payload.username,
    };
  }

  return null;
};

export { UserRoles, decodeAuthToken };
