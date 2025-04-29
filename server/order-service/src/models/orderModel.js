const OrderRepository = require('../repository/orderRepository');

const OrderModel = {
  // Create a new cart for a user
  createCart: async (userId, restaurantId, status = "Pending") => {
    return await OrderRepository.createCart(userId, restaurantId, status);
  },

  // Add a new item to the cart
  createCartItem: async (cartItemData) => {
    return await OrderRepository.createCartItem(cartItemData);
  },

  // Create an order
  createOrder: async (orderData) => {
    return await OrderRepository.createOrder(orderData);
  },

  // Get an order by its ID
  getOrderById: async (orderId) => {
    return await OrderRepository.getOrderById(orderId);
  },

  // Update order details, including updating associated cart items and recalculating totals
  updateOrder: async (orderId, updatedData) => {
    try {
      // Update the cart items (e.g., update quantity or price)
      await OrderRepository.updateCartItems(orderId, updatedData.items);

      // Update the order items as well
      await OrderRepository.updateOrder(orderId, updatedData.items);

      // Recalculate the total for the cart and order
      //const updatedCart = await OrderRepository.updateCartTotal(orderId, updatedData.items);
      const updatedOrder = await OrderRepository.updateOrderTotal(orderId, updatedData.items);

      return {
        updatedOrder
      };
    } catch (error) {
      throw new Error("Error while updating the order: " + error.message);
    }
  },

  // Delete an order (with associated cart and items)
  deleteOrder: async (orderId) => {
    try {
      // Deleting associated cart items first
      await OrderRepository.deleteCartItems(orderId);

      // Deleting the cart itself
      await OrderRepository.deleteCart(orderId);

      // Deleting the order
      return await OrderRepository.deleteOrder(orderId);
    } catch (error) {
      throw new Error("Error while deleting the order: " + error.message);
    }
  },
  // Update payment status of an order
updatePaymentStatus: async (orderId, status) => {
  return await OrderRepository.updatePaymentStatus(orderId, status);
},


  
};

module.exports = OrderModel;