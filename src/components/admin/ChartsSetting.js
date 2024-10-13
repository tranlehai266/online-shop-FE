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
import CategoryIcon from "@mui/icons-material/Category";
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
    { month: "Jan", count: 2, totalAmount: 100 },
    { month: "Feb", count: 1, totalAmount: 50 },
    { month: "March", count: 5, totalAmount: 1135 },
    { month: "Apr", count: 3, totalAmount: 500 },
    { month: "May", count: 6, totalAmount: 800 },
    { month: "Jun", count: 2, totalAmount: 300 },
    { month: "Jul", count: 10, totalAmount: 1200 },
    { month: "Aug", count: 2, totalAmount: 250 },
    { month: "Sep", count: 5, totalAmount: 837 },
    { month: "Oct", count: 0, totalAmount: 0 },
    { month: "Nov", count: 0, totalAmount: 0 },
    { month: "Dec", count: 0, totalAmount: 0 },
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
      <Box mb={2} display="flex" justifyContent="center">
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
        <LineChart
          width={1200}
          height={500}
          data={defaultChartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            strokeWidth={3}
            dataKey="count"
            stroke="#8884d8"
          />
          <Line
            type="monotone"
            strokeWidth={3}
            dataKey="totalAmount"
            stroke="#82ca9d"
          />
        </LineChart>
      </Box>
    </Container>
  );
}

export default ChartsSetting;
