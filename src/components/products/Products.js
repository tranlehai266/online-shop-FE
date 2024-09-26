import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import apiService from "../../app/apiService";
import { handleAddToCart } from "../../features/cartSlice";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";

function Products() {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const productIds = useSelector((state) => state.cart.productIds);
  const auth = useAuth();
  const { isAuthenticated } = auth;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await apiService.get("/product-category?limit=10");
        setProducts(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (product) => {
    if (!isAuthenticated) {
      toast.error("Login is required before adding to cart");
      return;
    }
    if (productIds.includes(product._id)) {
      toast.info("The product is already in the cart");
    } else {
      dispatch(handleAddToCart({ productId: product._id }));
    }
  };

  return (
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
                sx={{ height: "200px", width: "300px" }}
                image={product.image_url}
                alt={product.name}
              />
              <CardContent>
                <Typography variant="h6" component="div" textAlign="center">
                  {product.name}
                </Typography>
              </CardContent>
            </Card>
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
              {product.old_price !== "No old price" && (
                <Typography
                  variant="body1"
                  textAlign="center"
                  mt="10px"
                  fontWeight="bold"
                  sx={{ textDecoration: "line-through" }}
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
            <Button
              onClick={() => addToCart(product)}
              variant="contained"
              color="primary"
              sx={{
                position: "absolute",
                bottom: "50px",
                left: "50%",
                transform: "translateX(-50%)",
                opacity: 0,
                transition: "opacity 0.3s",
              }}
              className="add-to-cart"
            >
              Add to cart
            </Button>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}

export default Products;
