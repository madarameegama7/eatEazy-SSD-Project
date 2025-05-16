import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Paper,
  Divider,
  IconButton,
  Button,
  Card,
  CardContent,
  Container,
  Avatar,
  Chip,
  Stack,
  Fade,
  CircularProgress,
  Alert,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import PaymentIcon from "@mui/icons-material/Payment";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import OrderApi from "../../utils/api/OrderApi";
import { useNavigate } from "react-router-dom";

// Match the CartItem interface from MenuItemsContent for consistency
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  restaurantId: string;
  restaurantName: string;
  image: string;
  CartItemsID?: number;
}

interface CartItemsContentProps {
  restaurantId?: string | number;
  restaurantName?: string;
  menuItemId?: string;
  menuItemName?: string;
  menuItemPrice?: number;
}

export const CartItemsContent: React.FC<CartItemsContentProps> = ({
  restaurantId,
  restaurantName,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const navigate = useNavigate();

  // Load cart items from localStorage on component mount

  useEffect(() => {
    fetchCartItems();

    // Add this debug logging
    const storedCart = localStorage.getItem("cart");
    console.log("STORED CART ITEMS:", storedCart ? JSON.parse(storedCart) : []);
  }, []);

  const fetchCartItems = () => {
    try {
      setLoading(true);
      // Get cart items from localStorage
      const storedCart = localStorage.getItem("cart");
      const parsedCart: CartItem[] = storedCart ? JSON.parse(storedCart) : [];

      const normalizedCart = parsedCart.map((item) => ({
        ...item,
        price:
          typeof item.price === "number"
            ? item.price
            : parseFloat(item.price || "0"),
      }));

      setCartItems(normalizedCart);

      // Calculate total amount
      const total = normalizedCart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      setTotalAmount(total);

      setLoading(false);
    } catch (error: any) {
      console.error("Error loading cart items:", error);
      setError("Failed to load your cart items. Please try again.");
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    try {
      // Update in localStorage
      const storedCart = localStorage.getItem("cart");
      const parsedCart: CartItem[] = storedCart ? JSON.parse(storedCart) : [];

      const updatedCart = parsedCart.map((item) => {
        if (item.id === itemId) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      });

      // Save updated cart back to localStorage
      localStorage.setItem("cart", JSON.stringify(updatedCart));

      // Update state
      setCartItems(updatedCart);

      // Recalculate total
      const newTotal = updatedCart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      setTotalAmount(newTotal);

      // Sync with backend
      try {
        // Find the item to get its restaurantId
        const itemToUpdate = updatedCart.find((item) => item.id === itemId);

        if (!itemToUpdate) {
          console.error("Item not found in cart");
          return;
        }

        // Get cartId from localStorage if available
        const cartIdKey = `cartId_${itemToUpdate.restaurantId}`;
        let cartId = localStorage.getItem(cartIdKey)
          ? parseInt(localStorage.getItem(cartIdKey)!)
          : null;

        console.log("Retrieved cartId from localStorage:", cartId);

        if (cartId) {
          // We have a cartId, check if this item already exists in the cart on the backend
          try {
            console.log("Fetching cart details for cartId:", cartId);
            const cartDetails = await OrderApi.getCartById(cartId);
            console.log("Cart details received:", cartDetails);

            // Check if cartDetails is an array of cart items
            if (Array.isArray(cartDetails)) {
              // Find the right cart item by MenuItemID
              const serverCartItem = cartDetails.find(
                (item: any) => item.MenuItemID === parseInt(itemId)
              );

              if (serverCartItem && serverCartItem.CartItemsID) {
                // Found existing cart item! Use its CartItemsID for update
                console.log(
                  "Found existing cart item with CartItemsID:",
                  serverCartItem.CartItemsID
                );

                // Update the CartItemsID in localStorage for future use
                const updatedCartWithIds = JSON.parse(
                  localStorage.getItem("cart") || "[]"
                );
                const itemIndex = updatedCartWithIds.findIndex(
                  (item: CartItem) => item.id === itemId
                );

                if (itemIndex >= 0) {
                  updatedCartWithIds[itemIndex].CartItemsID =
                    serverCartItem.CartItemsID;
                  localStorage.setItem(
                    "cart",
                    JSON.stringify(updatedCartWithIds)
                  );

                  // Also update the item in memory
                  setCartItems(updatedCartWithIds);
                }

                // Now update the quantity on the backend
                const backendItem = {
                  CartItemsID: serverCartItem.CartItemsID,
                  Quantity: newQuantity,
                };

                console.log("Updating item quantity in database:", {
                  cartId,
                  CartItemsID: serverCartItem.CartItemsID,
                  newQuantity,
                });

                await OrderApi.updateCart(cartId, [backendItem]);

                console.log("Successfully updated item in database");
                return;
              }
            }
          } catch (cartError) {
            console.error("Error fetching cart details:", cartError);
          }
        }

        // If we get here, either:
        // 1. We don't have a cartId
        // 2. We couldn't find the item in the cart
        // 3. There was an error
        // So we need to add the item

        console.log("Adding item to cart with:", {
          restaurantId: parseInt(itemToUpdate.restaurantId),
          menuItemId: parseInt(itemId),
          quantity: newQuantity,
        });

        // Call the API to add to cart
        const response = await OrderApi.addToCart(
          parseInt(itemToUpdate.restaurantId),
          [
            {
              menuItemId: parseInt(itemId),
              quantity: newQuantity,
            },
          ]
        );

        console.log("Add to cart response:", response);

        // STORE THE CART ID FROM RESPONSE
        if (response && response.cartId) {
          // Store it in localStorage for this restaurant
          localStorage.setItem(cartIdKey, response.cartId.toString());
          console.log(
            `Stored cartId ${response.cartId} for restaurant ${itemToUpdate.restaurantId}`
          );

          // Now fetch the cart details to get the CartItemsID
          try {
            const newCartDetails = await OrderApi.getCartById(response.cartId);
            console.log("New cart details:", newCartDetails);

            if (Array.isArray(newCartDetails)) {
              // Find our new cart item
              const newServerCartItem = newCartDetails.find(
                (item: any) => item.MenuItemID === parseInt(itemId)
              );

              if (newServerCartItem && newServerCartItem.CartItemsID) {
                console.log(
                  `Found CartItemsID: ${newServerCartItem.CartItemsID} for menu item ${itemId}`
                );

                // Update the cart item with the CartItemsID
                const updatedCartWithIds = JSON.parse(
                  localStorage.getItem("cart") || "[]"
                );
                const itemIndex = updatedCartWithIds.findIndex(
                  (item: CartItem) => item.id === itemId
                );

                if (itemIndex >= 0) {
                  updatedCartWithIds[itemIndex].CartItemsID =
                    newServerCartItem.CartItemsID;
                  localStorage.setItem(
                    "cart",
                    JSON.stringify(updatedCartWithIds)
                  );

                  // Also update in memory
                  setCartItems(updatedCartWithIds);

                  console.log(
                    "Updated cart with CartItemsID:",
                    updatedCartWithIds[itemIndex]
                  );
                }
              }
            }
          } catch (getCartError) {
            console.error("Failed to get cart details:", getCartError);
          }
        }
      } catch (backendError) {
        console.error("Backend sync error:", backendError);
        // Continue with localStorage version even if backend fails
      }
    } catch (error: any) {
      console.error("Error updating quantity:", error);
      setError("Failed to update item quantity");
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    try {
      // Find the item before removing it to get its restaurantId
      const storedCart = localStorage.getItem("cart");
      const parsedCart: CartItem[] = storedCart ? JSON.parse(storedCart) : [];
      const itemToRemove = parsedCart.find((item) => item.id === itemId);

      if (!itemToRemove) {
        console.error("Item not found in cart");
        return;
      }

      // Store restaurant ID before removing from cart
      const restaurantIdToUpdate = itemToRemove.restaurantId;

      // Remove from localStorage
      const updatedCart = parsedCart.filter((item) => item.id !== itemId);
      localStorage.setItem("cart", JSON.stringify(updatedCart));

      // Update state
      setCartItems(updatedCart);

      // Recalculate total
      const newTotal = updatedCart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      setTotalAmount(newTotal);

      // Sync with backend - send quantity: 0 to remove the item
      try {
        if (itemToRemove.CartItemsID) {
          // Only update if we have CartItemsID
          console.log("Removing item from database:", {
            cartId: parseInt(restaurantIdToUpdate),
            CartItemsID: itemToRemove.CartItemsID,
          });

          // Use CartItemsID for backend updates
          const backendItem = {
            CartItemsID: itemToRemove.CartItemsID,
            Quantity: 0, // Quantity 0 signals removal
          };

          await OrderApi.updateCart(parseInt(restaurantIdToUpdate), [
            backendItem,
          ]);

          console.log("Successfully removed item from database");
        } else {
          console.log("Skipping backend update - no CartItemsID available");
        }
      } catch (backendError) {
        console.error("Backend sync error:", backendError);
        // Continue with localStorage version even if backend fails
      }
    } catch (error: any) {
      console.error("Error removing item:", error);
      setError("Failed to remove item from cart");
    }
  };

 const handleCheckout = async () => {
  try {
    setError(null);

    if (cartItems.length === 0) {
      setError("Your cart is empty");
      return;
    }

    setLoading(true);
    console.log("Starting checkout process...");

    // Group by restaurant and get existing cart IDs
    const restaurantGroups = new Map();
    cartItems.forEach(item => {
      const restId = typeof item.restaurantId === 'string' 
        ? parseInt(item.restaurantId) 
        : item.restaurantId;

      if (!restaurantGroups.has(restId)) {
        // Get cartId using the numeric restaurant ID
        const cartIdKey = `cartId_${restId}`;
        const existingCartId = localStorage.getItem(cartIdKey);
        console.log(`Found cartId ${existingCartId} for restaurant ${restId}`);

        restaurantGroups.set(restId, {
          items: [],
          cartId: existingCartId,
          name: item.restaurantName
        });
      }
      restaurantGroups.get(restId).items.push({
        menuItemId: parseInt(item.id),
        quantity: item.quantity
      });
    });

    const orderIds: number[] = [];

    // Process checkout for each restaurant
    for (const [restId, { items, cartId }] of restaurantGroups) {
      try {
        let currentCartId = cartId;

        // Process checkout
        console.log(`Processing checkout for restaurant ${restId} with cart ${currentCartId}`);
        const orderResponse = await OrderApi.checkout(restId);

        if (orderResponse?.orderId) {
          orderIds.push(orderResponse.orderId);
          console.log(`Successfully created order #${orderResponse.orderId}`);
        } else {
          throw new Error("Checkout did not return an orderId");
        }
      } catch (error) {
        console.error(`Error processing order for restaurant ${restId}:`, error);
        throw error;
      }
    }

    // Clear cart data after successful checkout
    localStorage.removeItem("cart");
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('cartId_')) {
        localStorage.removeItem(key);
      }
    });

    // Navigate to payment page
    navigate("/payments", {
      state: {
        orderIds,
        totalAmount: finalTotal,
        items: cartItems.length,
        restaurantName: currentRestaurantName
      }
    });

  } catch (error: any) {
    console.error("Error during checkout:", error);
    setLoading(false);
    setError(error.message || "Failed to complete checkout");
  } finally {
    setLoading(false);
  }
};

  // Calculate additional values
  const finalTotal = totalAmount;
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Get restaurant info from first item if not provided
  const firstItem = cartItems[0];
  const currentRestaurantId = restaurantId || firstItem?.restaurantId || "";
  const currentRestaurantName =
    restaurantName || firstItem?.restaurantName || "Restaurant";

  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: 10,
        mb: 8,
        ml:35,
        px:100,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={5}
        sx={{
          borderRadius: 3,
          overflow: "hidden",
          backgroundImage: loading
            ? "none"
            : "linear-gradient(to bottom, rgba(255,255,255,0.8), rgba(255,255,255,1))",
          backgroundSize: "cover",
          width: "100%",
          maxWidth: "900px",
        }}
      >
        {/* Header section */}
        <Box
          sx={{
            bgcolor: "#EA7300",
            p: 3,
            backgroundImage:
              "linear-gradient(135deg, #EA7300 0%, #f08c28 100%)",
            borderBottom: "1px solid rgba(0,0,0,0.1)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                color: "white",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
              }}
            >
              <ShoppingCartIcon sx={{ mr: 1.5, fontSize: 36 }} />
              Your Cart
            </Typography>
            {cartItems.length > 0 && (
              <Chip
                label={currentRestaurantName}
                icon={<RestaurantIcon sx={{ color: "#fff !important" }} />}
                sx={{
                  bgcolor: "rgba(255,255,255,0.2)",
                  color: "white",
                  fontSize: "0.9rem",
                }}
              />
            )}
          </Box>
        </Box>
        {/* Main content */}
        <Box sx={{ p: { xs: 2, sm: 4 }, bgcolor: "rgba(255,255,255,0.9)" }}>
          {loading && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                py: 8,
              }}
            >
              <CircularProgress sx={{ color: "#EA7300", mb: 3 }} />
              <Typography variant="h6" sx={{ color: "#555" }}>
                Loading your cart...
              </Typography>
            </Box>
          )}

          {error && (
            <Alert
              severity="error"
              sx={{ mb: 3, borderLeft: "4px solid #f44336" }}
            >
              {error}
            </Alert>
          )}

          {!loading && cartItems.length === 0 ? (
            <Box
              sx={{
                textAlign: "center",
                py: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                bgcolor: "white",
                borderRadius: 2,
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              }}
            >
              <ShoppingCartIcon sx={{ fontSize: 100, color: "#ddd", mb: 3 }} />
              <Typography
                variant="h5"
                sx={{ color: "#555", mb: 2, fontWeight: "500" }}
              >
                Your cart is empty
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "#888", maxWidth: 400, mb: 4 }}
              >
                Looks like you haven't added any items to your cart yet. Browse
                the menu to discover delicious options.
              </Typography>
              <Button
                variant="contained"
                onClick={() => navigate(`/restaurants`)}
                startIcon={<MenuBookIcon />}
                sx={{
                  bgcolor: "#EA7300",
                  "&:hover": { bgcolor: "#d66a00" },
                  px: 3,
                  py: 1,
                  borderRadius: 2,
                  fontWeight: "500",
                }}
              >
                Browse Restaurants
              </Button>
            </Box>
          ) : (
            !loading && (
              <Fade in={true} timeout={500}>
                <Stack spacing={4}>
                  {/* Cart items section */}
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{ mb: 2, fontWeight: "500", color: "#444" }}
                    >
                      Cart Items ({itemCount})
                    </Typography>

                    <Stack spacing={2}>
                      <Box
                        sx={{
                          display: { xs: "none", md: "flex" },
                          alignItems: "center",
                          justifyContent: "space-between",
                          px: 4,
                          mb: 1,
                          fontWeight: "medium",
                          color: "#666",
                        }}
                      >
                        <Box sx={{ width: "80px" }}></Box>
                        <Box sx={{ flex: 1 }}>Item</Box>
                        <Box sx={{ width: "200px", textAlign: "center" }}>
                          Quantity
                        </Box>
                        <Box sx={{ width: "80px", textAlign: "right" }}>
                          Price
                        </Box>
                        <Box sx={{ width: "40px" }}></Box>
                      </Box>
                      {cartItems.map((item) => (
                        <Card
                          key={item.id}
                          sx={{
                            borderRadius: 2,
                            boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
                            transition: "all 0.3s ease",
                            "&:hover": {
                              transform: "translateY(-3px)",
                              boxShadow: "0 6px 15px rgba(0,0,0,0.12)",
                            },
                          }}
                        >
                          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                flexWrap: { xs: "wrap", md: "nowrap" },
                                gap: 2,
                              }}
                            >
                              {/* Item image */}
                              {item.image ? (
                                <Avatar
                                  src={item.image}
                                  variant="rounded"
                                  sx={{
                                    width: 80,
                                    height: 80,
                                    borderRadius: 1,
                                    flexShrink: 0,
                                  }}
                                />
                              ) : (
                                <Avatar
                                  variant="rounded"
                                  sx={{
                                    bgcolor: "#EA7300",
                                    width: 80,
                                    height: 80,
                                    borderRadius: 1,
                                    flexShrink: 0,
                                    fontWeight: "bold",
                                    fontSize: "1.5rem",
                                  }}
                                >
                                  {item.name.charAt(0)}
                                </Avatar>
                              )}

                              {/* Item details */}
                              <Box
                                sx={{
                                  flex: 1,
                                  display: "flex",
                                  flexDirection: "column",
                                  justifyContent: "center",
                                  minWidth: { xs: "100%", sm: "160px" },
                                  order: { xs: 1, sm: 0 },
                                }}
                              >
                                <Typography
                                  variant="h6"
                                  sx={{ fontWeight: "500", mb: 0.5 }}
                                >
                                  {item.name}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    color: "#EA7300",
                                    fontWeight: "500",
                                  }}
                                >
                                  <LocalOfferIcon
                                    sx={{ fontSize: 16, mr: 0.5 }}
                                  />
                                  Rs.
                                  {typeof item.price === "number"
                                    ? item.price.toFixed(2)
                                    : parseFloat(item.price || 0).toFixed(2)}
                                </Typography>
                              </Box>

                              {/* Quantity controls - centered */}
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "center",
                                  minWidth: { xs: "40%", sm: "120px" },
                                }}
                              >
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    border: "1px solid #ddd",
                                    borderRadius: 20,
                                    overflow: "hidden",
                                    width: "fit-content",
                                    boxShadow: "0 2px 5px rgba(0,0,0,0.06)",
                                  }}
                                >
                                  <IconButton
                                    onClick={() =>
                                      handleUpdateQuantity(
                                        item.id,
                                        item.quantity - 1
                                      )
                                    }
                                    disabled={item.quantity <= 1}
                                    size="small"
                                    sx={{
                                      borderRadius: 0,
                                      px: 1,
                                      color:
                                        item.quantity <= 1 ? "#ccc" : "#555",
                                    }}
                                  >
                                    <RemoveIcon fontSize="small" />
                                  </IconButton>

                                  <Typography sx={{ px: 2, fontWeight: "500" }}>
                                    {item.quantity}
                                  </Typography>

                                  <IconButton
                                    onClick={() =>
                                      handleUpdateQuantity(
                                        item.id,
                                        item.quantity + 1
                                      )
                                    }
                                    size="small"
                                    sx={{
                                      borderRadius: 0,
                                      px: 1,
                                      color: "#555",
                                    }}
                                  >
                                    <AddIcon fontSize="small" />
                                  </IconButton>
                                </Box>
                              </Box>

                              {/* Item total - right aligned */}
                              <Box
                                sx={{
                                  minWidth: { xs: "30%", sm: "80px" },
                                  textAlign: "right",
                                }}
                              >
                                <Typography sx={{ fontWeight: "500", mb: 1 }}>
                                  Rs.{(item.price * item.quantity).toFixed(2)}
                                </Typography>
                              </Box>

                              {/* Delete button - far right */}
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "center",
                                  minWidth: "40px",
                                }}
                              >
                                <IconButton
                                  onClick={() => handleRemoveItem(item.id)}
                                  color="error"
                                  size="small"
                                  sx={{
                                    border: "1px solid rgba(211, 47, 47, 0.5)",
                                    "&:hover": {
                                      bgcolor: "rgba(211, 47, 47, 0.1)",
                                    },
                                  }}
                                >
                                  <DeleteIcon fontSize="small" />
                                </IconButton>
                              </Box>
                            </Box>
                          </CardContent>
                        </Card>
                      ))}
                    </Stack>
                  </Box>

                  {/* Order summary section */}
                  <Paper
                    elevation={2}
                    sx={{
                      p: { xs: 2, sm: 3 },
                      borderRadius: 2,
                      bgcolor: "white",
                      backgroundImage:
                        "linear-gradient(to top, #f9f9f9, white)",
                      ml:10,
                      mr:10
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ mb: 3, fontWeight: "bold", color: "#333" }}
                    >
                      Order Summary
                    </Typography>

                    <Stack spacing={1.5} sx={{ mb: 3 }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography color="text.secondary">
                          Subtotal ({itemCount}{" "}
                          {itemCount === 1 ? "item" : "items"})
                        </Typography>
                        <Typography fontWeight="500">
                          Rs.{totalAmount.toFixed(2)}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        
                      </Box>
                    </Stack>

                    <Divider sx={{ my: 2 }} />

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 4,
                        alignItems: "baseline",
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: "bold", color: "#333" }}
                      >
                        Total
                      </Typography>
                      <Typography
                        variant="h5"
                        sx={{ fontWeight: "bold", color: "#EA7300" }}
                      >
                        Rs.{finalTotal.toFixed(2)}
                      </Typography>
                    </Box>

                    <Button
                      fullWidth
                      variant="contained"
                      onClick={handleCheckout}
                      startIcon={<PaymentIcon />}
                      size="large"
                      sx={{
                        py: 1.5,
                        backgroundColor: "#EA7300",
                        fontWeight: "bold",
                        "&:hover": {
                          backgroundColor: "#D66A00",
                        },
                        borderRadius: 2,
                        boxShadow: "0 4px 10px rgba(234, 115, 0, 0.3)",
                        transition: "all 0.2s ease",
                        "&:active": {
                          transform: "scale(0.98)",
                        },
                      }}
                    >
                      Proceed to Checkout
                    </Button>
                  </Paper>
                </Stack>
              </Fade>
            )
          )}
        </Box>
      </Paper>
    </Container>
  );
};
