import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleAddToCart } from "../../features/cartSlice";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  Stack,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Grid from "@mui/material/Grid2";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import { getProducts } from "../../features/productSlice";
import { useNavigate } from "react-router-dom";

function Products() {
  const dispatch = useDispatch();
  const productIds = useSelector((state) => state.cart.productIds);
  const products = useSelector((state) => state.product.products);
  const navigate = useNavigate();
  const auth = useAuth();
  const { isAuthenticated, user } = auth;
  console.log("28", user);
  const userId = user?.data?._id;

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const addToCart = (product) => {
    if (!isAuthenticated) {
      toast.error("You need to log in");
      return;
    }
    if (productIds.includes(product._id)) {
      toast.info("The product is already in the cart");
    } else {
      dispatch(
        handleAddToCart({ productId: product._id, quantity: 1, userId })
      );
      console.log("45", userId);
    }
  };
  const handleClick = (id) => {
    navigate(`/detail/${id}`);
    console.log(id);
  };

  return (
    <Stack>
      <Box>
        <Typography variant="h4" sx={{ textAlign: "center", padding: "25px" }}>
          Latest Products
        </Typography>
      </Box>
      <Grid container spacing={3} padding={3} justifyContent="center">
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
            <Box
              sx={{
                position: "relative",
                "&:hover .add-to-cart": {
                  opacity: 1,
                },
              }}
            >
              <Card
                sx={{
                  boxShadow: 3,
                  borderRadius: 2,
                  transition: "transform 0.3s",
                  "&:hover": { transform: "scale(1.05)" },
                }}
              >
                <CardMedia
                  component="img"
                  sx={{ height: "200px", width: "300px", cursor: "pointer" }}
                  image={product.image_url}
                  alt={product.name}
                  onClick={() => handleClick(product._id)}
                />
                <CardContent>
                  <Typography variant="h6" component="div" textAlign="center">
                    {product.name}
                  </Typography>
                </CardContent>
                <Button
                  onClick={() => addToCart(product)}
                  variant="contained"
                  color="primary"
                  sx={{
                    position: "absolute",
                    bottom: "18px",
                    left: "260px",
                    transform: "translateX(-50%)",
                    opacity: 0,
                    transition: "opacity 0.3s",
                  }}
                  className="add-to-cart"
                >
                  <ShoppingCartIcon fontSize="15px" />
                </Button>
              </Card>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
              {product.old_price !== "No old price" && (
                <Typography
                  variant="body1"
                  textAlign="center"
                  mt="10px"
                  fontWeight="bold"
                  sx={{ textDecoration: "line-through", opacity: "0.7" }}
                >
                  {`$${product.old_price}`}
                </Typography>
              )}
              <Typography
                variant="body1"
                color="error"
                textAlign="center"
                mt="10px"
                fontWeight="bold"
              >
                {`$${product.price}`}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}

export default Products;
