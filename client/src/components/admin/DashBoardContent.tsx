import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import UserApi from "@app_utils/api/UserApi";
import { getAccessToken } from "@app_utils/helper/TokenHelper";

export const AdminDashboardContent = () => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const accessToken = getAccessToken();

      if (!accessToken) {
        console.error("Access token not found.");
        return;
      }

      setLoading(true);
      try {
        const data = await UserApi.getUserById();
        setUserData({
          firstName: data.Firstname || "",
          lastName: data.Lastname || "",
          email: data.Email || "",
          phone: data.Phone || "",
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleSaveChanges = async () => {
    setLoading(true);
    try {
      await UserApi.updateUserById({
        firstname: userData.firstName,
        lastname: userData.lastName,
        phone: userData.phone,
      });
      alert("User details updated successfully!");
    } catch (error) {
      console.error("Error updating user details:", error);
      alert("Failed to update user details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Box
      sx={{
        py: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        ml: 2,
        mr: 2,
      }}
    >
      <Typography
        sx={{
          alignSelf: "flex-start",
          fontSize: 24,
        }}
      >
        Profile
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          border: "1px solid",
          borderColor: "rgba(128, 128, 128, 0.5)",
          width: "100%",
          mt: 4,
          borderRadius: 2,
          padding: "1rem",
        }}
      >
        <Typography
          sx={{
            alignSelf: "flex-start",
            fontSize: 20,
          }}
        >
          Account Details
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            mt: 4,
            padding: "1rem",
          }}
        >
          {/* Row 1: First Name and Last Name */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              width: "100%",
              mb: 2,
            }}
          >
            <TextField
              label="First Name"
              name="firstName"
              value={userData.firstName}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Last Name"
              name="lastName"
              value={userData.lastName}
              onChange={handleInputChange}
              fullWidth
            />
          </Box>

          {/* Row 2: Email and Phone */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              width: "100%",
              mb: 2,
            }}
          >
            <TextField
              label="Email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Phone"
              name="phone"
              value={userData.phone}
              onChange={handleInputChange}
              fullWidth
            />
          </Box>

          {/* Save Changes Button */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              width: "100%",
            }}
          >
            <Button
              variant="contained"
              onClick={handleSaveChanges}
              sx={{
                backgroundColor: "#EA7300",
                color: "#fff",
                padding: "1rem",
                borderRadius: "30px",
                textTransform: "none",
                width: "200px",
                mt: 2,
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#D66A00",
                },
              }}
            >
              Save Changes
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
