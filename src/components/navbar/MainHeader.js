import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link, useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import SearchItem from "../SearchItem";
import Badge from "@mui/material/Badge";
import { deleteCart, getCart } from "../../features/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Stack } from "@mui/material";

const pages = ["Home", "Shop"];

function MainHeader() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElCart, setAnchorElCart] = React.useState(null);
  const auth = useAuth();
  const { user } = auth;
  const { isAuthenticated, logout } = useAuth();
  const { items } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getCart());
    }
  }, [dispatch, isAuthenticated]);

  const handleDelete = (item) => {
    dispatch(deleteCart({ cartItemId: item }));
    handleCloseCartMenu()
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleOpenCartMenu = (event) => {
    setAnchorElCart(event.currentTarget);
  };
  const handleCloseCartMenu = () => {
    setAnchorElCart(null);
  };
  const handleClickDetail = (detail) => {
    navigate(`/detail/${detail}`);
    handleCloseCartMenu();
  };
  const handleLogout = async () => {
    await logout(() => {
      handleCloseUserMenu();
      toast.success("Logout Success");
    });
  };

  return (
    <AppBar sx={{ backgroundColor: "#000", boxShadow: "none" }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            FUNIO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: "center" }}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
            }}
          >
            <Button
              component={Link}
              to="/"
              sx={{ color: "#fff", fontWeight: "bold", fontSize: "16px" }}
            >
              Home
            </Button>
            <Button
              sx={{ color: "#fff", fontWeight: "bold", fontSize: "16px" }}
            >
              Shop
            </Button>
          </Box>

          <SearchItem />

          {/* icon shopping cart button */}
          <IconButton
            sx={{ color: "#fff", ml: "10px", mr: "10px" }}
            onClick={handleOpenCartMenu}
          >
            <Badge
              badgeContent={isAuthenticated ? items.length : 0}
              color="error"
            >
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          {/* list shopping cart */}
          <Menu
            sx={{ mt: "45px" }}
            id="menu-cart"
            anchorEl={anchorElCart}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElCart)}
            onClose={handleCloseCartMenu}
          >
            {isAuthenticated && items.length > 0 ? (
              <Box>
                {items.map((item) => (
                  <MenuItem
                    key={item._id}
                    onClick={() => handleClickDetail(item.product._id)}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: 1,
                      width: "400px",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <img
                        src={item.product.image_url}
                        alt={item.product.name}
                        style={{ width: 100, height: 60, marginRight: 10 }}
                      />
                      <Box>
                        <Typography variant="body1">
                          {item.product.name}
                        </Typography>
                        <Typography variant="body2">
                          Qty: {item.quantity}
                        </Typography>
                        <Typography variant="body2" fontWeight="bold">
                          ${item.product.price}
                        </Typography>
                      </Box>
                    </Box>

                    <Button
                      onClick={(event) => {
                        event.stopPropagation(); 
                        handleDelete(item._id);
                      }}
                      sx={{
                        backgroundColor: "transparent",
                        borderRadius: "50%",
                        width: "30px",
                        height: "30px",
                        fontSize: "10px",
                        minWidth: "30px",
                        mr: "10px",
                        border: "1px solid #ccc",
                        color: "#000",
                        "&:hover": {
                          backgroundColor: "#000",
                          color: "#fff",
                        },
                      }}
                    >
                      x
                    </Button>
                  </MenuItem>
                ))}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: 2,
                  }}
                >
                  <Typography variant="h6">Total:</Typography>
                  <Typography variant="h6">
                    $
                    {items.reduce(
                      (total, item) =>
                        total + item.product.price * item.quantity,
                      0
                    )}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: 2,
                  }}
                >
                  <Button
                    variant="outlined"
                    fullWidth
                    sx={{ marginRight: 1 }}
                    onClick={() => navigate("/cart")}
                  >
                    View Cart
                  </Button>
                  <Button
                    variant="contained"
                    fullWidth
                    color="primary"
                    onClick={() => navigate("/checkout")}
                  >
                    Checkout
                  </Button>
                </Box>
              </Box>
            ) : (
              <MenuItem
                onClick={handleCloseCartMenu}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: 2,
                }}
              >
                <Box sx={{ textAlign: "center" }}>
                  <ShoppingCartIcon sx={{ fontSize: 60 }} />
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    sx={{ marginTop: 2 }}
                  >
                    No products in the cart.
                  </Typography>
                  <Button
                    sx={{ mt: 1 }}
                    onClick={() => navigate("/product-category")}
                  >
                    GO TO SHOP →
                  </Button>
                </Box>
              </MenuItem>
            )}
          </Menu>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{ p: 0, color: "#fff" }}
              >
                <PersonIcon sx={{ fontSize: "30px" }} />
              </IconButton>
            </Tooltip>

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {isAuthenticated ? (
                <Stack>
                  <MenuItem key="account" onClick={() => navigate("/account")}>
                    Account
                  </MenuItem>
                  <MenuItem key="logout" onClick={handleLogout}>
                    Logout
                  </MenuItem>
                </Stack>
              ) : (
                <MenuItem key="login" onClick={() => navigate("/login")}>
                  Login
                </MenuItem>
              )}
            </Menu>
          </Box>
          <Typography sx={{ ml: "5px", mt: "3px", width: "120px" }}>
            {user?.name}
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default MainHeader;
