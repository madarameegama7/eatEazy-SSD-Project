const DeliveryService = require("../services/DeliveryService");
const logger = require("../config/logger");

//creating a Delivery as assignning a random driver
const assignDelivery = async (req, res) => {
  try {
    const { orderId } = req.params;
    const driver = await DeliveryService.assignDelivery(orderId);
    res.json({ success: true, message: "Driver assigned", driver });
  } catch (error) {
    logger.error("Error assigning delivery:", req.url, error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//Fetching Delivery details
const trackDelivery = async (req, res) => {
  try {
    const { orderId } = req.params;
    const delivery = await DeliveryService.trackDelivery(orderId);
    if (!delivery) return res.status(404).json({ message: "Order not found" });

    res.json(delivery);
  } catch (error) {
    logger.error("Error assigning delivery:", req.url, error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//Update status of the Deilvery
const updateDeliveryStatus = async (req, res) => {
  try {
    const { deliveryId } = req.params;
    const { status } = req.body;

    console.log(deliveryId, status);
    await DeliveryService.updateStatus(deliveryId, status);
    res.json({ success: true, message: "Delivery status updated" });
  } catch (error) {
    logger.error("Error assigning delivery:", req.url, error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//fetch deilvery route related to a delievery
const getDeliveryRoute = async (req, res) => {
  try {
    const { deliveryId } = req.params;
    const route = await DeliveryService.getRoute(deliveryId);
    if (!route)
      return res.status(404).json({ message: "Delivery route not found" });

    res.json(route);
  } catch (error) {
    logger.error("Error assigning delivery:", req.url, error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//add a dilevery route to a Deilvery
const addDeliveryRoute = async (req, res) => {
  try {
    const { deliveryId } = req.params;
    const { startLat, startLng, endLat, endLng } = req.body;
    console.log(
      `Received coordinates: startLat=${startLat}, startLng=${startLng}, endLat=${endLat}, endLng=${endLng}`
    );

    // Validate inputs
    if (
      !startLat ||
      !startLng ||
      !endLat ||
      !endLng ||
      isNaN(startLat) ||
      isNaN(startLng) ||
      isNaN(endLat) ||
      isNaN(endLng)
    ) {
      return res.status(400).json({ message: "Invalid coordinates provided" });
    }

    const route = await DeliveryService.addRoute(parseInt(deliveryId), {
      startLat: parseFloat(startLat),
      startLng: parseFloat(startLng),
      endLat: parseFloat(endLat),
      endLng: parseFloat(endLng),
    });

    res.json({ success: true, route });
  } catch (error) {
    logger.error("Error assigning delivery:", req.url, error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  assignDelivery,
  trackDelivery,
  updateDeliveryStatus,
  getDeliveryRoute,
  addDeliveryRoute,
};
