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
    const order = await orderService.getOrderById(parseInt(req.params.id));
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOrderByUserId=async(req,res)=>{
  try{
    const order=await orderService.getOrderByUserId(parseInt(req.params.id));
    if(!order) return res.status(404).json({message: "No orders for user"});
    res.json(order);

  }catch(error){
   res.status(500).json({message: error.message});
  }

};

const getAllOrderbyRestaurantId=async(req,res)=>{
  try{

    const order=await orderService.getAllOrderbyRestaurantId(parseInt(req.params.id));
    if(!order) return res.status(404).json({message:"No orders for restaurant"});
    res.json(order);
  }catch(error){
    res.status(500).json({message: error.message});

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
  
  try {
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
  getOrderByUserId,
  getAllOrderbyRestaurantId,
  getAllOrdersForAdmin,
  getOrderTotal,
  updateCartByCartId,
  updatePaymentStatus,
  deleteOrder,
};