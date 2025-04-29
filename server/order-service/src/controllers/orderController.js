const orderService = require("../services/orderService");
const OrderRepository = require('../repository/orderRepository');

const addOrder = async (req, res) => {
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
    const order = await orderService.processOrder(token, items,restaurantId);
    res.status(201).json(order);
  }catch (error) {
    console.error("Order creation failed:", {
      message: error.message,
      responseData: error.response?.data,
      stack: error.stack
    });
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

const updateCartByCartId = async (req, res) => {
  const { cartId } = req.params;
  const { items } = req.body;

  console.log("🔧 [updateCartByCartId] Incoming request to update cartId:", cartId);
  console.log("📦 Items to update:", JSON.stringify(items, null, 2));

  try {
    const updatedOrder = await orderService.updateCartAndOrder(cartId, items);

    console.log("✅ Cart and Order updated successfully:", updatedOrder);

    res.status(200).json({
      message: "Cart and Order updated successfully",
      order: updatedOrder,
    });

  } catch (error) {
    console.error("❌ Failed to update cart or order:", error.message);

    res.status(500).json({
      message: "Failed to update cart or order",
      error: error.message,
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
  const { id } = req.params;
  const { paymentStatus } = req.body;

  if (!paymentStatus) {
    return res.status(400).json({ message: 'Missing paymentStatus in body' });
  }

  try {
    const updatedOrder = await orderService.updatePaymentStatus(id, paymentStatus);
    res.status(200).json({ 
      message: `Payment Status for order ${id} updated to ${paymentStatus}`,
      order: updatedOrder
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update payment status' });
  }
};


module.exports = {
  addOrder,
  getOrder,
  getOrderByUserId,
  getAllOrderbyRestaurantId,
  updateCartByCartId,
  updatePaymentStatus,
  deleteOrder,
};