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

export const DeliveryRouteView = () => {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [DeliveryRoute, setDeliveryRoute] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [DeliveryRouteData, SetDeliveryRouteData] = useState({
    RouteID: 0,
    DeliveryID: 0,
    StartLat: 0,
    StartLng: 0,
    EndLat: 0,
    EndLng: 0,
  });
  const handleExpandClick = (index: number) => {
    setExpanded(expanded === index ? null : index);
  };

  //fetching exsisting routedata for relevent Order
  useEffect(() => {
    const { orderId } = useParams<{ orderId: string }>();
    const OrderId = orderId ? parseInt(orderId, 10) : NaN;
    const fetchDeliveryRouteData = async () => {
      try {
        const token = getAccessToken();
        if (!token) {
          throw new Error("No access token found.");
        }
        const data = await DeliveryApi.getDeliveryRoute(OrderId);
        setDeliveryRoute(data);
        console.log("Fetched Delivery" + data);
      } catch (error: any) {
        setError(error.message || "Failed to fetch delivery data.");
      } finally {
        setLoading(false);
      }
    };
    fetchDeliveryRouteData();
  }, []);

  //function to set a new route
  //must be used in a form with a Map API
  const setDeliveryRouteData = async () => {
    if (isNaN(DeliveryRouteData.DeliveryID)) {
      throw new Error("Invalid Delivery Route Data");
    }
    try {
      const res = await DeliveryApi.addDeliveryRoute(
        DeliveryRouteData.DeliveryID,
        DeliveryRouteData
      );
      console.log(res);
      alert("Delivery Route added successfully!");
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
