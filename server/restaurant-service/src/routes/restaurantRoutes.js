const express = require('express');
const router = express.Router();
const menuRoutes = require('./menuRoutes');
const { authenticateToken, isRestaurant } = require('../middleware/authMiddleware');
const {
    registerRestaurant,
    getAllRestaurants,
    getRestaurantById,
    updateRestaurantById,
    deleteRestaurantById
} = require('../controllers/restaurantController');

// Routes for Restaurants
router.post('/register', authenticateToken, isRestaurant, registerRestaurant);
router.get('/', authenticateToken, getAllRestaurants);
router.get('/:restaurantId', authenticateToken, getRestaurantById);
router.put('/:restaurantId', authenticateToken, isRestaurant, updateRestaurantById);
router.delete('/:restaurantId', authenticateToken, isRestaurant, deleteRestaurantById);

// Nest menu routes under restaurants
router.use('/:restaurantId/menu', menuRoutes);

module.exports = router;
