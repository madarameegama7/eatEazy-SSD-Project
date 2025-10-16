const orderService = require("../services/orderService");
const OrderRepository = require('../repository/orderRepository');

const addToCart = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];
  const { items } = req.body;
  const restaurantId = parseInt(req.params.restaurantId);

  if (isNaN(restaurantId)) {
    return res.status(400).json({ message: "Invalid restaurant ID" });
  }

  try {
    const result = await orderService.addToCart(token, items, restaurantId);
    res.status(200).json(result);
  } catch (error) {
    console.error("Add to cart failed:", error);
    res.status(500).json({ message: error.message });
  }
};

const checkout = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];
  const restaurantId = parseInt(req.params.restaurantId);

  if (isNaN(restaurantId)) {
    return res.status(400).json({ message: "Invalid restaurant ID" });
  }

  try {
    const order = await orderService.checkout(token, restaurantId);
    res.status(201).json(order);
  } catch (error) {
    console.error("Checkout failed:", error);
    res.status(500).json({ message: error.message });
  }
};


const getOrder = async (req, res) => {
  try {
    const orderId = parseInt(req.params.id);
    const loggedInUser = req.user;

    const order = await orderService.getOrderById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    // Access control: allow only Admin, order owner, or restaurant owner for that restaurant
    if (
      loggedInUser.role !== 'Admin' &&
      loggedInUser.id !== order.UserID &&
      !(loggedInUser.role === 'Restaurant' && loggedInUser.restaurantId === order.RestaurantID)
    ) {
      return res.status(403).json({ message: 'Access denied: Not authorized to view this order' });
    }

    res.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ message: error.message });
  }
};


const getCartByCartId = async (req, res) => {
  try {
    const cartId = parseInt(req.params.id);
    const loggedInUser = req.user;

    const cart = await orderService.getCartByCartId(cartId);
    if (!cart || cart.length === 0) return res.status(404).json({ message: "Cart not found" });

    // Check ownership using first cart item's user
    const cartOwnerId = cart[0].UserID;
    const restaurantId = cart[0].RestaurantID;

    if (
      loggedInUser.role !== 'Admin' &&
      loggedInUser.id !== cartOwnerId &&
      !(loggedInUser.role === 'Restaurant' && loggedInUser.restaurantId === restaurantId)
    ) {
      return res.status(403).json({ message: 'Access denied: Not authorized to view this cart' });
    }

    res.json(cart);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ message: error.message });
  }
};


const getOrderByUserId = async (req, res) => {
  try {
    const requestedUserId = req.params.id;
    const loggedInUser = req.user;

    // Allow only the owner or an admin to access
    if (loggedInUser.role !== 'Admin' && loggedInUser.id !== requestedUserId) {
      return res.status(403).json({ message: 'Access denied: Not your orders' });
    }

    const orders = await OrderRepository.getOrdersByUserId(requestedUserId);

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'No orders found' });
    }

    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


const getAllOrderbyRestaurantId = async (req, res) => {
  try {
    const requestedRestaurantId = req.params.id;
    const loggedInUser = req.user;

    // Allow only restaurant owners for their own restaurant OR admins
    if (
      loggedInUser.role !== 'Admin' &&
      !(loggedInUser.role === 'Restaurant' && loggedInUser.restaurantId === requestedRestaurantId)
    ) {
      return res.status(403).json({ message: 'Access denied: Not authorized to view these orders' });
    }

    const orders = await OrderRepository.getOrdersByRestaurantId(requestedRestaurantId);

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for this restaurant' });
    }

    res.json(orders);
  } catch (err) {
    console.error('Error fetching restaurant orders:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

const getAllOrdersForAdmin=async(req,res)=>{
  try{

    const order=await orderService.getAllOrdersForAdmin();
    if(!order) return res.status(404).json({message:"No orders for restaurant"});
    res.json(order);
  }catch(error){
    res.status(500).json({message: error.message});

  }
};

const getOrderTotal = async (req, res) => {
  try {
    const orderId = parseInt(req.params.orderId);
    const total = await orderService.getOrderTotal(orderId);
    res.status(200).json({ 
      orderId: orderId,
      totalAmount: total
    });
  } catch (error) {
    res.status(500).json({ 
      message: "Failed to get order total", 
      error: error.message 
    });
  }
};

const updateCartByCartId = async (req, res) => {
  const { cartId } = req.params;
  const { items } = req.body;
  const loggedInUser = req.user;

  try {
    const cart = await orderService.getCartByCartId(parseInt(cartId));
    if (!cart || cart.length === 0) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Carts are tied to orders/users, so check first cart item to confirm ownership
    const cartOwnerId = cart[0].UserID;

    if (
      loggedInUser.role !== 'Admin' &&
      loggedInUser.id !== cartOwnerId
    ) {
      return res.status(403).json({ message: 'Access denied: Not authorized to update this cart' });
    }

    const result = await orderService.updateCart(parseInt(cartId), items);
    res.status(200).json({
      message: "Cart updated successfully",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update cart or order",
      error: error.message
    });
  }
};


const deleteOrder = async (req, res) => {
  try {
    const orderId = parseInt(req.params.id);
    const loggedInUser = req.user;

    const order = await orderService.getOrderById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Allow only if Admin or the user who created the order
    if (
      loggedInUser.role !== 'Admin' &&
      loggedInUser.id !== order.UserID
    ) {
      return res.status(403).json({ message: 'Access denied: Not authorized to delete this order' });
    }

    const result = await orderService.deleteOrder(orderId);
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updatePaymentStatus = async (req, res) => {
  const { orderId } = req.params;
  const { paymentStatus } = req.body;

  if (!paymentStatus) {
    return res.status(400).json({ message: 'Missing paymentStatus in body' });
  }

  try {
    const updatedOrder = await orderService.updatePaymentStatus(orderId, paymentStatus);
    res.status(200).json({ 
      message: `Payment Status for order ${orderId} updated to ${paymentStatus}`,
      order: updatedOrder
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update payment status' });
  }
};

module.exports = {
  addToCart,
  checkout,
  getOrder,
  getCartByCartId,
  getOrderByUserId,
  getAllOrderbyRestaurantId,
  getAllOrdersForAdmin,
  getOrderTotal,
  updateCartByCartId,
  updatePaymentStatus,
  deleteOrder,
};