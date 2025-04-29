// orderRoutes.js
const express = require("express");
const router = express.Router();
const { authenticateToken, isRestaurant } = require("../middleware/authMiddleware");
const {
    addOrder,
    getOrder,
    getOrderByUserId,
    getAllOrderbyRestaurantId,
    updateCartByCartId,
    updatePaymentStatus,
    deleteOrder
} = require("../controllers/orderController");

router.post("/addOrder/:restaurantId", addOrder);
router.get("/getOrderByOrderId/:id", authenticateToken,getOrder);
router.get("/getOrderByUserId/:id", authenticateToken,getOrderByUserId);
router.get("/getAllOrderbyRestaurantId/:id", authenticateToken,isRestaurant,getAllOrderbyRestaurantId);
router.put("/updateCartByCartId/:cartId", authenticateToken, updateCartByCartId);
router.put('/:id/payment-status', authenticateToken, updatePaymentStatus);
router.delete("/deleteOrderByOrderId/:id", authenticateToken, deleteOrder);

module.exports = router;