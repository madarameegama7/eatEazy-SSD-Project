import { useNavigate } from "react-router-dom";
import { Suspense } from "react";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import PaymentIcon from "@mui/icons-material/Payment";
import NotificationsIcon from "@mui/icons-material/Notifications";
import DescriptionIcon from "@mui/icons-material/Description";
import LogoutIcon from "@mui/icons-material/Logout";
import { AppProvider, Navigation } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useDemoRouter } from "@toolpad/core/internal";
import logo from "@app_assets/logo/png/logo-transparent.png";
import { orange } from "@mui/material/colors";
import UserApi from "@app_utils/api/UserApi";
import { getRefreshToken, clearTokens } from "@app_utils/helper/TokenHelper";
import { CustomerDashboardContent } from "@app_components/customer/DashBoardContent";
import { RestaurantView } from "@app_components/customer/RestaurantContent";
import {CartItemsContent} from "@app_components/customer/CartItemsContent";
import {CustomerOrderContent} from "@app_components/customer/OrderContent";
import NotificationsList from "@app_components/customer/NotificationsList";
import PaymentHistory from "@app_components/customer/PaymentHistory"

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
      children: [
        {
          segment: "cart",
          title: "My Cart",
          icon: <DescriptionIcon />,
        },
        {
          segment: "order",
          title: "My Orders",
          icon: <DescriptionIcon />,
        },
      ],
    },
    {
      segment: "restaurants",
      title: "Restaurants",
      icon: <RestaurantMenuIcon />,
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
        return <CustomerDashboardContent />;
      case "/orders":
        return <Typography>Page Not Found</Typography>;
      case "/restaurants":
        return <RestaurantView />;
      case "/orders/cart":
          return  <CartItemsContent />;
      case "/orders/order":
          return  <CustomerOrderContent/>;
      case "/payments":
          return <PaymentHistory />;   
      case "/notifications":
          return <NotificationsList />;      
      default:
        return <CustomerDashboardContent />;
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
