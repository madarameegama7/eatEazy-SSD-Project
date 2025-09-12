import axios from "axios";
import { API_URL } from "./ApiURL";
import { getAccessToken } from "../helper/TokenHelper";
import { getAuthHeaders } from "../helper/AuthHelper";
import { IPayment } from "../../interfaces/IPayment";
import { IPaymentHistoryItem } from "../../interfaces/IPayment";

interface PaymentResponse {
  success: boolean;
  message: string;
  data: {
    Amount: number;
    PaymentID: number;
    PaymentStatus: string;
    redirectUrl: string;
    success: boolean;
  }
}
export const extractPayHereParams = (redirectUrl: string) => {
  const url = new URL(redirectUrl);
  const params = new URLSearchParams(url.search);
  
  return {
    merchant_id: params.get('merchant_id') || '',
    return_url: params.get('return_url') || '',
    cancel_url: params.get('cancel_url') || '',
    notify_url: params.get('notify_url') || '',
    order_id: params.get('order_id') || '',
    items: params.get('items') || '',
    amount: params.get('amount') || '',
    currency: params.get('currency') || '',
    hash: params.get('hash') || ''
  };
};

const PaymentApi = {
  initiatePayment: async (OrderID: number): Promise<PaymentResponse> => {
    const accessToken = getAccessToken();
    if (!accessToken) throw new Error("No access token found. Please log in again.");

    try {
      const response = await axios.post(
        `${API_URL}/payments/initiate/${OrderID}`,
        {},
        {
          headers: {
            ...getAuthHeaders(),
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message || "Payment initiation failed");
      }

      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(
          error.response.data.message || "Failed to initiate payment. Please try again."
        );
      }
      throw new Error("An unexpected error occurred while initiating payment.");
    }
  },

  getPaymentById: async (PaymentID: number): Promise<IPayment> => {
    const accessToken = getAccessToken();
    if (!accessToken) throw new Error("No access token found. Please log in again.");

    try {
      const response = await axios.get(`${API_URL}/payments/${PaymentID}`, {
        headers: {
          ...getAuthHeaders(),
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || "Failed to retrieve payment.");
      }
      throw new Error("An unexpected error occurred while fetching payment.");
    }
  },

getPaymentHistory: async (): Promise<IPaymentHistoryItem[]> => {
  const accessToken = getAccessToken();
  if (!accessToken) throw new Error("No access token found. Please log in again.");

  try {
    // Get userId from token or pass it as parameter
    const userId = JSON.parse(atob(accessToken.split('.')[1])).userId;
    
    const response = await axios.get(
      `${API_URL}/payments/history/${userId}`,
      {
        headers: {
          ...getAuthHeaders(),
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.data.success) {
      throw new Error('Failed to fetch payment history');
    }

    return response.data.payments;
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Failed to get payment history.');
    }
    throw new Error('Payment service unavailable.');
  }
},

};


export default PaymentApi;
