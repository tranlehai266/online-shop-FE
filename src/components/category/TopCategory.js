import React, { useEffect, useState } from "react";
import apiService from "../../app/apiService";
import { Card, CardMedia, CardContent, Typography, Stack } from "@mui/material";
import Grid from "@mui/material/Grid2";

function TopCategory() {
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiService.get("/categories");
        console.log(response.data.data);
        setCategories(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();
  }, []);

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

      <Grid container spacing={3} padding={3} justifyContent="center">
        {categories &&
          categories.map((category) => (
            <Grid item xs={12} sm={6} md={3} lg={3} key={category._id}>
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
