const axios = require("axios");
const orderRepo = require("../repository/orderRepository");
const { API_GATEWAY_PORT} = require('../config/env');

const verifyToken = async (token) => {
    if (!token) {
        console.error("No token provided!");
        throw new Error("Token is required.");
      }
    
      //console.log("Verifying token:", token);

  const response = await axios.post(
    `http://localhost:4000/auth/verify`,
    { token }, 
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.user;
};

const getMenuItemPrice = async (restaurantId, menuItemId, token) => {
  const response = await axios.get(
    `http://localhost:4000/restaurants/${restaurantId}/menu`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const menuItems = response.data;
  const item = menuItems.find((m) => m.MenuItemID === menuItemId);
  return item?.Price;
};

const addToCart = async (token, items, restaurantId) => {
  const user = await verifyToken(token);
  const userId = user.id;

  let cart = await orderRepo.findActiveCart(userId, restaurantId);

  // Create new cart if not exists
  if (!cart) {
    cart = await orderRepo.createCart(userId, restaurantId, "ACTIVE");
  }

  for (const item of items) {
    const price = await getMenuItemPrice(restaurantId, item.menuItemId, token);
    if (!price) throw new Error(`Invalid menu item: ${item.menuItemId}`);

    await orderRepo.createCartItem({
      CartID: cart.CartID,
      MenuItemID: item.menuItemId,
      Quantity: item.quantity,
      Price: parseFloat(price),
    });
  }

  return { message: "Items added to cart", cartId: cart.CartID };
};

const checkout = async (token, restaurantId) => {
  const user = await verifyToken(token);
  const userId = user.id;

  const cart = await orderRepo.findActiveCart(userId, restaurantId);
  if (!cart) throw new Error("No active cart to checkout");

  const cartItems = await orderRepo.getCartItems(cart.CartID);
  if (cartItems.length === 0) throw new Error("Cart is empty");

  const total = cartItems.reduce(
    (sum, item) => sum + item.Price * item.Quantity,
    0
  );

  const order = await orderRepo.createOrder({
    UserID: userId,
    RestaurantID: restaurantId,
    CartID: cart.CartID,
    TotalAmount: total,
    Items: {
      create: cartItems.map((item) => ({
        MenuItemID: item.MenuItemID,
        Quantity: item.Quantity,
        Price: item.Price,
      })),
    },
  });

  await orderRepo.updateCartStatus(cart.CartID, "COMPLETED");

  return order;
};


//updateCart function
const updateCart = async (cartId, items) => {
  try {
    await orderRepo.updateCartItems(cartId, items);
    
    const order = await orderRepo.getOrderByCartId(cartId);
    
    if (order) {
      const updatedCartItems = await orderRepo.getCartItems(cartId);
      
      const total = updatedCartItems.reduce(
        (sum, item) => sum + item.Price * item.Quantity,
        0
      );
      await prisma.orders.update({
        where: { OrderID: order.OrderID },
        data: { TotalAmount: total }
      });
      return await orderRepo.getOrderByCartId(cartId);
    }
    
    return await orderRepo.getCartItems(cartId);
  } catch (error) {
    throw new Error(`Failed to update cart and order: ${error.message}`);
  }
};

  
const getOrderById = async (id) => {
    const order = await orderRepo.getOrderById(id);
    if (!order) throw new Error("Order not found");
    return order;
  };

const getOrderByUserId=async(id)=>{
  const order=await orderRepo.getOrderByUserId(id);
  if(!order) throw new Error("No orders for user");
  return order;
}  
   
const deleteOrder = async (orderId) => {
    const existingOrder = await orderRepo.getOrderById(orderId);
    if (!existingOrder) {
      throw new Error(`Order with ID ${orderId} not found.`);
    }
  
    await orderRepo.deleteOrder(orderId);
    return { message: `Order ${orderId} deleted successfully.` };
  };

const getAllOrderbyRestaurantId=async(id)=>{
  const order=await orderRepo.getAllOrderbyRestaurantId(id);
  if(!order) throw new Error("No orders for restaurant");
  return order;
}  
const getAllOrdersForAdmin=async()=>{
  const order=await orderRepo.getAllOrdersForAdmin();
  if(!order) throw new Error("No orders for restaurant");
  return order;
} 
const getOrderTotal = async (orderId) => {
  const order = await orderRepo.getOrderById(parseInt(orderId));
  if (!order) {
    throw new Error("Order not found");
  }
  return order.TotalAmount;

};
const updatePaymentStatus = async (orderId, paymentStatus) => {
  const updatedOrder = await orderRepo.updatePaymentStatus(orderId, paymentStatus);
  return updatedOrder;
};
  
  module.exports = {
    addToCart,
    checkout,
    updateCart,
    getOrderById,
    getOrderByUserId,
    getOrderTotal,
    getAllOrderbyRestaurantId,
    getAllOrdersForAdmin,
    deleteOrder,
    updatePaymentStatus
  };
  