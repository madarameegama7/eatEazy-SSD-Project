// src/components/payment/OrderSummary.tsx

import React from 'react';
import { Box, Typography, Divider, Paper } from '@mui/material';

interface OrderItem {
  MenuItemID: number;
  ItemName: string;
  Quantity: number;
  Price: number;
}

interface OrderSummaryProps {
  orderDetails: {
    OrderID: number;
    Items: OrderItem[];
    TotalAmount: number;
    SubTotal?: number;
    DeliveryFee?: number;
    Discount?: number;
    Status?: string;
  };
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ orderDetails }) => {
  if (!orderDetails) return null;

  const subtotal = orderDetails.SubTotal || 
    orderDetails.Items?.reduce((sum, item) => sum + (item.Price * item.Quantity), 0) || 0;
  
  const deliveryFee = orderDetails.DeliveryFee || 150; // Default delivery fee
  const discount = orderDetails.Discount || 0;
  const total = orderDetails.TotalAmount;

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Order Summary
      </Typography>
      
      <Box sx={{ mb: 2 }}>
        {orderDetails.Items && orderDetails.Items.map((item) => (
          <Box key={item.MenuItemID} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2">
              {item.Quantity}x {item.ItemName}
            </Typography>
            <Typography variant="body2">
              Rs. {(item.Price * item.Quantity).toFixed(2)}
            </Typography>
          </Box>
        ))}
      </Box>
      
      <Divider sx={{ my: 2 }} />
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="body2" color="text.secondary">Subtotal</Typography>
        <Typography variant="body2">Rs. {subtotal.toFixed(2)}</Typography>
      </Box>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="body2" color="text.secondary">Delivery Fee</Typography>
        <Typography variant="body2">Rs. {deliveryFee.toFixed(2)}</Typography>
      </Box>
      
      {discount > 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2" color="success.main">Discount</Typography>
          <Typography variant="body2" color="success.main">-Rs. {discount.toFixed(2)}</Typography>
        </Box>
      )}
      
      <Divider sx={{ my: 2 }} />
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="subtitle1" fontWeight="bold">Total</Typography>
        <Typography variant="subtitle1" fontWeight="bold" color="#EA7300">
          Rs. {total.toFixed(2)}
        </Typography>
      </Box>
      
      {orderDetails.Status && (
        <Box sx={{ mt: 2, p: 1, bgcolor: 'rgba(234, 115, 0, 0.1)', borderRadius: 1 }}>
          <Typography variant="body2" textAlign="center">
            Order Status: <strong>{orderDetails.Status}</strong>
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default OrderSummary;