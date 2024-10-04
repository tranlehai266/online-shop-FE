import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, TextField, IconButton, Fade, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { clearSearchResults, getSearchProduct } from "../features/productSlice";
import { useNavigate } from "react-router-dom";

const SearchItem = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.productSearch);
  console.log("search", products);
  const navigate = useNavigate();
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    setIsOpen(false);
    setSearchQuery("");
    dispatch(clearSearchResults());
  };

  const handleDetail = (productId) => {
    navigate(`/detail/${productId}`);
    setIsOpen(false);
  };

  useEffect(() => {
    if (searchQuery) {
      dispatch(getSearchProduct(searchQuery));
    } else {
      dispatch(clearSearchResults());
    }
  }, [dispatch, searchQuery]);

  return (
    <>
      <IconButton color="inherit" onClick={handleOpen}>
        <SearchIcon />
      </IconButton>
      <Fade in={isOpen}>
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "#e6ebe7",
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "2rem",
            overflowY: "auto",
          }}
        >
          <IconButton
            onClick={handleClose}
            sx={{ position: "absolute", top: 20, right: 20 }}
          >
            <CloseIcon />
          </IconButton>
          <Box sx={{ width: "100%", maxWidth: "600px", mt: 10 }}>
            <TextField
              fullWidth
              variant="standard"
              placeholder="What are you looking for ?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              slotProps={{
                input: {
                  endAdornment: (
                    <IconButton sx={{ p: "10px" }} aria-label="search">
                      <SearchIcon />
                    </IconButton>
                  ),
                },
              }}
              autoFocus
            />
          </Box>
          <Box sx={{ mt: 2, color: "#000", width: "100%", maxWidth: "600px" }}>
            {products.length > 0 ? (
              products.map((product) => (
                <Box
                  key={product._id}
                  onClick={() => handleDetail(product._id)}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ mb: 2, cursor: "pointer" }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <img
                      src={product.image_url}
                      alt={product.name}
                      style={{
                        width: "50px",
                        height: "50px",
                        marginRight: "16px",
                      }}
                    />
                    <Typography variant="h6">{product.name}</Typography>
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
                </Box>
              ))
            ) : (
              <Typography>No products found.</Typography>
            )}
          </Box>
        </Box>
      </Fade>
    </>
  );
};

export default SearchItem;
