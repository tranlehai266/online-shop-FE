import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getShoppingStatus } from "../features/cartSlice";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Container,
} from "@mui/material";
import useAuth from "../hooks/useAuth";

function OrderPage() {
  const dispatch = useDispatch();
  const { user, isLoading } = useAuth();
  const items = useSelector((state) => state.cart.itemsStatus);
  console.log(items);

  const calculateTotal = (items) => {
    return items.reduce((acc, product) => {
      return acc + product.product.price * product.quantity;
    }, 0);
  };

  useEffect(() => {
    if (user && !isLoading) {
      dispatch(getShoppingStatus());
    }
  }, [dispatch, user, isLoading]);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <Typography variant="h4">My Order</Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Products</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Date of purchase</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((order) => (
              <TableRow key={order._id}>
                <TableCell>
                  <List>
                    {order.items.map((product) => (
                      <ListItem key={product._id}>
                        <ListItemAvatar>
                          <Avatar
                            src={product.product.image_url}
                            alt={product.product.name}
                            variant="rounded"
                            sx={{ width: 40, height: 40 }}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={product.product.name}
                          secondary={`Quantity: ${product.quantity}`}
                        />
                      </ListItem>
                    ))}
                  </List>
                </TableCell>
                <TableCell>
                  <Typography>{order.status}</Typography>
                </TableCell>
                <TableCell>{order.shippingAddress}</TableCell>
                <TableCell>
                  <Typography>{calculateTotal(order.items)}$</Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {new Date(order.updatedAt).toLocaleString("vi-VN")}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default OrderPage;