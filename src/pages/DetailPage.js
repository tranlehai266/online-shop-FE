import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductCategory, getProductDetail } from "../features/productSlice";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardMedia,
  Typography,
  Button,
  Box,
  TextField,
  Breadcrumbs,
  Link,
  Divider,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { handleAddToCart } from "../features/cartSlice";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";
import LoadingScreen from "../components/LoadingScreen";
import NotFoundPage from "./NotFoundPage";

const DetailPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const auth = useAuth();
  const { isAuthenticated, user } = auth;
  const navigate = useNavigate();
  const productDetail = useSelector((state) => state.product.productDetail);
  const productIds = useSelector((state) => state.cart.productIds);
  const productCategory = useSelector((state) => state.product.productCategory);
  console.log("31", productDetail);
  console.log("32", productCategory);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const userId = user?._id;
  useEffect(() => {
    if (id) {
      setLoading(true);
      dispatch(getProductDetail(id)).then(() => {
        setLoading(false);
      });
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (productDetail?.category?._id) {
      dispatch(getProductCategory(productDetail.category._id));
    }
  }, [dispatch, productDetail]);

  const addToCart = () => {
    if (!isAuthenticated) {
      toast.error("You need to login");
      return;
    }
    if (productIds.includes(productDetail._id)) {
      toast.info("The product is already in the cart");
    } else {
      dispatch(handleAddToCart({ productId: id, quantity, userId }));
    }
  };

  const handleRelatedProductClick = (relatedProductId) => {
    setLoading(true);
    navigate(`/detail/${relatedProductId}`);
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (!productDetail) {
    return <NotFoundPage />;
  }

  return (
    <Box sx={{ maxWidth: "1200px", margin: "auto", padding: 4 }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: 2 }}>
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        <Link underline="hover" color="inherit" href="/shop">
          Shop
        </Link>
        <Link
          underline="hover"
          color="inherit"
          sx={{ cursor: "pointer" }}
          onClick={() =>
            navigate(`/product-category/${productDetail.category._id}`)
          }
        >
          {productDetail.category.name}
        </Link>
        <Typography color="text.primary">{productDetail.name}</Typography>
      </Breadcrumbs>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
        }}
      >
        <Card sx={{ flex: 1 }}>
          <CardMedia
            component="img"
            image={productDetail.image_url}
            alt={productDetail.name}
            sx={{ height: { md: "680px", xs: "100%" }, objectFit: "contain" }}
          />
        </Card>

        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography variant="h4" component="h1" fontWeight="bold">
            {productDetail.name}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {productDetail.old_price > 0 && (
              <Typography
                variant="h5"
                component="span"
                sx={{ textDecoration: "line-through", color: "text.secondary" }}
              >
                ${productDetail.old_price}
              </Typography>
            )}
            <Typography
              variant="h5"
              component="span"
              fontWeight="bold"
              sx={{ textAlign: "center" }}
            >
              ${productDetail.price}
            </Typography>
            {productDetail.old_price > 0 && (
              <Typography
                variant="body2"
                sx={{
                  bgcolor: "error.main",
                  color: "white",
                  textAlign: "center",
                  width: "40px",
                  borderRadius: 1,
                }}
              >
                -
                {Math.round(
                  ((productDetail.old_price - productDetail.price) /
                    productDetail.old_price) *
                    100
                )}
                %
              </Typography>
            )}
          </Box>

          <Divider />
          <Typography variant="body1" color="text.secondary">
            {productDetail.description}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <TextField
              type="number"
              value={quantity}
              onChange={(e) =>
                setQuantity(Math.max(1, parseInt(e.target.value) || 1))
              }
              sx={{ width: "100px" }}
            />
            <Button
              variant="contained"
              onClick={addToCart}
              sx={{
                height: "60px",
                bgcolor: "grey.800",
                "&:hover": { bgcolor: "grey.900" },
                flexGrow: 1,
              }}
            >
              ADD TO CART
            </Button>
          </Box>
          <Divider />
          <Box display="flex" gap={0.5}>
            <Typography sx={{ opacity: 0.6 }}>SKU: </Typography>
            <Typography>{productDetail.item_id}</Typography>
          </Box>
          <Box display="flex" gap={0.5}>
            <Typography sx={{ opacity: 0.5 }}>Categories: </Typography>
            <Link underline="none" color="inherit" href="#">
              {productDetail.category.name}
            </Link>
          </Box>
          <Box display="flex" gap={0.5}>
            <Typography sx={{ opacity: 0.5 }}>Rating:</Typography>
            <Typography>{productDetail.rating}</Typography>
          </Box>
        </Box>
      </Box>
      <Divider sx={{ mt: "50px" }} />
      <Box mt="40px">
        <Typography variant="h4" textAlign="center" mt="20px" mb="20px">
          Related Products
        </Typography>
        <Grid container spacing={8} justifyContent="center">
          {productCategory.slice(11, 20).map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product._id}>
              <Card>
                <CardMedia
                  component="img"
                  image={product.image_url}
                  alt={product.name}
                  sx={{
                    width: "300px",
                    height: "200px",
                    cursor: "pointer",
                    objectFit: "contain",
                  }}
                  onClick={() => handleRelatedProductClick(product._id)}
                />
                <Box sx={{ p: 2 }}>
                  <Typography variant="subtitle1">{product.name}</Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
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
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default DetailPage;
