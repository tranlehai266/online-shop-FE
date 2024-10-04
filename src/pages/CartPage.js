import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  IconButton,
  Divider,
  Radio,
  RadioGroup,
  FormControlLabel,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Link,
  Breadcrumbs,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import Grid from "@mui/material/Grid2";
import { useDispatch, useSelector } from "react-redux";
import {
  completePayment,
  deleteCart,
  updateQuantity,
} from "../features/cartSlice";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { PayPalButton } from "react-paypal-button-v2";
import { toast } from "react-toastify";

const CartPage = () => {
  const [quantities, setQuantities] = useState({});
  const items = useSelector((state) =>
    Array.isArray(state.cart.items) ? state.cart.items : []
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useAuth();
  const { user } = auth;

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleQuantityChange = (cartItemId, newQuantity) => {
    const validQuantity = Math.max(newQuantity, 1);
    setQuantities((prev) => ({
      ...prev,
      [cartItemId]: validQuantity,
    }));
  };

  const handleDeleteCart = (cartItemId) => {
    dispatch(deleteCart({ cartItemId }));
  };

  const handleUpdateQuantities = () => {
    Object.keys(quantities).forEach((cartItemId) => {
      const quantity = quantities[cartItemId];
      if (quantity > 0) {
        dispatch(updateQuantity({ cartItemId, quantity }));
      }
    });
    setQuantities({});
  };
  const handlePayPalSuccess = (details, data) => {
    toast.success("Transaction completed by " + user?.name);
    dispatch(
      completePayment({ orderID: data.orderID, shippingAddress: user?.address })
    );
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: 2 }}>
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        <Typography color="text.primary">ShoppingCart</Typography>
      </Breadcrumbs>
      <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
        <Typography
          variant="h6"
          sx={{ borderBottom: "2px solid black", mr: 2 }}
        >
          SHOPPING CART ({items.length})
        </Typography>
      </Box>

      <Grid container spacing={8} justifyContent="center">
        <Grid item xs={12} md={8}>
          <TableContainer
            component={Paper}
            sx={{
              border: "1px solid #000",
              width: { md: "700px", xs: "390px" },
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell align="center">Price</TableCell>
                  <TableCell align="center">Quantity</TableCell>
                  <TableCell align="center">Subtotal</TableCell>
                  <TableCell align="center"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.length > 0 ? (
                  items.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell>
                        <Box display="flex" alignItems="center">
                          <img
                            src={item.product.image_url}
                            alt={item.product.name}
                            style={{
                              marginRight: "16px",
                              width: 80,
                              height: 80,
                            }}
                          />
                          <Typography variant="body2">
                            {item.product.name}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="body2" fontWeight="600">
                          ${item.price}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <TextField
                          type="number"
                          defaultValue={item.quantity}
                          onChange={(e) =>
                            handleQuantityChange(
                              item._id,
                              parseInt(e.target.value)
                            )
                          }
                          sx={{ width: "80px" }}
                          inputProps={{
                            min: 1,
                          }}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="body2" fontWeight="600">
                          ${item.price * item.quantity}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          size="small"
                          aria-label="remove product"
                          onClick={() => handleDeleteCart(item._id)}
                        >
                          <Close />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      No items in cart.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleUpdateQuantities}
          >
            Update Cart
          </Button>
          <Button
            variant="contained"
            onClick={() => navigate("/shop")}
            fullWidth
            sx={{ mt: 2 }}
          >
            Continue Shopping
          </Button>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box sx={{ bgcolor: "#f5f5f5", pl: "20px" }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              CART TOTALS
            </Typography>

            <Typography variant="body2" sx={{ mb: 1 }}>
              Shipping
            </Typography>
            <RadioGroup defaultValue="free">
              <FormControlLabel
                value="free"
                control={<Radio size="small" />}
                label="Free shipping"
              />
            </RadioGroup>

            <Box display="flex" gap={1} alignItems="center">
              <Typography variant="body2">Address:</Typography>
              <Typography>{user?.address}</Typography>
            </Box>
            <Box display="flex" gap={1} alignItems="center">
              <Typography variant="body2">Phone:</Typography>
              <Typography>{user?.contact}</Typography>
            </Box>
            <Typography variant="body2">Shipping to Vietnam</Typography>
            <Divider sx={{ my: 2 }} />
            <Box display="flex" justifyContent="space-between" sx={{ mb: 2 }}>
              <Typography variant="body1" fontWeight="bold">
                Total
              </Typography>
              <Typography variant="body1" fontWeight="bold">
                ${total}
              </Typography>
            </Box>
            <Box width="300px">
              {user?.address ? (
                <PayPalButton
                  amount={total}
                  onSuccess={handlePayPalSuccess}
                  onError={() => {
                    toast.error("Error payment");
                  }}
                />
              ) : (
                <Box>
                  <Button variant="contained" fullWidth sx={{ mt: 2 }} disabled>
                    Payments cannot be made without an address
                  </Button>
                  <Link color="inherit" href="/account">
                    Go to account and enter address →
                  </Link>
                </Box>
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CartPage;
