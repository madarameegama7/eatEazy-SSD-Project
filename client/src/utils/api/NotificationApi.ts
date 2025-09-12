// src/utils/api/NotificationApi.ts
import axios from 'axios';
import { API_URL } from './ApiURL';
import { getAccessToken } from '../helper/TokenHelper';
import { INotification } from '@app_interfaces/INotification'; // Adjust the import path as necessary
// Define a basic interface for a notification


// Helper function to get auth headers
const getAuthHeaders = () => {
  const accessToken = getAccessToken();
  if (!accessToken) {
    // Depending on your auth flow, you might want to redirect to login here
    throw new Error("No access token found.");
  }
  return {
    Authorization: `Bearer ${accessToken}`,
  };
};

const NotificationApi = {
  /**
   * Fetches notifications for the currently logged-in user.
   * @returns Promise resolving with an array of notifications.
   */
  getNotifications: async (): Promise<INotification[]> => {
    try {
      const response = await axios.get(
        `${API_URL}/notifications/myNotifications`,
        { headers: getAuthHeaders() }
      );
      // Assuming your backend returns an array of notifications directly
      return response.data; 
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'Failed to fetch notifications');
      }
      throw new Error('Notification service unavailable');
    }
  },

  /**
   * Marks a specific notification as read.
   * NOTE: This requires a backend endpoint to be implemented.
   * @param notificationId The ID of the notification to mark as read.
   * @returns Promise resolving when the notification is marked as read.
   */
  markAsRead: async (notificationId: number): Promise<void> => {
    // TODO: Implement this backend endpoint in your notification service
    // Example: await axios.put(`${API_URL}/notifications/${notificationId}/read`, {}, { headers: getAuthHeaders() });
    console.warn(`Marking notification ${notificationId} as read is not implemented in backend yet.`);
    // For now, just simulate success or handle as needed for development
    return Promise.resolve();
  },

  /**
   * Marks all notifications for the user as read.
   * NOTE: This requires a backend endpoint to be implemented.
   * @returns Promise resolving when all notifications are marked as read.
   */
  markAllAsRead: async (): Promise<void> => {
    // TODO: Implement this backend endpoint in your notification service
    // Example: await axios.put(`${API_URL}/notifications/mark-all-read`, {}, { headers: getAuthHeaders() });
    console.warn(`Marking all notifications as read is not implemented in backend yet.`);
     return Promise.resolve();
  }
};

export default NotificationApi;