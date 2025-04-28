import axios from "axios";
import { API_URL } from "./ApiURL";
import { getAuthHeaders } from "@app_utils/helper/AuthHelper";
import { getAccessToken } from "@app_utils/helper/TokenHelper";
import { IRestaurant } from "@app_interfaces/IRestaurant";
import { IMenu } from "@app_interfaces/IMenu";

const RestaurantApi = {
  // Restaurant APIs
  registerRestaurant: async (restaurantData: IRestaurant) => {
    const accessToken = getAccessToken();
    if (!accessToken) {
      throw new Error("No access token found.");
    }
    try {
      const response = await axios.post(
        `${API_URL}/restaurants/register`,
        restaurantData,
        {
          headers: {
            ...getAuthHeaders(),
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(
          error.response.data.message || "Failed to register restaurant."
        );
      }
      throw new Error("An unexpected error occurred.");
    }
  },

  getAllRestaurants: async () => {
    const accessToken = getAccessToken();
    if (!accessToken) {
      throw new Error("No access token found.");
    }
    try {
      const response = await axios.get(`${API_URL}/restaurants`, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(
          error.response.data.message || "Failed to fetch restaurants."
        );
      }
      throw new Error("An unexpected error occurred.");
    }
  },

  getRestaurantById: async (restaurantId: string) => {
    const accessToken = getAccessToken();
    if (!accessToken) {
      throw new Error("No access token found. Please log in again.");
    }
    try {
      const response = await axios.get(
        `${API_URL}/restaurants/${restaurantId}`,
        {
          headers: getAuthHeaders(),
        }
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(
          error.response.data.message || "Failed to fetch restaurant."
        );
      }
      throw new Error("An unexpected error occurred.");
    }
  },

  updateRestaurantById: async (
    restaurantId: string,
    restaurantData: IRestaurant
  ) => {
    const accessToken = getAccessToken();
    if (!accessToken) {
      throw new Error("No access token found. Please log in again.");
    }
    try {
      const response = await axios.put(
        `${API_URL}/restaurants/${restaurantId}`,
        restaurantData,
        {
          headers: {
            ...getAuthHeaders(),
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(
          error.response.data.message || "Failed to update restaurant."
        );
      }
      throw new Error("An unexpected error occurred.");
    }
  },

  deleteRestaurantById: async (restaurantId: string) => {
    const accessToken = getAccessToken();
    if (!accessToken) {
      throw new Error("No access token found. Please log in again.");
    }
    try {
      const response = await axios.delete(
        `${API_URL}/restaurants/${restaurantId}`,
        {
          headers: {
            ...getAuthHeaders(),
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(
          error.response.data.message || "Failed to delete restaurant."
        );
      }
      throw new Error("An unexpected error occurred.");
    }
  },

  //Menu APIs
  createMenuItem: async (restaurantId: string, menuItemData: IMenu) => {
    const accessToken = getAccessToken();
    if (!accessToken) {
      throw new Error("No access token found. Please log in again.");
    }
    try {
      const response = await axios.post(
        `${API_URL}/restaurants/${restaurantId}/menu`,
        menuItemData,
        {
          headers: getAuthHeaders(),
        }
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(
          error.response.data.message || "Failed to create menu item."
        );
      }
      throw new Error("An unexpected error occurred.");
    }
  },

  getMenuItemsByRestaurantId: async (restaurantId: string) => {
    const accessToken = getAccessToken();
    if (!accessToken) {
      throw new Error("No access token found. Please log in again.");
    }
    try {
      const response = await axios.get(
        `${API_URL}/restaurants/${restaurantId}/menu`,
        {
          headers: getAuthHeaders(),
        }
      );
      console.log("Menu items:", response.data);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(
          error.response.data.message || "Failed to fetch menu items."
        );
      }
      throw new Error("An unexpected error occurred.");
    }
  },
};

export default RestaurantApi;
