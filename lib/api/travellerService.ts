import axios from "axios";
import type { Traveller } from "../../types/traveller";
import { backendAPI } from "../backendAPI";

interface TravellersHttpResponse {
  status: number;
  message: string;
  data: {
    data: Traveller[];
    page: number;
    perPage: number;
    totalItems: number;
    totalPages: number;
  };
}

export const fetchTravellers = async (
  page: number,
  perPage: number
): Promise<{
  data: Traveller[];
  page: number;
  perPage: number;
  totalPages: number;
}> => {
  const response = await backendAPI.get<TravellersHttpResponse>(
    `/users?page=${page}&perPage=${perPage}`
  );

  return response.data.data;
};
