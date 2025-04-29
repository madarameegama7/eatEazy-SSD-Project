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

const processOrder = async (token, items, restaurantId) => {
  const user = await verifyToken(token);
  const userId = user.id;

  const cart = await orderRepo.createCart(userId, restaurantId, "ACTIVE");

  const cartItems = [];

  for (const item of items) {
    const price = await getMenuItemPrice(restaurantId, item.menuItemId,token);
    if (!price) throw new Error(`Invalid menu item: ${item.menuItemId}`);

    const cartItem = await orderRepo.createCartItem({
      CartID: cart.CartID,
      MenuItemID: item.menuItemId,
      Quantity: item.quantity,
      Price: parseFloat(price),
    });

    cartItems.push(cartItem);
  }

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

const updateCartAndOrder = async (cartId,items) => {
  const cartIdInt = parseInt(cartId);

  //update cart items first
  for(const item of items){
    if(!item.CartItemsID){
      throw new Error("CartItemID is required to update a cart item");
    }
    await prisma.cartItems.update({
      where:{
        CartItemsID: item.CartItemsID,
      },
      data:{
        Quantity: item.Quantity,
      },
    });
  }

  //get related order id by cart id
  const order = await prisma.orders.findFirst({
    where: {CartID: cartIdInt},
  });

  if(!order){
    throw new Error("Order not found for the given CartID");
  }

  const orderId=order.orderID;

  //update order items quantity
  for(const item of items){
    const cartItem=await prisma.cartItems.findUnique({
      where:{CartItemsID:item.CartItemsID},
    });

    if(!cartItem) continue;

    await prisma.orderItems.updateMany({
      where:{
        OrderID: orderId,
        MenuItemID: cartItem.MenuItemID,
      },
      data:{
        Quantity: item.Quantity,
      },
    });
  }

  //re calulate total amount
  const updatedOrderItems = await prisma.orderItems.findMany({
    where:{OrderID: orderId},
  });

  const totalAmount=updatedOrderItems.reduce((sum,item) =>{
    return sum + item.Price * item.Quantity;
  },0);

  //update order total amount
  const updatedOrder = await prisma.orders.update({
    where:{OrderID:orderId},
    data:{
      TotalAmount: totalAmount,
    },
  });
  return updatedOrder;
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
const updatePaymentStatus = async (orderId, status) => {
  const updatedOrder = await orderRepo.updatePaymentStatus(orderId, status);
  return updatedOrder;
};

  
  module.exports = {
    processOrder,
    updateCartAndOrder,
    updatePaymentStatus,
    getOrderById,
    getOrderByUserId,
    getAllOrderbyRestaurantId,
    deleteOrder
  };
  