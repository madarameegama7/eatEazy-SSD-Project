import * as React from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import logo from "@app_assets/logo/png/logo-transparent.png";
import UserApi from "../../utils/api/UserApi";
import { getRefreshToken, clearTokens } from "../../utils/helper/TokenHelper";

const settings = ["Logout"];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const navigate = useNavigate();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    handleCloseNavMenu();
  };

  const handleLogout = async () => {
    try {
      console.log("Logging out...");
      const refreshToken = getRefreshToken();
      if (!refreshToken) {
        console.warn("No refresh token found. Redirecting to login.");
        clearTokens();
        navigate("/");
        return;
      }
      await UserApi.logout();
      clearTokens();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          width: "100%",
          backgroundColor: "white",
          color: "black",
          boxShadow: "none",
        }}
      >
        <Toolbar disableGutters>
          {/* Logo */}
          <img
            src={logo}
            alt="Logo"
            style={{
              display: "flex",
              height: "60px",
              marginRight: "20px",
              marginLeft: "20px",
            }}
          />

          {/* Mobile Menu Icon */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {/* Add all menu items for mobile */}
              <MenuItem onClick={() => handleNavigate("/customer")}>
                <HomeOutlinedIcon sx={{ marginRight: "10px" }} />
                <Typography textAlign="center">Home</Typography>
              </MenuItem>
              <MenuItem onClick={() => handleNavigate("/cart")}>
                <ShoppingCartOutlinedIcon sx={{ marginRight: "10px" }} />
                <Typography textAlign="center">Cart</Typography>
              </MenuItem>
              <MenuItem onClick={() => handleNavigate("/notifications")}>
                <NotificationsNoneOutlinedIcon sx={{ marginRight: "10px" }} />
                <Typography textAlign="center">Notifications</Typography>
              </MenuItem>
              <MenuItem onClick={() => handleNavigate("/profile")}>
                <PersonOutlineIcon sx={{ marginRight: "10px" }} />
                <Typography textAlign="center">Profile</Typography>
              </MenuItem>
            </Menu>
          </Box>

          {/* Search Bar */}
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextField
              placeholder="Search..."
              variant="outlined"
              size="small"
              sx={{
                width: { xs: "80%", md: "50%" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "gray",
                  },
                  "&:hover fieldset": {
                    borderColor: "gray",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "gray",
                  },
                },
              }}
            />
          </Box>

          {/* Centered Navigation Items (Desktop View) */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
              alignItems: "center",
            }}
          ></Box>

          {/* User Avatar and Settings */}
          <Box
            sx={{
              flexGrow: 0,
              marginRight: { xs: "10px", md: "50px" },
              display: { xs: "none", md: "flex" },
            }}
          >
            <Tooltip title="Home">
              <IconButton
                sx={{
                  p: 0,
                  outline: "none",
                  "&:focus": {
                    outline: "none",
                  },
                }}
                onClick={() => navigate(-1)}
              >
                <HomeOutlinedIcon
                  sx={{
                    color: "grey",
                    fontSize: { xs: "24px", md: "30px" },
                  }}
                />
              </IconButton>
            </Tooltip>
          </Box>
          <Box
            sx={{
              flexGrow: 0,
              marginRight: { xs: "10px", md: "50px" },
              display: { xs: "none", md: "flex" },
            }}
          >
            <Tooltip title="Cart">
              <IconButton
                sx={{
                  p: 0,
                  outline: "none",
                  "&:focus": {
                    outline: "none",
                  },
                }}
                onClick={() => handleNavigate("/cart")}
              >
                <ShoppingCartOutlinedIcon
                  sx={{
                    color: "grey",
                    fontSize: { xs: "24px", md: "30px" },
                  }}
                />
              </IconButton>
            </Tooltip>
          </Box>
          <Box
            sx={{
              flexGrow: 0,
              marginRight: { xs: "10px", md: "50px" },
              display: { xs: "none", md: "flex" },
            }}
          >
            <Tooltip title="Notifications">
              <IconButton
                sx={{
                  p: 0,
                  outline: "none",
                  "&:focus": {
                    outline: "none",
                  },
                }}
                onClick={() => handleNavigate("/notifications")}
              >
                <NotificationsNoneOutlinedIcon
                  sx={{
                    color: "grey",
                    fontSize: { xs: "24px", md: "30px" },
                  }}
                />
              </IconButton>
            </Tooltip>
          </Box>
          <Box
            sx={{
              flexGrow: 0,
              marginRight: { xs: "10px", md: "50px" },
              display: { xs: "none", md: "flex" },
            }}
          >
            <Tooltip title="Profile">
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{
                  p: 0,
                  outline: "none",
                  "&:focus": {
                    outline: "none",
                  },
                }}
              >
                <PersonOutlineIcon
                  sx={{
                    color: "grey",
                    fontSize: { xs: "24px", md: "30px" },
                  }}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => {
                    handleCloseUserMenu();
                    if (setting === "Logout") {
                      handleLogout();
                    }
                  }}
                  sx={{
                    textAlign: "center",
                    outline: "none",
                    "&:focus": {
                      outline: "none",
                    },
                  }}
                >
                  <Typography>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Add space below the AppBar */}
      {/* <Box sx={{ marginTop: "120px" }}></Box> */}
    </>
  );
}

export default ResponsiveAppBar;
