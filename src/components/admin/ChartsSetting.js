import React, { useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import { useDispatch, useSelector } from "react-redux";
import { getChartData } from "../../features/adminSlice";
import { Container, Typography, Box, Card, CardContent } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import StoreIcon from "@mui/icons-material/Store";
import CategoryIcon from '@mui/icons-material/Category';
import { getCategory, getProducts } from "../../features/productSlice";

function ChartsSetting() {
  const dispatch = useDispatch();
  const chartData = useSelector((state) => state.admin.chart);
  const users = useSelector((state) => state.admin.users);
  const products = useSelector((state) => state.product.products);
  const categories = useSelector((state) => state.product.categories);

  const totalUsers = users.length;
  const totalProducts = products.length;
  const totalCategories = categories.length;

  useEffect(() => {
    dispatch(getChartData());
    dispatch(getProducts());
    dispatch(getCategory());
  }, [dispatch]);

  const defaultChartData = [
    { month: "2024-01", count: 2, totalAmount: 100 },
    { month: "2024-02", count: 1, totalAmount: 50 },
    { month: "2024-03", count: 5, totalAmount: 2100 },
    { month: "2024-04", count: 3, totalAmount: 500 },
    { month: "2024-05", count: 6, totalAmount: 800 },
    { month: "2024-06", count: 2, totalAmount: 300 },
    { month: "2024-07", count: 10, totalAmount: 5000 },
    { month: "2024-08", count: 2, totalAmount: 250 },
    { month: "2024-09", count: 5, totalAmount: 2000 },
    { month: "2024-10", count: 0, totalAmount: 0 },
    { month: "2024-11", count: 0, totalAmount: 0 },
    { month: "2024-12", count: 0, totalAmount: 0 },
  ];

  chartData.forEach((data) => {
    const currentMonth = data.month;
    const monthData = defaultChartData.find(
      (item) => item.month === currentMonth
    );

    if (monthData) {
      monthData.count = data.count;
      monthData.totalAmount = data.totalAmount;
    }
  });

  return (
    <Container>
      <Box mb={2} display="flex">
        <Card
          sx={{
            minWidth: 150,
            maxWidth: 150,
            borderRadius: 2,
            boxShadow: 3,
            height: "150px",
            textAlign: "center",
            mr: "30px",
          }}
        >
          <CardContent>
            <Typography variant="h6" component="div">
              Users
            </Typography>
            <PersonIcon sx={{ fontSize: "50px", color: "#3f51b5" }} />
            <Typography variant="h6" color="text.secondary">
              {totalUsers}
            </Typography>
          </CardContent>
        </Card>

        <Card
          sx={{
            minWidth: 150,
            maxWidth: 150,
            borderRadius: 2,
            boxShadow: 3,
            textAlign: "center",
            height: "150px",
          }}
        >
          <CardContent>
            <Typography variant="h6" component="div">
              Products
            </Typography>
            <StoreIcon sx={{ fontSize: "50px", color: "#3f51b5" }} />
            <Typography variant="h6" color="text.secondary">
              {totalProducts}
            </Typography>
          </CardContent>
        </Card>

        <Card
          sx={{
            minWidth: 150,
            maxWidth: 150,
            borderRadius: 2,
            boxShadow: 3,
            textAlign: "center",
            height: "150px",
            ml: "30px",
          }}
        >
          <CardContent>
            <Typography variant="h6" component="div">
              Categories
            </Typography>
            <CategoryIcon sx={{ fontSize: "50px", color: "#3f51b5" }} />
            <Typography variant="h6" color="text.secondary">
              {totalCategories}
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <Typography variant="h6" align="center" gutterBottom>
        Statistical Chart
      </Typography>
      <Box display="flex" alignItems="center">
        <LineChart width={600} height={300} data={defaultChartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="linear" dataKey="count" stroke="#8884d8" />
          <Line type="linear" dataKey="totalAmount" stroke="#82ca9d" />
        </LineChart>
      </Box>
    </Container>
  );
}

export default ChartsSetting;
