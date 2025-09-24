// LoginSection.tsx
import React, { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  useMediaQuery,
  Theme,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import logo from "@app_assets/LoginImage.png";
import UserApi from "@app_utils/api/UserApi";
import { setTokens } from "@app_utils/helper/TokenHelper";

interface FormData {
  email: string;
  password: string;
}

interface DecodedToken {
  email?: string;
  name?: string;
  sub?: string;
}

// Manual JWT decoding function
const decodeJWT = (token: string): DecodedToken | null => {
  try {
    const base64Url = token.split('.')[1];
    if (!base64Url) throw new Error('Invalid JWT token format');
    
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
};

const LoginSection: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const [formData, setFormData] = useState<FormData>({ email: "", password: "" });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await UserApi.login({ email: formData.email, password: formData.password });
      const { accessToken, refreshToken } = response;
      setTokens(accessToken, refreshToken);

      const user = await UserApi.verifyToken();
      if (!user || !user.role) throw new Error("Failed to fetch user details.");

      switch (user.role) {
        case "Admin":
          navigate("/admin");
          break;
        case "Restaurant":
          navigate("/restaurant");
          break;
        case "Customer":
          navigate("/customer");
          break;
        case "DeliveryPerson":
          navigate("/delivery");
          break;
        default:
          navigate("/404");
      }
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message || "Failed to login");
      else setError("Failed to login");
    } finally {
      setLoading(false);
    }
  };

  // Comment out Google login functionality for now
  /*
  const handleGoogleLogin = async (credentialResponse: any) => {
    if (!credentialResponse.credential) return setError("Google login failed");

    try {
      const decoded = decodeJWT(credentialResponse.credential);
      if (!decoded) throw new Error('Failed to decode JWT token');
      
      console.log('Decoded token:', decoded);

      const response = await UserApi.googleLogin({ token: credentialResponse.credential });
      const { accessToken, refreshToken } = response;
      setTokens(accessToken, refreshToken);

      const user = await UserApi.verifyToken();
      if (!user || !user.role) throw new Error("Failed to fetch user details.");

      switch (user.role) {
        case "Admin":
          navigate("/admin");
          break;
        case "Restaurant":
          navigate("/restaurant");
          break;
        case "Customer":
          navigate("/customer");
          break;
        case "DeliveryPerson":
          navigate("/delivery");
          break;
        default:
          navigate("/404");
      }
    } catch (err) {
      console.error("Google login failed:", err);
      setError("Google login failed");
    }
  };
  */

  const togglePasswordVisibility = () => setShowPassword(prev => !prev);
  const handleRegisterClick = () => navigate("/register");

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        background: "linear-gradient(90deg, #FFEDD5 50%, #FFF)",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      {/* Left Form */}
      <Box
        sx={{
          width: isMobile ? "100%" : "40%",
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: isMobile ? "center" : "flex-start",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3, textAlign: isMobile ? "center" : "left" }}>
          Welcome Back
        </Typography>
        <Typography variant="subtitle1" sx={{ color: "gray", mb: 3, textAlign: isMobile ? "center" : "left" }}>
          Please login to your account to continue.
        </Typography>

        {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}

        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#EA7300" },
            "& .MuiOutlinedInput-root.Mui-focused": { color: "#EA7300" },
            "& .MuiInputLabel-root.Mui-focused": { color: "#EA7300" },
          }}
        />
        <TextField
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          type={showPassword ? "text" : "password"}
          variant="outlined"
          fullWidth
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#EA7300" },
            "& .MuiOutlinedInput-root.Mui-focused": { color: "#EA7300" },
            "& .MuiInputLabel-root.Mui-focused": { color: "#EA7300" },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={togglePasswordVisibility} edge="end">
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button variant="contained" onClick={handleSubmit} sx={{
          background: "#EA7300",
          padding: "0.8rem",
          fontSize: "16px",
          fontWeight: "bold",
          borderRadius: "30px",
          textTransform: "none",
          width: "100%",
        }}>
          {loading ? "Logging in..." : "Login"}
        </Button>

        {/* Google Login - Commented out for now */}
        {/*
        <Box sx={{ mt: 3, width: "100%" }}>
          <GoogleLogin onSuccess={handleGoogleLogin} onError={() => setError("Google login failed")} />
        </Box>
        */}

        <Typography variant="subtitle1" sx={{ color: "gray", mt: 6, textAlign: isMobile ? "center" : "left" }}>
          Don't have an account?{" "}
          <span onClick={handleRegisterClick} style={{ color: "#EA7300", cursor: "pointer" }}>
            Click Here to Register
          </span>
        </Typography>
      </Box>

      {/* Right Image */}
      {!isMobile && (
        <Box sx={{ position: "relative" }}>
          <img src={logo} alt="Delicious Food" style={{ borderRadius: "50%", width: 600, height: 600 }} />
        </Box>
      )}
    </Box>
  );
};

export default LoginSection;