import axios from "axios";
import { API_URL } from "./constants";

export const fetchSortedData = async (sortKey, sortOrder, filters = {}) => {
  try {
    const {
      startDate,
      endDate,
      revenueMin,
      revenueMax,
      netIncomeMin,
      netIncomeMax,
    } = filters;
    const queryParams = new URLSearchParams();
    if (sortKey) queryParams.append("sort_by", sortKey);
    if (sortOrder) queryParams.append("order", sortOrder);
    if (startDate) queryParams.append("start_date", startDate);
    if (endDate) queryParams.append("end_date", endDate);
    if (revenueMin) queryParams.append("revenue_min", revenueMin);
    if (revenueMax) queryParams.append("revenue_max", revenueMax);
    if (netIncomeMin) queryParams.append("net_income_min", netIncomeMin);
    if (netIncomeMax) queryParams.append("net_income_max", netIncomeMax);
    const response = await axios.get(`${API_URL}?${queryParams.toString()}`);
    return Array.from(response.data.data);
  } catch (error) {
    console.error("Error fetching sorted data:", error);
  }
};
