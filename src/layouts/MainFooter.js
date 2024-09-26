import React from "react";
import {
  Container,
  Typography,
  Link,
  IconButton,
  List,
  ListItem,
  Divider,
} from "@mui/material";
import { Instagram, Facebook, YouTube } from "@mui/icons-material";
import XIcon from "@mui/icons-material/X";
import Grid from "@mui/material/Grid2";
import logo from "../images/logo__shop.png";
import pay from "../images/pay.png";
const MainFooter = () => {
  return (
    <div>
      <Divider />

      <Container maxWidth="lg">
        <Grid
          container
          spacing={2}
          alignItems="center"
          sx={{
            justifyContent: {
              xs: "center",
              md: "space-between",
            },
          }}
        >
          <Grid item>
            <img
              src={logo}
              width="100px"
              alt="Social Logo"
              style={{ marginTop: "10px" }}
            />
          </Grid>
          <Grid item>
            <List sx={{ display: "flex" }}>
              <ListItem>
                <IconButton component={Link} href="">
                  <XIcon />
                </IconButton>
              </ListItem>
              <ListItem>
                <IconButton component={Link} href="">
                  <Instagram />
                </IconButton>
              </ListItem>
              <ListItem>
                <IconButton component={Link} href="">
                  <Facebook />
                </IconButton>
              </ListItem>
              <ListItem>
                <IconButton component={Link} href="">
                  <YouTube />
                </IconButton>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Container>

      <Divider />

      <Container
        maxWidth="lg"
        sx={{
          display: { xs: "column", md: "flex" },
          justifyContent: "space-between",
          pt: "10px",
          pb: "10px",
        }}
      >
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            GET HELP
          </Typography>
          <List>
            <ListItem disablePadding sx={{ py: 0.5 }}>
              <Link
                href="#"
                underline="hover"
                color="inherit"
                sx={{ fontSize: "0.875rem" }}
              >
                Contact & FAQ
              </Link>
            </ListItem>
            <ListItem disablePadding sx={{ py: 0.5 }}>
              <Link
                href="#"
                underline="hover"
                color="inherit"
                sx={{ fontSize: "0.875rem" }}
              >
                Track Your Order
              </Link>
            </ListItem>
            <ListItem disablePadding sx={{ py: 0.5 }}>
              <Link
                href="#"
                underline="hover"
                color="inherit"
                sx={{ fontSize: "0.875rem" }}
              >
                Shipping & Delivery
              </Link>
            </ListItem>
            <ListItem disablePadding sx={{ py: 0.5 }}>
              <Link
                href="#"
                underline="hover"
                color="inherit"
                sx={{ fontSize: "0.875rem" }}
              >
                Visit Brisbane Studio
              </Link>
            </ListItem>
            <ListItem disablePadding sx={{ py: 0.5 }}>
              <Link
                href="#"
                underline="hover"
                color="inherit"
                sx={{ fontSize: "0.875rem" }}
              >
                Interest Free Finance
              </Link>
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography
            variant="subtitle1"
            gutterBottom
            sx={{ fontWeight: "bold" }}
          >
            SERVICES
          </Typography>
          <List dense disablePadding>
            <ListItem disablePadding sx={{ py: 0.5 }}>
              <Link
                href="#"
                underline="hover"
                color="inherit"
                sx={{ fontSize: "0.875rem" }}
              >
                Assembly Guides
              </Link>
            </ListItem>
            <ListItem disablePadding sx={{ py: 0.5 }}>
              <Link
                href="#"
                underline="hover"
                color="inherit"
                sx={{ fontSize: "0.875rem" }}
              >
                Furniture Packages & Fitouts
              </Link>
            </ListItem>
            <ListItem disablePadding sx={{ py: 0.5 }}>
              <Link
                href="#"
                underline="hover"
                color="inherit"
                sx={{ fontSize: "0.875rem" }}
              >
                Trade Programme
              </Link>
            </ListItem>
            <ListItem disablePadding sx={{ py: 0.5 }}>
              <Link
                href="#"
                underline="hover"
                color="inherit"
                sx={{ fontSize: "0.875rem" }}
              >
                Sale
              </Link>
            </ListItem>
            <ListItem disablePadding sx={{ py: 0.5 }}>
              <Link
                href="#"
                underline="hover"
                color="inherit"
                sx={{ fontSize: "0.875rem" }}
              >
                New Designs
              </Link>
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography
            variant="subtitle1"
            gutterBottom
            sx={{ fontWeight: "bold" }}
          >
            CONNECT
          </Typography>
          <List dense disablePadding>
            <ListItem disablePadding sx={{ py: 0.5 }}>
              <Link
                href="#"
                underline="hover"
                color="inherit"
                sx={{ fontSize: "0.875rem" }}
              >
                X
              </Link>
            </ListItem>
            <ListItem disablePadding sx={{ py: 0.5 }}>
              <Link
                href="#"
                underline="hover"
                color="inherit"
                sx={{ fontSize: "0.875rem" }}
              >
                Facebook
              </Link>
            </ListItem>
            <ListItem disablePadding sx={{ py: 0.5 }}>
              <Link
                href="#"
                underline="hover"
                color="inherit"
                sx={{ fontSize: "0.875rem" }}
              >
                Instagram
              </Link>
            </ListItem>
            <ListItem disablePadding sx={{ py: 0.5 }}>
              <Link
                href="#"
                underline="hover"
                color="inherit"
                sx={{ fontSize: "0.875rem" }}
              >
                Pinterest
              </Link>
            </ListItem>
            <ListItem disablePadding sx={{ py: 0.5 }}>
              <Link
                href="#"
                underline="hover"
                color="inherit"
                sx={{ fontSize: "0.875rem" }}
              >
                Jobs
              </Link>
            </ListItem>
          </List>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Typography
            variant="subtitle1"
            gutterBottom
            sx={{ fontWeight: "bold" }}
          >
            CATEGORIES
          </Typography>
          <List dense disablePadding>
            <ListItem disablePadding sx={{ py: 0.5 }}>
              <Link
                href="#"
                underline="hover"
                color="inherit"
                sx={{ fontSize: "0.875rem" }}
              >
                Armchairs
              </Link>
            </ListItem>
            <ListItem disablePadding sx={{ py: 0.5 }}>
              <Link
                href="#"
                underline="hover"
                color="inherit"
                sx={{ fontSize: "0.875rem" }}
              >
                Bath Room
              </Link>
            </ListItem>
            <ListItem disablePadding sx={{ py: 0.5 }}>
              <Link
                href="#"
                underline="hover"
                color="inherit"
                sx={{ fontSize: "0.875rem" }}
              >
                Dining Chairs
              </Link>
            </ListItem>
            <ListItem disablePadding sx={{ py: 0.5 }}>
              <Link
                href="#"
                underline="hover"
                color="inherit"
                sx={{ fontSize: "0.875rem" }}
              >
                Dining Tables
              </Link>
            </ListItem>
            <ListItem disablePadding sx={{ py: 0.5 }}>
              <Link
                href="#"
                underline="hover"
                color="inherit"
                sx={{ fontSize: "0.875rem" }}
              >
                Living Room
              </Link>
            </ListItem>
          </List>
        </Grid>
      </Container>

      <Divider />

      <Container maxWidth="lg" sx={{ pt: "10px" }}>
        <Grid
          container
          sx={{
            justifyContent: {
              md: "space-between",
              xs: "center",
            },
          }}
        >
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: {
                xs: "column",
                md: "row",
              },
            }}
          >
            <Typography
              variant="body2"
              sx={{ opacity: "0.5", textAlign: "center" }}
            >
              © 2021 Funio Furniture Store
            </Typography>
            <List sx={{ display: "flex" }}>
              <ListItem>
                <Link href="" variant="body2" sx={{ textDecoration: "none" }}>
                  PRIVACY
                </Link>
              </ListItem>
              <ListItem>
                <Link href="" variant="body2" sx={{ textDecoration: "none" }}>
                  TERMS
                </Link>
              </ListItem>
              <ListItem>
                <Link href="" variant="body2" sx={{ textDecoration: "none" }}>
                  ProMO
                </Link>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <img src={pay} width="300px" alt="Payment Options" />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default MainFooter;
