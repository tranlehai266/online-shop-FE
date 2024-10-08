import React, { useEffect } from "react";
import { Card, CardMedia, CardContent, Typography, Stack } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../../features/productSlice";
import { useNavigate } from "react-router-dom";

function TopCategory() {
  const categories = useSelector((state) => state.product.categories);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  return (
    <Stack>
      <Grid
        container
        xs={12}
        display="flex"
        justifyContent="center"
        padding="25px"
      >
        <Typography variant="h4" textAlign="center">
          Top categories
        </Typography>
      </Grid>

      <Grid container spacing={5} padding={3} justifyContent="center">
        {categories &&
          categories.map((category) => (
            <Grid item="true" xs={12} sm={6} md={3} lg={3} key={category._id}>
              <Card
                sx={{
                  borderRadius: 2,
                  boxShadow: 3,
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: 6,
                    cursor: "pointer",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  sx={{ height: "300px", width: "430px" }}
                  image={category.images}
                  alt={category.name}
                  onClick={() => navigate(`/product-category/${category._id}`)}
                />
                <CardContent>
                  <Typography variant="h6" textAlign="center">
                    {category.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Stack>
  );
}

export default TopCategory;
