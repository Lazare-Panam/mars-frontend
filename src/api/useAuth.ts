import { useMutation } from "@tanstack/react-query";
import axiosClient from "./axiosClient";
import { useAuthStore } from "@/store/useAuthStore";

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  companyName: string;
  jobTitle: string;
  phoneNumber: string;
  country: string;
}

export interface RegisterResponse {
  message: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  expiration: string;
}

export const registerUser = async (
  payload: RegisterPayload,
): Promise<RegisterResponse> => {
  const { data } = await axiosClient.post("/api/auth/register", payload);
  return data;
};

export const loginUser = async (
  payload: LoginPayload,
): Promise<LoginResponse> => {
  const { data } = await axiosClient.post("/api/auth/login", payload);
  return data;
};

export interface LogoutResponse {
  message: string;
}

/**
 * POST /api/Auth/logout (needs the Bearer token, which axiosClient attaches).
 * The API uses stateless JWTs and no longer revokes tokens (mars-api 6ffe986),
 * so this only records the logout on the server; the token keeps working until
 * it expires unless the browser discards it, which logout() in lib/logout.ts does.
 */
export const logoutUser = async (): Promise<LogoutResponse> => {
  const { data } = await axiosClient.post<LogoutResponse>("/api/Auth/logout");
  return data;
};

export const useRegister = () => {
  return useMutation({
    mutationFn: registerUser,
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: (payload: LoginPayload) => loginUser(payload),
    onSuccess: (data) => {
      // Saves the token and tells listeners (navbar, My Account) about the login.
      useAuthStore.getState().setToken(data.token, data.expiration);
    },
  });
};
