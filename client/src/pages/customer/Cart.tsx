import React from "react";
import { useLocation } from "react-router-dom";
import ResponsiveAppBar from "@app_common/Post-Login/Navbar";
import { CssBaseline } from "@mui/material";
import { CartItemsContent } from "@app_components/customer/CartItemsContent";

export const CartScreen: React.FC = () => {
  const location = useLocation();
  const { menuItemId, name } = location.state as {
    menuItemId: string;
    name: string;
  };

  if (!menuItemId) {
    return <div>Error: No menu ID provided</div>;
  } else {
    console.log("Restaurant ID:", menuItemId);
  }
  return (
    <div>
      <CssBaseline />
      <ResponsiveAppBar />
      <CartItemsContent menuItemId={menuItemId} name={name} />
    </div>
  );
};
