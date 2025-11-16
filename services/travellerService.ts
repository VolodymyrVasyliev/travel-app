import axios from "axios";
import type { Traveller } from "../types/traveller";

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
  const response = await axios.get<TravellersHttpResponse>(
    `http://localhost:3000/users?page=${page}&perPage=${perPage}`
  );
  console.log(response.data);
  return response.data.data;
};
