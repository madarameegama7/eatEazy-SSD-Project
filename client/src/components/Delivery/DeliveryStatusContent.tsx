import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import DeliveryApi from "@app_utils/api/DeliveryAPI";
import { getAccessToken } from "@app_utils/helper/TokenHelper";
import { useParams } from "react-router-dom";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: "rotate(0deg)",
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: "rotate(180deg)",
      },
    },
  ],
}));

export const DeliveryStatusView = () => {
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

  useEffect(() => {
    const { orderId } = useParams<{ orderId: string }>();
    const OrderId = orderId ? parseInt(orderId, 10) : NaN;
    const fetchDeliveryData = async () => {
      try {
        const token = getAccessToken();
        if (!token) {
          throw new Error("No access token found.");
        }
        const data = await DeliveryApi.trackDelivery(OrderId);
        setDelivery(data);
        console.log("Fetched Delivery" + data);
      } catch (error: any) {
        setError(error.message || "Failed to fetch delivery data.");
      } finally {
        setLoading(false);
      }
    };
    fetchDeliveryData();
  }, []);

  //update delivery status
  //must used in a form to update the status of delivery
  const handleDeliveryStatusChange = async () => {
    setLoading(true);
    try {
      const token = getAccessToken();
      if (!token) {
        throw new Error("No access token found.");
      }
      if (!DeliveryData.DeliveryId) {
        throw new Error("No delivery ID found.");
      }
      const DeliveryId = parseInt(DeliveryData.DeliveryId, 10);
      const Deliverystatus = DeliveryData.DeliveryStatus; // Assuming you want to update the status to the current status
      const data = await DeliveryApi.updateDeliveryStatus(
        DeliveryId,
        Deliverystatus
      );
      setDelivery(data);
      console.log("Fetched Delivery" + data);
    } catch (error: any) {
      setError(error.message || "Failed to fetch delivery data.");
    } finally {
      setLoading(false);
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
