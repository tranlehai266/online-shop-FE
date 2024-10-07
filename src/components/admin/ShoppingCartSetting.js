import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { getCartByStatus } from "../../features/adminSlice";

function ShoppingCartSetting() {
  const dispatch = useDispatch();
  const carts = useSelector((state) => state.admin.carts);
  const [status, setStatus] = useState("active");

  useEffect(() => {
    dispatch(getCartByStatus(status));
  }, [dispatch, status]);

  return (
    <div>
      <Box sx={{ mb: 2 }}>
        <Button
          variant="contained"
          onClick={() => setStatus("active")}
          sx={{ mr: 2 }}
        >
          Active Carts
        </Button>
        <Button variant="contained" onClick={() => setStatus("completed")}>
          Completed Carts
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Items</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {carts.map((cart) => (
              <TableRow key={cart._id}>
                <TableCell>{cart._id}</TableCell>
                <TableCell>{cart.user_id.email}</TableCell>
                <TableCell>{cart.user_id.name}</TableCell>
                <TableCell>
                  {cart.items.map((item) => (
                    <Box key={item._id}>
                      <Typography>{item.product.name}</Typography>
                      <Typography>Quantity: {item.quantity}</Typography>
                      <img
                        src={item.product.image_url}
                        style={{ width: "100px", height: "50px" }}
                        alt="Product"
                      />
                    </Box>
                  ))}
                </TableCell>
                <TableCell>{cart.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ShoppingCartSetting;
