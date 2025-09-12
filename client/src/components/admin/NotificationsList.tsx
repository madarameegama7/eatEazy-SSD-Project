// src/components/customer/NotificationsList.tsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  List,
  ListItemText,
  ListItemIcon,
  Divider,
  Button,
  ListItemButton, // Import ListItemButton for better interaction
} from '@mui/material';
import { styled } from '@mui/material/styles'; // Import styled from @mui/material/styles
import { INotification } from '@app_interfaces/INotification'; // Adjust the import path as necessary
import NotificationApi from '@app_utils/api/NotificationApi';
import EmailIcon from '@mui/icons-material/Email';
import SmsIcon from '@mui/icons-material/Sms';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'; // Icon for "Mark as Read" (outline)
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // Solid tick icon for read status
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead'; // Icon for "Mark all as read" button

// Style for unread items
const UnreadListItem = styled(ListItemButton)(({ theme }) => ({
  backgroundColor: '#FFF4E5',
  borderLeft: `4px solid ${theme.palette.warning.main}`,
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: '#FFE9C7',
    transform: 'translateX(4px)',
  },
  animation: 'fadeIn 0.5s ease-in-out',
}));

// Style for read items
const ReadListItem = styled(ListItemButton)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    transform: 'translateX(4px)',
  },
  opacity: 0.8,
}));

