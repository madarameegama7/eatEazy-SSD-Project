// LoginSection.tsx
import React, { ChangeEvent, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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

const LoginSection: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  // OAuth token handling
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token) {
      setTokens(token, ""); // Save access token (no refresh token in this case)
      UserApi.verifyToken()
        .then((user) => {
          if (!user || !user.role) {
            navigate("/login");
            return;
          }

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
              navigate("/login");
          }
        })
        .catch((err) => {
          console.error("OAuth verification failed:", err);
          navigate("/login");
        });
    }
  }, [location, navigate]);

  // for normal login
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await UserApi.login({
        email: formData.email,
        password: formData.password,
      });
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

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
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
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            mb: 3,
            textAlign: isMobile ? "center" : "left",
          }}
        >
          Welcome Back
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ color: "gray", mb: 3, textAlign: isMobile ? "center" : "left" }}
        >
          Please login to your account to continue.
        </Typography>

        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              { borderColor: "#EA7300" },
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
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              { borderColor: "#EA7300" },
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

        {/* Normal Login Button */}
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            background: "linear-gradient(90deg, #FF7A00, #FFB347)",
            padding: "0.8rem",
            fontSize: "16px",
            fontWeight: "bold",
            borderRadius: "50px",
            textTransform: "none",
            width: "100%",
            boxShadow: "0px 4px 15px rgba(234, 115, 0, 0.4)",
            transition: "all 0.3s ease",
            "&:hover": {
              background: "linear-gradient(90deg, #FFB347, #FF7A00)",
              boxShadow: "0px 6px 20px rgba(234, 115, 0, 0.5)",
            },
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>

        {/* Google Login Button */}
        <Button
          variant="outlined"
          onClick={() =>
            (window.location.href =
              "https://accounts.google.com/o/oauth2/v2/auth?client_id=658533228628-7ts7oihgtp70trnjj32prft363q1rf7a.apps.googleusercontent.com&redirect_uri=http://localhost:4000/auth/google/callback&response_type=code&scope=profile email")
          }
          startIcon={
            <img
              src="/assets/google-logo.png"
              alt="Google"
              style={{ width: 25, height: 25 }}
            />
          }
          sx={{
            borderColor: "#EA7300",
            color: "#EA7300",
            padding: "0.8rem",
            fontSize: "16px",
            fontWeight: "bold",
            borderRadius: "50px",
            textTransform: "none",
            width: "100%",
            mt: 2,
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "#FFF2E0",
              borderColor: "#EA7300",
              transform: "translateY(-2px)",
              boxShadow: "0px 4px 10px rgba(234, 115, 0, 0.3)",
            },
          }}
        >
          Login with Google
        </Button>

        <Typography
          variant="subtitle1"
          sx={{ color: "gray", mt: 6, textAlign: isMobile ? "center" : "left" }}
        >
          Don't have an account?{" "}
          <span
            onClick={handleRegisterClick}
            style={{ color: "#EA7300", cursor: "pointer" }}
          >
            Click Here to Register
          </span>
        </Typography>
      </Box>

      {/* Right Image */}
      {!isMobile && (
        <Box sx={{ position: "relative" }}>
          <img
            src={logo}
            alt="Delicious Food"
            style={{ borderRadius: "50%", width: 600, height: 600 }}
          />
        </Box>
      )}
    </Box>
  );
};

export default LoginSection;
