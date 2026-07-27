import { useMutation } from "@tanstack/react-query";
import axiosClient from "./axiosClient";

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

export const useRegister = () => {
  return useMutation({
    mutationFn: registerUser,
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: (payload: LoginPayload) => loginUser(payload),
    onSuccess: (data) => {
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("authExpiration", data.expiration);
    },
  });
};
