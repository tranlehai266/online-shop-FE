import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListItemText,
  Button,
  Select,
  MenuItem,
  Rating,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import { getCategory, getProducts } from "../features/productSlice";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";
import { handleAddToCart } from "../features/cartSlice";
import { useNavigate } from "react-router-dom";

const Shop = () => {
  const [sort, setSort] = useState("default");
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const categories = useSelector((state) => state.product.categories);
  const productIds = useSelector((state) => state.cart.productIds);
  const auth = useAuth();
  const navigate = useNavigate();
  const { isAuthenticated, user } = auth;
  const userId = user?._id;

  const [visible, setVisible] = useState(8);

  useEffect(() => {
    dispatch(getProducts(sort));
    dispatch(getCategory());
  }, [dispatch, sort]);

  const addToCart = (product) => {
    if (!isAuthenticated) {
      toast.error("You need to log in");
      return;
    }
    if (productIds.includes(product._id)) {
      toast.info("The product is already in the cart");
    } else {
      dispatch(
        handleAddToCart({
          productId: product._id,
          quantity: 1,
          userId,
        })
      );
    }
  };

  const handleDetailPage = (id) => {
    navigate(`/detail/${id}`);
  };

  const handleProductCategory = (categoryId) => {
    navigate(`/product-category/${categoryId}`);
  };

  const loadMore = () => {
    setVisible((prev) => prev + 6);
  };

  const getRatingByPopularity = (popularity) => {
    if (popularity >= 80) return 5;
    if (popularity >= 60) return 4;
    if (popularity >= 40) return 3;
    if (popularity >= 20) return 2;
    return 1;
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h2"
        fontWeight="bold"
        textAlign="center"
        mb={3}
        sx={{ textTransform: "uppercase" }}
      >
        Shop
      </Typography>

      <Box sx={{ display: "flex" }}>
        <Box
          sx={{
            width: { xs: "100%", md: "20%" },
            pr: 2,
            borderRight: "1px solid #e0e0e0",
          }}
        >
          <Typography variant="h6" gutterBottom>
            CATEGORIES
          </Typography>
          <List>
            {categories.map((category) => (
              <ListItem
                key={category._id}
                disablePadding
                sx={{
                  "&:hover": {
                    opacity: "1",
                    cursor: "pointer",
                  },
                  opacity: 0.5,
                }}
              >
                <ListItemText
                  primary={category.name}
                  onClick={() => handleProductCategory(category._id)}
                />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Products section */}
        <Box sx={{ width: { xs: "100%", md: "75%" }, pl: 2 }}>
          <Box sx={{ display: "flex", mb: 2 }}>
            <Select
              size="small"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <MenuItem value="default">Default Sorting</MenuItem>
              <MenuItem value="popularity">Popularity</MenuItem>
              <MenuItem value="rating">Rating</MenuItem>
              <MenuItem value="priceLowToHigh">Price: Low to High</MenuItem>
              <MenuItem value="priceHighToLow">Price: High to Low</MenuItem>
            </Select>
          </Box>
          <Grid container spacing={3}>
            {products.slice(0, visible).map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product._id}>
                <Box
                  sx={{
                    position: "relative",
                    "&:hover .add-to-cart": { opacity: 1 },
                    padding: "1px",
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
                      onClick={() => handleDetailPage(product._id)}
                      component="img"
                      sx={{
                        height: "250px",
                        width: "320px",
                        objectFit: "fill",
                        cursor: "pointer",
                      }}
                      image={product.image_url}
                      alt={product.name}
                    />
                    <CardContent
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="h6" component="div">
                        {product.name}
                      </Typography>
                      <Typography>Rating: {product.rating}</Typography>
                      <Typography>Popularity: {product.popularity}</Typography>
                      <Rating
                        name="half-rating-read"
                        value={getRatingByPopularity(product.popularity)}
                        precision={0.5}
                        readOnly
                      />
                    </CardContent>
                    <Button
                      onClick={() => addToCart(product)}
                      variant="contained"
                      color="primary"
                      sx={{
                        position: "absolute",
                        bottom: "18px",
                        left: "86%",
                        transform: "translateX(-50%)",
                        opacity: 0,
                        transition: "opacity 0.3s",
                        minWidth: "20px",
                      }}
                      className="add-to-cart"
                    >
                      <ShoppingCartIcon fontSize="10px" />
                    </Button>
                  </Card>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 2,
                    mt: 1,
                  }}
                >
                  {product.old_price !== "No old price" && (
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      sx={{ textDecoration: "line-through", opacity: "0.7" }}
                    >
                      {`$${product.old_price}`}
                    </Typography>
                  )}
                  <Typography variant="body1" color="error" fontWeight="bold">
                    {`$${product.price}`}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
          {visible < products.length && (
            <Button
              onClick={loadMore}
              variant="contained"
              color="primary"
              sx={{
                mt: 2,
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              Load More
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Shop;
