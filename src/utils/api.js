import axios from "axios";
import { API_URL } from "./constants";

export const fetchData = async () => {
  try {
    const response = await axios.get(API_URL);
    return Array.from(response.data.data);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
