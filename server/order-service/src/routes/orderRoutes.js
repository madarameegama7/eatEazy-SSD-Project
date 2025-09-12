// orderRoutes.js
const express = require("express");
const router = express.Router();
const { authenticateToken, isRestaurant, isAdmin } = require("../middleware/authMiddleware");
const serviceAuth = require("../middleware/serviceAuth");
const {
    addToCart,
    checkout,
    getOrder,
    getCartByCartId,
    getOrderByUserId,
    getAllOrderbyRestaurantId,
    getAllOrdersForAdmin,
    getOrderTotal,
    updateCartByCartId,
    deleteOrder,
    updatePaymentStatus
} = require("../controllers/orderController");

router.post("/addToCart/:restaurantId", addToCart);
router.post("/checkout/:restaurantId", checkout);
router.get("/getOrderByOrderId/:id", authenticateToken,getOrder);
router.get("/getCartByCartId/:id",authenticateToken,getCartByCartId);
router.get("/getOrderByUserId/:id", authenticateToken,getOrderByUserId);
router.get("/getAllOrderbyRestaurantId/:id", authenticateToken,getAllOrderbyRestaurantId);
router.get("/getAllOrdersForAdmin", authenticateToken,isAdmin,getAllOrdersForAdmin);
router.put("/updateCartByCartId/:cartId", authenticateToken, updateCartByCartId);
router.delete("/deleteOrderByOrderId/:id", authenticateToken, deleteOrder);
router.put('/:orderId/payment-status', updatePaymentStatus);
router.get("/total/:orderId", authenticateToken, getOrderTotal);

module.exports = router;