import React, { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import DeliveryApi from "@app_utils/api/DeliveryAPI";
import { getAccessToken } from "@app_utils/helper/TokenHelper";
import { useParams } from "react-router-dom";

export const DeliveryAssignView = () => {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [Delivery, setDelivery] = useState<any[]>([]);
  const [DeliveryData, SetDeliveryData] = useState({
    DeliveryId: "",
    OrderId: "",
    DeliveryPersonId: "",
    AssignedAt: "",
    DeliveredAt: "",
    DeliveryStatus: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const handleExpandClick = (index: number) => {
    setExpanded(expanded === index ? null : index);
  };

  const { orderId } = useParams<{ orderId: string }>();
  const OrderId = orderId ? parseInt(orderId, 10) : NaN;

  const assignDelivery = async () => {
    try {
      //fetch order details for relevent Order
      const token = getAccessToken();
      if (!token) {
        throw new Error("No access token found.");
      }
      const data = await DeliveryApi.assignDriver(OrderId);
      setDelivery(data);
      //redirect to delivery status page
    } catch (error: any) {
      setError(error.message || "Failed to fetch delivery data.");
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }
  <Box
    sx={{
      py: 4,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      ml: 2,
      mr: 2,
    }}
  ></Box>;
};
