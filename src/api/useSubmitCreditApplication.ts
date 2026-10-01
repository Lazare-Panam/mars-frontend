import { useMutation } from "@tanstack/react-query";
import { formatCreditMessage, type CreditApplication } from "@/lib/creditApplication";
import { submitEnquiry } from "./useSubmitEnquiry";

/**
 * Sends a credit application.
 *
 * TEMPORARY: the backend's credit-application endpoint isn't built yet, so for
 * now the answers go out as a normal enquiry (POST /api/User/enquiry) and the
 * sales team receives them by email. When the endpoint is ready, replace the
 * body of this function with a POST to it; nothing else needs to change.
 */
export const submitCreditApplication = async (app: CreditApplication) => {
  return submitEnquiry({
    userName: app.contactName,
    userEmail: app.email,
    userCompany: app.companyName,
    userCountry: "",
    message: formatCreditMessage(app),
  });
};

export const useSubmitCreditApplication = () => {
  return useMutation({
    mutationFn: submitCreditApplication,
  });
};
