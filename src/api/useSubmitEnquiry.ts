import { useMutation } from "@tanstack/react-query";
import axiosClient from "./axiosClient";

export interface EnquiryRequest {
  userName: string;
  userEmail: string;
  userCompany: string;
  userCountry: string;
  message: string;
  // Cloudflare Turnstile token. The backend rejects the enquiry if this is
  // missing or fails verification, so every caller must supply it.
  captchaToken: string;
}

export interface NotificationResult {
  receiptSent: boolean;
  internalNotificationSent: boolean;
}

export const submitEnquiry = async (
  payload: EnquiryRequest,
): Promise<NotificationResult> => {
  const { data } = await axiosClient.post("/api/User/enquiry", payload);
  return data;
};

export const useSubmitEnquiry = () => {
  return useMutation({
    mutationFn: submitEnquiry,
  });
};
