export interface IPayment {
    PaymentID?: number;
    OrderID: number;
    Amount: number;
    PaymentMethod: 'PayHere';
    paymentStatus?: 'Pending' | 'Completed' | 'Failed'; 
    TransactionID?: string;
    PaymentDate?: string; 
  }

  export interface IPayHerePayload {
    merchant_id: string;
    return_url: string;
    cancel_url: string;
    notify_url: string;
    order_id: string;
    items: string;
    payhere_amount: number;
    payhere_currency: 'LKR';
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    country: string;
    hash: string
  }

  
export interface IPaymentHistoryItem {
  PaymentID: number;
  OrderID: number;
  Amount: number;
  PaymentMethod: string;
  CreatedAt: string;
  Status: string;
  TransactionReference?: string;
}
  
  