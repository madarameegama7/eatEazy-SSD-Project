import { useNavigate } from "react-router-dom";
import React, { Suspense } from "react";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import BarChartIcon from "@mui/icons-material/BarChart";
import DescriptionIcon from "@mui/icons-material/Description";
import PeopleIcon from "@mui/icons-material/People";
import PaymentIcon from "@mui/icons-material/Payment";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";
import { AppProvider, Navigation } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useDemoRouter } from "@toolpad/core/internal";
import logo from "@app_assets/logo/png/logo-transparent.png";
import { orange } from "@mui/material/colors";
import UserApi from "@app_utils/api/UserApi";
import { clearTokens, getRefreshToken } from "@app_utils/helper/TokenHelper";
import { DeliveryPersonDashboardContent } from "@app_components/deliveryPerson/DashBoardContent";
import { clear } from "console";

const theme = createTheme({
  palette: {
    primary: orange,
  },
  components: {
    MuiButtonBase: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            backgroundColor: "rgba(255, 152, 0, 0.16)",
            color: "primary.main",
            "&:hover": {
              backgroundColor: "rgba(255, 152, 0, 0.24)",
              color: "primary.main",
            },
          },
        },
      },
    },
  },
});

const demoTheme = createTheme(theme, {
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

interface DemoProps {
  window?: () => Window;
}

export default function DashboardLayoutBasic(props: DemoProps) {
  const { window } = props;
  const navigate = useNavigate();

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

  const NAVIGATION: Navigation = [
    {
      kind: "header",
      title: "Main items",
    },
    {
      segment: "dashboard",
      title: "Dashboard",
      icon: <DashboardIcon />,
    },
    {
      segment: "orders",
      title: "Orders",
      icon: <ShoppingCartIcon />,
    },
    {
      segment: "restaurants",
      title: "Restaurants",
      icon: <RestaurantMenuIcon />,
    },
    {
      segment: "people",
      title: "People",
      icon: <PeopleIcon />,
    },
    {
      segment: "payments",
      title: "Payments",
      icon: <PaymentIcon />,
    },
    {
      segment: "notifications",
      title: "Notifications",
      icon: <NotificationsIcon />,
    },
    {
      kind: "divider",
    },
    {
      kind: "header",
      title: "Analytics",
    },
    {
      segment: "reports",
      title: "Reports",
      icon: <BarChartIcon />,
      children: [
        {
          segment: "sales",
          title: "Sales",
          icon: <DescriptionIcon />,
        },
        {
          segment: "traffic",
          title: "Traffic",
          icon: <DescriptionIcon />,
        },
      ],
    },
    {
      segment: "integrations",
      title: "Integrations",
      icon: <DescriptionIcon />,
    },
    {
      kind: "divider",
    },
    {
      kind: "header",
      title: "Profile",
    },
    {
      segment: "logout",
      title: "Log Out",
      icon: <LogoutIcon />,
    },
  ];

  const router = useDemoRouter("/admin");
  const demoWindow = window !== undefined ? window() : undefined;

  const renderContent = () => {
    switch (router.pathname) {
      case "/admin":
        return <DeliveryPersonDashboardContent />;
      case "/people":
        return <Typography>Page Not Found</Typography>;
      default:
        return <DeliveryPersonDashboardContent />;
    }
  };

  return (
    <AppProvider
      navigation={NAVIGATION}
      branding={{
        logo: <img src={logo} alt="Brand Logo" style={{ height: 100 }} />,
        title: "",
        homeUrl: "/toolpad/core/introduction",
      }}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      {/* Logout Logic */}
      {router.pathname == "/logout" && (
        <>
          {handleLogout()}
          {null}
        </>
      )}

      <DashboardLayout>
        <Suspense fallback={<Typography>Loading...</Typography>}>
          {renderContent()}
        </Suspense>
      </DashboardLayout>
    </AppProvider>
  );
}
