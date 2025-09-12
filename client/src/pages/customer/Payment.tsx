import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ResponsiveAppBar from "@app_common/Post-Login/Navbar";
import {
  Box,
  Paper,
  Typography,
  Button,
  Container,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Divider,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import PaymentIcon from "@mui/icons-material/Payment";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PaymentApi, { extractPayHereParams } from "@app_utils/api/PaymentApi";

//Declare PayHere globally
declare const payhere: any;

interface PaymentState {
  orderIds: number[];
  totalAmount: number;
  items: number;
  restaurantName: string;
}

const PaymentPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);

  const { orderIds, totalAmount, items, restaurantName } =
    (location.state as PaymentState) || {
      orderIds: [],
      totalAmount: 0,
      items: 0,
      restaurantName: "",
    };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState(1);
  const [paymentId, setPaymentId] = useState<number | null>(null);

  
  // Redirect to cart if no order IDs
  useEffect(() => {
    if (!orderIds || orderIds.length === 0) {
      navigate("/cart");
    }
  }, [orderIds, navigate]);

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await PaymentApi.initiatePayment(orderIds[0]);
      console.log("Payment initiation response:", response);

      if (!response?.success) {
        throw new Error(response?.message || "Payment initiation failed");
      }

      const paymentData = response.data;
      setPaymentId(paymentData.PaymentID);

      // Extract PayHere params from redirect URL
      const payHereParams = extractPayHereParams(paymentData.redirectUrl);

      // Configure payment with extracted params
      const payment = {
        sandbox: true,
        merchant_id: 1230183,
        return_url: payHereParams.return_url,
        cancel_url: payHereParams.cancel_url,
        notify_url: payHereParams.notify_url,
        order_id: payHereParams.order_id,
        items: payHereParams.items,
        amount: payHereParams.amount,
        currency: payHereParams.currency,
        hash: payHereParams.hash,
        first_name: "Customer",
        last_name: "Name",
        email: "customer@email.com",
        phone: "0771234567",
        address: "Address",
        city: "City",
        country: "Sri Lanka",
      };

      console.log("PayHere payment config:", payment);

      if (typeof payhere === "undefined") {
        throw new Error("PayHere payment gateway not loaded");
      }

      // Initialize PayHere with exact parameters from backend
      payhere.startPayment(payment);
      setActiveStep(2);
    } catch (error: any) {
      console.error("Payment initiation error:", error);
      setError(error.message || "Failed to initiate payment");
    } finally {
      setLoading(false);
    }
  };

const handleViewOrders = () => navigate("/orders/order");
  const handleBackToCart = () => navigate("/cart");

  return (

    <Container maxWidth="md" sx={{ my: 5, mx: 45 }}>
       <ResponsiveAppBar />
      <Paper elevation={3} sx={{ borderRadius: 3, overflow: "hidden" }}>
        {/* Header */}
        <Box
          sx={{
            bgcolor: "#EA7300",
            p: 3,
            color: "white",
            backgroundImage:
              "linear-gradient(135deg, #EA7300 0%, #f08c28 100%)",
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            {activeStep === 2 ? "Payment Complete" : "Complete Your Payment"}
          </Typography>
        </Box>

        {/* Stepper */}
        <Box sx={{ p: 3, bgcolor: "#f9f9f9" }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            <Step>
              <StepLabel>Cart</StepLabel>
            </Step>
            <Step>
              <StepLabel>Payment</StepLabel>
            </Step>
            <Step>
              <StepLabel>Confirmation</StepLabel>
            </Step>
          </Stepper>
        </Box>

        {/* Content */}
        <Box sx={{ p: 3 }}>
          {error && (
            <Alert
              severity="error"
              sx={{ mb: 3 }}
              onClose={() => setError(null)}
            >
              {error}
            </Alert>
          )}

          {activeStep === 1 && (
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: 4,
              }}
            >
              {/* Order Summary Card */}
              <Box sx={{ flex: { md: "0 0 35%" } }}>
                <Card sx={{ bgcolor: "#f9f9f9", borderRadius: 2 }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                      Order Summary
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 1,
                      }}
                    >
                      <Typography>Restaurant</Typography>
                      <Typography fontWeight="bold">
                        {restaurantName}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 1,
                      }}
                    >
                      <Typography>Items</Typography>
                      <Typography>{items}</Typography>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography variant="h6">Total</Typography>
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        color="#EA7300"
                      >
                        Rs.{totalAmount.toFixed(2)}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>

                {/* Security Info */}
                <Box
                  sx={{
                    mt: 3,
                    p: 2,
                    border: "1px solid #e0e0e0",
                    borderRadius: 2,
                    bgcolor: "#f5f5f5",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <LockOutlinedIcon sx={{ mr: 1, color: "#4CAF50" }} />
                    <Typography variant="body2" color="text.secondary">
                      Secure payment processing
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Your payment information is encrypted and securely
                    processed. We do not store your card details.
                  </Typography>
                </Box>
              </Box>

              {/* Payment Form */}
              <Box sx={{ flex: { md: "1 1 auto" } }}>
                <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
                  Payment Information
                </Typography>

                <form onSubmit={handlePaymentSubmit}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                    disabled={loading}
                    startIcon={<CreditCardIcon />}
                    sx={{
                      py: 1.5,
                      backgroundColor: "#EA7300",
                      fontWeight: "bold",
                      "&:hover": { backgroundColor: "#D66A00" },
                      borderRadius: 2,
                    }}
                  >
                    {loading ? (
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <CircularProgress
                          size={24}
                          sx={{ mr: 2, color: "white" }}
                        />
                        Processing...
                      </Box>
                    ) : (
                      `Proceed to Payment - Rs.${totalAmount.toFixed(2)}`
                    )}
                  </Button>
                </form>
              </Box>
            </Box>
          )}

          {activeStep === 2 && (
            <Box>
              <Box sx={{ textAlign: "center", py: 4 }}>
                <CheckCircleOutlineIcon
                  sx={{ fontSize: 80, color: "#4CAF50", mb: 3 }}
                />
                <Typography
                  variant="h4"
                  sx={{ mb: 2, fontWeight: "bold", color: "#4CAF50" }}
                >
                  Payment Successful!
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  Thank you for your order. Your payment of Rs.
                  {totalAmount.toFixed(2)} has been processed successfully.
                </Typography>
                <Typography variant="body2">
                  Order ID{orderIds.length > 1 ? "s" : ""}:{" "}
                  {orderIds.join(", ")}
                </Typography>
              </Box>

              {/* Order Summary Card after payment */}
              <Box sx={{ maxWidth: 400, mx: "auto", my: 4 }}>
                <Card sx={{ bgcolor: "#f9f9f9", borderRadius: 2 }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                      Order Summary
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 1,
                      }}
                    >
                      <Typography>Restaurant</Typography>
                      <Typography fontWeight="bold">
                        {restaurantName}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 1,
                      }}
                    >
                      <Typography>Items</Typography>
                      <Typography>{items}</Typography>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography variant="h6">Total</Typography>
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        color="#EA7300"
                      >
                        Rs.{totalAmount.toFixed(2)}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Box>

              <Box sx={{ textAlign: "center" }}>
                <Button
                  variant="contained"
                  onClick={handleViewOrders}
                  startIcon={<PaymentIcon />}
                  sx={{
                    mt: 2,
                    py: 1.5,
                    backgroundColor: "#EA7300",
                    fontWeight: "bold",
                    "&:hover": { backgroundColor: "#D66A00" },
                    borderRadius: 2,
                  }}
                >
                  View My Orders
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default PaymentPage;
