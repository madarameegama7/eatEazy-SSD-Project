import React from "react";

interface CartItemsContentProps {
  menuItemId: string;
  name: string;
}

export const CartItemsContent: React.FC<CartItemsContentProps> = ({
  menuItemId,
  name,
}) => {
  return (
    <div>
      <h1>Menu Item ID: {menuItemId}</h1>
      <h1>Name: {name}</h1>
    </div>
  );
};
