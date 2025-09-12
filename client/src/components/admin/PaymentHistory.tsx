// src/components/payment/PaymentHistory.tsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  CircularProgress,
  Alert,
  Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PaymentApi from '@app_utils/api/PaymentApi';

const PaymentHistory: React.FC = () => {
  const navigate = useNavigate();
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchPaymentHistory = async () => {
      try {
        setLoading(true);
        const response = await PaymentApi.getPaymentHistory();
        setPayments(response);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching payment history:', err);
        setError('Failed to load payment history. Please try again.');
        setLoading(false);
      }
    };
  
    fetchPaymentHistory();
  }, []);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getStatusChipColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
      case 'success':
        return 'success';
      case 'pending':
        return 'warning';
      case 'failed':
        return 'error';
      default:
        return 'default';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleViewOrder = (orderId: number) => {
    navigate(`/customer/orders/${orderId}`);
  };

  const handlePayment = (orderId: number) => {
    navigate('/checkout', { state: { orderId } });
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress sx={{ color: '#EA7300' }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
        Payment History
      </Typography>
      
      {payments.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 2 }}>
          <Typography variant="body1" color="text.secondary">
            You haven't made any payments yet.
          </Typography>
          <Button 
            variant="contained" 
            onClick={() => navigate('/restaurants')}
            sx={{ 
              mt: 2,
              bgcolor: '#EA7300', 
              '&:hover': { bgcolor: '#D66A00' } 
            }}
          >
            Browse Restaurants
          </Button>
        </Paper>
      ) : (
        <Paper sx={{ width: '100%', borderRadius: 2, overflow: 'hidden' }}>
          <TableContainer>
            <Table>
              <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Payment Ref No</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Order ID</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Amount</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Payment Method</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {payments
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((payment) => (
                    <TableRow key={payment.PaymentID} hover>
                      <TableCell>{payment.PaymentID}</TableCell>
                      <TableCell>{payment.OrderID}</TableCell>
                      <TableCell>Rs. {typeof payment.Amount === 'number' 
                        ? payment.Amount.toFixed(2) 
                        : parseFloat(payment.Amount || '0').toFixed(2)}
                      </TableCell>
                      <TableCell>{payment.PaymentMethod}</TableCell>
                      <TableCell>{formatDate(payment.CreatedAt)}</TableCell>
                      <TableCell>
                        <Chip 
                          label={payment.Status} 
                          color={getStatusChipColor(payment.Status)} 
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Button 
                          size="small" 
                          onClick={() => handleViewOrder(payment.OrderID)}
                          sx={{ color: '#EA7300' }}
                        >
                          View Order
                        </Button>
                        {payment.Status.toLowerCase() === 'pending' || payment.Status.toLowerCase() === 'failed' ? (
                          <Button 
                            size="small" 
                            onClick={() => handlePayment(payment.OrderID)}
                            sx={{ color: '#EA7300' }}
                          >
                            Pay now
                          </Button>
                        ) : null}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={payments.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}
    </Box>
  );
};

export default PaymentHistory;