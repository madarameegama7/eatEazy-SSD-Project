import axios from "axios";
import { API_URL } from "./ApiURL";
import { getAuthHeaders } from "../helper/AuthHelper";
import { getAccessToken } from "../helper/TokenHelper";
//import { Idelivery } from "src/interfaces/IDelivery";
import { IdeliveryRoutes } from "src/interfaces/IDeliveryRoutes";

const DeliveryApi = {
  //delivery APIs
  assignDriver: async (orderId: number) => {
    const accessToken = getAccessToken();
    if (!accessToken) {
      throw new Error("No access token found.");
    }
    try {
      const response = await axios.post(
        `${API_URL}/delivery/assign/${orderId}`,
        {},
        {
          headers: {
            ...getAuthHeaders(),
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(
          error.response.data.message || "Failed to a Assign Driver."
        );
      }
      throw new Error("An unexpected error occurred.");
    }
  },
  trackDelivery: async (deliveryId: number) => {
    const accessToken = getAccessToken();
    if (!accessToken) {
      throw new Error("No access token found.");
    }
    try {
      const response = await axios.get(
        `${API_URL}/delivery/track/${deliveryId}`,
        {
          headers: {
            ...getAuthHeaders(),
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(
          error.response.data.message || "Failed to track the Delivery."
        );
      }
      throw new Error("An unexpected error occurred.");
    }
  },
  updateDeliveryStatus: async (deliveryId: number, status: string) => {
    const accessToken = getAccessToken();
    if (!accessToken) {
      throw new Error("No access token found.");
    }
    try {
      const response = await axios.patch(
        `${API_URL}/delivery/update-status/${deliveryId}`,
        { status },
        {
          headers: {
            ...getAuthHeaders(),
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(
          error.response.data.message || "Failed to update the Delivery."
        );
      }
      throw new Error("An unexpected error occurred.");
    }
  },
  //Delivery Routes APIs
  getDeliveryRoute: async (deliveryId: number) => {
    const accessToken = getAccessToken();
    if (!accessToken) {
      throw new Error("No access token found.");
    }
    try {
      const response = await axios.get(
        `${API_URL}/delivery/delivery-route/${deliveryId}`,
        {
          headers: {
            ...getAuthHeaders(),
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(
          error.response.data.message || "Failed to fetch the Delivery Route."
        );
      }
      throw new Error("An unexpected error occurred.");
    }
  },
  addDeliveryRoute: async (
    deliveryId: number,
    routeDetails: IdeliveryRoutes
  ) => {
    const accessToken = getAccessToken();
    if (!accessToken) {
      throw new Error("No access token found.");
    }
    try {
      const response = await axios.post(
        `${API_URL}/delivery/${deliveryId}/route`,
        routeDetails,
        {
          headers: {
            ...getAuthHeaders(),
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(
          error.response.data.message || "Failed to add the Delivery Route."
        );
      }
      throw new Error("An unexpected error occurred.");
    }
  },
};

export default DeliveryApi;
