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
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  createCategry,
  getCategory,
  updateCategory,
} from "../../features/productSlice";
import { deleteCategory } from "../../features/adminSlice";
import { useForm } from "react-hook-form";
import FormProvider from "../form/FormProvider";
import FTextField from "../form/FTextField";
import FUploadImage from "../form/FUploadImage";

function CategoriesSetting() {
  const [open, setOpen] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.product.categories);

  const defaultValues = {
    name: "",
    images: "",
  };

  const methods = useForm({
    defaultValues,
  });

  const { handleSubmit, reset, setValue } = methods;

  const handleOpenModal = (category) => {
    if (category) {
      setEditingCategoryId(category._id);
      reset({
        name: category.name,
        images: category.images,
      });
    } else {
      reset(defaultValues);
      setEditingCategoryId(null);
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
          "images",
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  const handleDeleteCategory = (categoryId) => {
    dispatch(deleteCategory(categoryId));
  };

  const onSubmit = async (data) => {
    console.log(data)
    if (editingCategoryId) {
      dispatch(updateCategory(editingCategoryId, data));
    } else {
      dispatch(createCategry(data));
    }
    handleCloseModal();
  };

  return (
    <div>
      <Box sx={{ mb: 2 }}>
        <Button
          variant="contained"
          onClick={() => handleOpenModal()}
          sx={{ mr: 2 }}
        >
          Create Category
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category._id}>
                <TableCell>{category._id}</TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell>
                  <img
                    src={category.images}
                    style={{ width: "150px", height: "100px" }}
                    alt={category.name}
                  />
                </TableCell>
                <TableCell>
                  {new Date(category.createdAt).toLocaleString()}
                </TableCell>
                <TableCell>
                  <Box
                    sx={{ display: "flex", gap: 2, flexDirection: "column" }}
                  >
                    <Button
                      variant="contained"
                      onClick={() => handleOpenModal(category)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => handleDeleteCategory(category._id)}
                    >
                      Delete
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleCloseModal} fullWidth>
        <DialogTitle>
          {editingCategoryId ? "Edit Category" : "Create Category"}
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
              <FTextField name="name" label="Category name" fullWidth />
            </Box>
            <Typography textAlign="center">Change Image</Typography>
            <FUploadImage
              name="images"
              accept="image/*"
              maxSize={3145728}
              onDrop={handleDrop}
            />
            <DialogActions>
              <Button onClick={handleCloseModal}>Cancel</Button>
              <Button type="submit" variant="contained">
                {editingCategoryId ? "Update" : "Create"}
              </Button>
            </DialogActions>
          </FormProvider>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CategoriesSetting;
