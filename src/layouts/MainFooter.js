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
                <IconButton component={Link} href="https://x.com">
                  <XIcon />
                </IconButton>
              </ListItem>
              <ListItem>
                <IconButton component={Link} href="https://www.instagram.com/">
                  <Instagram />
                </IconButton>
              </ListItem>
              <ListItem>
                <IconButton component={Link} href="https://www.facebook.com/">
                  <Facebook />
                </IconButton>
              </ListItem>
              <ListItem>
                <IconButton component={Link} href="https://www.youtube.com/">
                  <YouTube />
                </IconButton>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Container>

      <Divider />

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
