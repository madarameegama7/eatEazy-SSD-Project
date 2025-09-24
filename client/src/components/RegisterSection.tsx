import React, { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  useMediaQuery,
  Theme,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import logo from "@app_assets/LoginImage.png";
import UserApi from "@app_utils/api/UserApi";

interface FormData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
}

const RegisterSection: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [role, setRole] = useState<string>("Customer");
  const [formData, setFormData] = useState<FormData>({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await UserApi.register({
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        role,
      });
      navigate("/login");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Failed to register");
      } else {
        setError("Failed to register");
      }
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleRoleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value);
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const ALLOWED_ROLES = ["Admin", "Restaurant", "Customer", "DeliveryPerson"];

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
      {/* Left Content (Registration Form) */}
      <Box
        sx={{
          width: isMobile ? "100%" : "40%",
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            mb: 3,
            mt: isMobile ? 5 : 20,
            textAlign: isMobile ? "center" : "left",
          }}
        >
          Register
        </Typography>

        {error && (
          <Typography
            color="error"
            sx={{ mb: 2, textAlign: isMobile ? "center" : "left" }}
          >
            {error}
          </Typography>
        )}

        <TextField
          label="First Name"
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Last Name"
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          type={showPassword ? "text" : "password"}
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
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
        <TextField
          label="Confirm Password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          type={showPassword ? "text" : "password"}
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
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
     <TextField
  label="Role"
  name="role"
  value={role}
  variant="outlined"
  fullWidth
  sx={{ mb: 2 }}
  InputProps={{
    readOnly: true,
  }}
/>
        <Box sx={{ display: "flex", gap: 2, mt: 2, flexWrap: "wrap" }}>
          {/* Normal Register Button */}
          <Button
            variant="contained"
            disabled={loading}
            onClick={handleSubmit}
            sx={{
              background: "#EA7300",
              padding: "0.8rem",
              fontSize: "16px",
              fontWeight: "bold",
              borderRadius: "30px",
              textTransform: "none",
              flex: 1,
            }}
          >
            {loading ? "Registering..." : "Register"}
          </Button>

          {/* Google OAuth Button */}
          <Button
            variant="outlined"
            onClick={() =>
              (window.location.href = "https://accounts.google.com/o/oauth2/v2/auth?client_id=658533228628-7ts7oihgtp70trnjj32prft363q1rf7a.apps.googleusercontent.com&redirect_uri=http://localhost:4000/auth/google/callback&response_type=code&scope=profile email")
            }
            startIcon={
              <img
                src="/assets/google-logo.png" // add a Google logo in your public/assets folder
                alt="Google"
                style={{ width: 30, height: 30 }}
              />
            }
            sx={{
              borderColor: "#EA7300",
              color: "#EA7300",
              padding: "0.8rem",
              fontSize: "16px",
              fontWeight: "bold",
              borderRadius: "30px",
              textTransform: "none",
              flex: 1,
              "&:hover": {
                backgroundColor: "#FFE6CC",
                borderColor: "#EA7300",
              },
            }}
          >
            Register with Google
          </Button>
        </Box>

        <Typography
          variant="subtitle1"
          sx={{
            color: "gray",
            mt: 3,
            mb: 3,
            textAlign: isMobile ? "center" : "left",
          }}
        >
          Already have an account?{" "}
          <span
            onClick={handleLoginClick}
            style={{
              color: "#EA7300",
              cursor: "pointer",
              textDecoration: "none",
            }}
          >
            Click Here to Login
          </span>
        </Typography>
      </Box>

      {/* Right Image */}
      {!isMobile && (
        <Box sx={{ position: "relative" }}>
          <img
            src={logo}
            alt="Delicious Food"
            style={{ borderRadius: "50%", width: "600px", height: "600px" }}
          />
        </Box>
      )}
    </Box>
  );
};

export default RegisterSection;
