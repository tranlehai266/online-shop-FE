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
} from "@mui/material";
import useAuth from "../hooks/useAuth";

function OrderPage() {
  const dispatch = useDispatch();
  const { user, isLoading } = useAuth();
  const items = useSelector((state) => state.cart.itemsStatus);

  useEffect(() => {
    if (user && !isLoading) {
      dispatch(getShoppingStatus());
    }
  }, [dispatch, user, isLoading]);

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order</TableCell>
              <TableCell>Products</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Date of purchase</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((order) => (
              <TableRow key={order._id}>
                <TableCell>
                  <Typography>#{order._id}</Typography>
                </TableCell>
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
                  <Typography>{order.updatedAt}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default OrderPage;