// Add keyframes for fadeIn animation
const fadeIn = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const NotificationsList: React.FC = () => {
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        const data = await NotificationApi.getNotifications();
        // Sort by date descending and ensure read status is preserved
        const sortedData = data.sort((a: INotification, b: INotification) =>
          new Date(b.NotificationDate).getTime() - new Date(a.NotificationDate).getTime()
        );
        setNotifications(sortedData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching notifications:', err);
        setError(err instanceof Error ? err.message : 'Failed to load notifications. Please try again.');
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const handleMarkAsRead = async (notificationId: number) => {
    // Find the notification
    const notificationToMark = notifications.find(notif => notif.NotificationID === notificationId);

    // If already read or not found, do nothing
    if (!notificationToMark || notificationToMark.IsRead) {
        console.log(`Notification ${notificationId} already read or not found.`);
        return;
    }

    try {
      // Optimistically update UI to show it's read immediately
      setNotifications(prev =>
        prev.map(notif =>
          notif.NotificationID === notificationId ? { ...notif, IsRead: true } : notif
        )
      );
      console.log(`Optimistically marked notification ${notificationId} as read.`);

      // Call backend API to actually mark as read
      await NotificationApi.markAsRead(notificationId);
      console.log(`Successfully marked notification ${notificationId} as read on backend.`);

    } catch (err) {
      console.error('Error marking notification as read:', err);
      // Revert UI update if API call failed
      setNotifications(prev =>
        prev.map(notif =>
          notif.NotificationID === notificationId ? { ...notif, IsRead: false } : notif
        )
      );
      setError(err instanceof Error ? err.message : 'Failed to mark as read.');
    }
  };

   const handleMarkAllAsRead = async () => {
     // Filter out already read notifications
     const unreadNotifications = notifications.filter(notif => !notif.IsRead);

     if (unreadNotifications.length === 0) {
        console.log('No unread notifications to mark.');
        return; // Do nothing if all are already read
     }

     try {
      // Optimistically update UI
      setNotifications(prev =>
        prev.map(notif => ({ ...notif, IsRead: true }))
      );
      console.log('Optimistically marked all as read.');
      await NotificationApi.markAllAsRead();
      console.log('Successfully marked all as read on backend.');
    } catch (err) {
      console.error('Error marking all notifications as read:', err);
       // Revert UI update if API call failed (basic revert)
      setNotifications(prev =>
        prev.map(notif => {
            // Only revert if it was previously unread before optimistic update
            const originalNotif = notifications.find(o => o.NotificationID === notif.NotificationID);
            return originalNotif && !originalNotif.IsRead ? { ...notif, IsRead: false } : notif;
        })
      );
      setError(err instanceof Error ? err.message : 'Failed to mark all as read.');
    }
  };


  const getNotificationIcon = (channel: string) => {
    switch (channel) {
      case 'Email':
        return <EmailIcon color="info" />; // Use theme colors
      case 'SMS':
        return <SmsIcon color="success" />; // Use theme colors
      case 'InApp':
      default:
        return <NotificationsIcon sx={{ color: '#EA7300' }} />; // Keep custom color for InApp
    }
  };

  const unreadCount = notifications.filter(notif => !notif.IsRead).length;

  if (loading) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '30vh' }}>
        <CircularProgress sx={{ color: '#EA7300', mb: 2 }} />
        <Typography variant="body1" color="text.secondary">
          Loading notifications...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
        <Alert severity="error" sx={{ borderRadius: 2 }}>
          {error}
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      p: { xs: 2, md: 4 }, 
      maxWidth: 1000, 
      mx: 'auto',
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, #fff5f0, #fff)',
    }}>
      <style>{fadeIn}</style>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 3, 
        flexWrap: 'wrap', 
        gap: 1,
        background: 'white',
        p: 2,
        borderRadius: 2,
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
      }}>
        <Typography variant="h4" fontWeight="bold" sx={{ color: '#EA7300' }}>
          Notifications {unreadCount > 0 && `(${unreadCount} unread)`}
        </Typography>
        {notifications.length > 0 && unreadCount > 0 && (
          <Button
            size="small"
            onClick={handleMarkAllAsRead}
            startIcon={<MarkEmailReadIcon />}
            sx={{ 
              color: '#EA7300',
              '&:hover': {
                backgroundColor: '#FFF4E5',
              }
            }}
          >
            Mark all as read
          </Button>
        )}
      </Box>

      {notifications.length === 0 ? (
        <Paper sx={{ 
          p: 4, 
          textAlign: 'center', 
          borderRadius: 2,
          background: 'white',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
        }}>
          <Typography variant="body1" color="text.secondary">
            You have no notifications.
          </Typography>
        </Paper>
      ) : (
        <Paper sx={{ 
          borderRadius: 2, 
          overflow: 'hidden',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
          background: 'white'
        }}>
          <List disablePadding>
            {notifications.map((notification, index) => {
              const StyledListItem = notification.IsRead ? ReadListItem : UnreadListItem;

              return (
                <React.Fragment key={notification.NotificationID}>
                  <StyledListItem
                    onClick={!notification.IsRead ? () => handleMarkAsRead(notification.NotificationID) : undefined}
                    sx={{ 
                      py: 2, 
                      px: 3,
                      '&:hover': {
                        backgroundColor: notification.IsRead ? 'rgba(0,0,0,0.04)' : '#FFE9C7',
                      }
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      {getNotificationIcon(notification.Channel)}
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography
                          variant="body1"
                          fontWeight={notification.IsRead ? 'normal' : 'bold'}
                          sx={{ 
                            wordBreak: 'break-word',
                            color: notification.IsRead ? 'text.secondary' : 'text.primary'
                          }}
                        >
                          {notification.Message}
                        </Typography>
                      }
                      secondary={
                        <Typography 
                          variant="body2" 
                          color="text.secondary"
                          sx={{ 
                            fontSize: '0.8rem',
                            mt: 0.5
                          }}
                        >
                          {new Date(notification.NotificationDate).toLocaleString()}
                        </Typography>
                      }
                    />
                    <ListItemIcon sx={{ minWidth: 32, mr: 0 }}>
                      {notification.IsRead ? (
                        <CheckCircleIcon color="success" />
                      ) : (
                        <CheckCircleOutlineIcon 
                          color="action"
                          sx={{
                            '&:hover': {
                              color: '#EA7300',
                              transform: 'scale(1.1)',
                              transition: 'all 0.2s ease'
                            }
                          }}
                        />
                      )}
                    </ListItemIcon>
                  </StyledListItem>
                  {index < notifications.length - 1 && <Divider />}
                </React.Fragment>
              );
            })}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default NotificationsList;