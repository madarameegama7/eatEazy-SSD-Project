import ResponsiveAppBar from "@app_common/Pre-Login/Navbar";
import { DeliveryStatusView } from "@app_components/Delivery/DeliveryStatusContent";
import { CssBaseline } from "@mui/material";
import React from "react";

export const DeliveryStatus: React.FC = () => {
  return (
    <div>
      <CssBaseline />
      <ResponsiveAppBar />
      <DeliveryStatusView />
    </div>
  );
};
