import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TablePagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField, // Import TextField cho ô tìm kiếm
} from "@mui/material";
import {
  createProduct,
  getCategory,
  getProducts,
  updateProduct,
} from "../../features/productSlice";
import { deleteProduct } from "../../features/adminSlice";
import FormProvider from "../form/FormProvider";
import FTextField from "../form/FTextField";
import { useForm } from "react-hook-form";
import FUploadImage from "../form/FUploadImage";
import { toast } from "react-toastify";

function ProductsSetting() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const categories = useSelector((state) => state.product.categories);
  const [open, setOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const sort = "default";
  const defaultValues = {
    name: "",
    price: "",
    item_id: "",
    old_price: "",
    description: "",
    image_url: "",
    category: "",
  };

  const methods = useForm({
    defaultValues,
  });

  const { handleSubmit, reset, setValue } = methods;

  useEffect(() => {
    dispatch(getProducts(sort));
    dispatch(getCategory());
  }, [dispatch]);

  const handleDeleteProduct = (productId) => {
    dispatch(deleteProduct(productId));
    toast.success("Delete Product Success");
  };

  const handleOpenModal = (product) => {
    if (product) {
      setEditingProductId(product._id);
      reset({
        name: product.name,
        price: product.price,
        item_id: product.item_id,
        old_price: product.old_price,
        description: product.description,
        image_url: product.image_url,
        category: product.category._id,
      });
      setSelectedCategory(product.category._id);
    } else {
      reset(defaultValues);
      setEditingProductId(null);
      setSelectedCategory("");
    }
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          "image_url",
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  const onSubmit = async (data) => {
    const productData = {
      ...data,
      category: selectedCategory,
    };
    if (editingProductId) {
      toast.success("Update Product Success");
      dispatch(updateProduct(editingProductId, productData));
    } else {
      toast.success("Create Product Success");
      dispatch(createProduct(productData));
    }
    handleCloseModal();
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - products.length) : 0;

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Box sx={{ mb: 2 }}>
        <TextField
          label="Search Products"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>
      <Box sx={{ mb: 2 }}>
        <Button
          variant="contained"
          onClick={() => handleOpenModal()}
          sx={{ mr: 2 }}
        >
          Create Product
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Old Price</TableCell>
              <TableCell>Item Id</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Popularity</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? filteredProducts.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : filteredProducts
            ).map((product) => (
              <TableRow key={product._id}>
                <TableCell>{product._id}</TableCell>
                <TableCell>{product?.category?.name}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>
                  <img
                    src={product.image_url}
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "contain",
                    }}
                    alt={product.name}
                  />
                </TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>{product.old_price}</TableCell>
                <TableCell>{product.item_id}</TableCell>
                <TableCell>{product.rating}</TableCell>
                <TableCell>{product.popularity}</TableCell>
                <TableCell>
                  <Box
                    sx={{ display: "flex", gap: 2, flexDirection: "column" }}
                  >
                    <Button
                      variant="contained"
                      onClick={() => handleOpenModal(product)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => handleDeleteProduct(product._id)}
                    >
                      Delete
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={10} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredProducts.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Modal for editing product */}
      <Dialog open={open} onClose={handleCloseModal} fullWidth>
        <DialogTitle>
          {editingProductId ? "Edit Product" : "Create Product"}
        </DialogTitle>
        <DialogContent>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: 3,
                mt: "20px",
              }}
            >
              <FTextField name="name" label="Product name" fullWidth />
              <FTextField name="price" label="Price" fullWidth />
              <FTextField name="old_price" label="Old Price" fullWidth />
              <FTextField name="item_id" label="SKU" fullWidth />
              <FTextField name="description" label="description" fullWidth />
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  label="Category"
                  value={selectedCategory}
                  onChange={(event) => {
                    setSelectedCategory(event.target.value);
                    setValue("category", event.target.value);
                  }}
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat._id} value={cat._id}>
                      {cat.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Typography textAlign="center">Change Image</Typography>
            <FUploadImage
              name="image_url"
              accept="image/*"
              maxSize={3145728}
              onDrop={handleDrop}
            />
            <DialogActions>
              <Button onClick={handleCloseModal}>Cancel</Button>
              <Button type="submit" variant="contained">
                {editingProductId ? "Update" : "Create"}
              </Button>
            </DialogActions>
          </FormProvider>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ProductsSetting;
