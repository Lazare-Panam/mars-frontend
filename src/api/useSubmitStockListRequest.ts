import { useMutation } from "@tanstack/react-query";
import axiosClient from "./axiosClient";

export interface StockListRequest {
  name: string;
  email: string;
  phone: string;
}

export const submitStockListRequest = async (
  payload: StockListRequest,
): Promise<{ message: string }> => {
  const { data } = await axiosClient.post("/api/User/stock-list", payload);
  return data;
};

export const useSubmitStockListRequest = () => {
  return useMutation({
    mutationFn: submitStockListRequest,
  });
};
