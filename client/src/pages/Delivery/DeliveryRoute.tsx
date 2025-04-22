import ResponsiveAppBar from "@app_common/Pre-Login/Navbar";
import { DeliveryRouteView } from "@app_components/Delivery/DeliveryRouteContent";
import { CssBaseline } from "@mui/material";
import React from "react";

export const DeliveryRoute: React.FC = () => {
  return (
    <div>
      <CssBaseline />
      <ResponsiveAppBar />
      <DeliveryRouteView />
    </div>
  );
};
