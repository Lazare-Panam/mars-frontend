import { useMutation } from "@tanstack/react-query";
import axiosClient from "./axiosClient";

// Mirrors the user-fillable fields of the backend CreditLineApplication.
// ApplicationId, Status and SubmittedAtUtc are server-resolved, so they are
// intentionally omitted from the request.
export interface CreditLineApplicationRequest {
  registrationNumber: string;
  companyName: string;
  vatNumber?: string;
  addressLine1: string;
  addressLine2?: string;
  website?: string;
  sector: string;
  yearsInBusiness: string;
  employees?: string;
  contactName: string;
  jobTitle: string;
  email: string;
  phone: string;
  creditLimitRequested: number;
  paymentTerms: string;
  currency: string;
  monthlyOrderValue: number;
  products?: string;
  signatoryName: string;
  signatoryTitle: string;
  signature: string;
  declarationDate: string; // ISO 8601
  declarationAccepted: boolean;
}

export interface CreditApplicationResponse {
  message: string;
  application: CreditLineApplicationRequest & {
    applicationId: number;
    status: number;
    submittedAtUtc: string;
  };
}

export const submitCreditApplication = async (
  payload: CreditLineApplicationRequest,
): Promise<CreditApplicationResponse> => {
  const { data } = await axiosClient.post(
    "/api/User/credit-applications",
    payload,
  );
  return data;
};

export const useSubmitCreditApplication = () => {
  return useMutation({
    mutationFn: submitCreditApplication,
  });
};
