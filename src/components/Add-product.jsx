import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductService from "../services/product";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { TextField } from "@material-ui/core";

const AddProduct = () => {
  const [categories, setCategories] = useState();
  const [categoryId, setCategoryId] = useState("");
  const [form, setForm] = useState({
    title: "",
    price: 0,
    description: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const handleCategoryChange = (event) => {
    setCategoryId(event.target.value);
  };
  const navigate = useNavigate();
  const productService = new ProductService();

  const validateForm = () => {
    const errors = {};
    if (!form.title) {
      errors.title = "Title is required";
    }
    if (!form.price) {
      errors.price = "Price is required";
    }
    if (!form.description) {
      errors.description = "Description is required";
    }
    if (!categoryId) {
      errors.categoryId = "Category is required";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAdd = async () => {
    if (validateForm()) {
      try {
        form.categoryId = categoryId;
        form.images = [
          "https://miro.medium.com/v2/resize:fit:2000/1*y6C4nSvy2Woe0m7bWEn4BA.png",
        ];
        await productService.createProduct(form);
        navigate(`/`);
      } catch (e) {
        console.warn(e);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await productService.getCategories();
      setCategories(data);
    };
    fetchData();
  }, []);

  const updateField = ({ name, value }) => {
    {
      console.log(value);
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  if (form === null) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="div-card">
        <Card className="add-product-card">
          <CardContent>
            <Typography
              gutterBottom
              variant="h4"
              style={{ textAlign: "center" }}
            >
              <b> Add a product</b>
            </Typography>

            <form className="ProductEdit">
              <TextField
                id="filled-basic"
                label="Title"
                variant="filled"
                title="title"
                name="title"
                value={form.title}
                onChange={({ target }) => updateField(target)}
                error={!!formErrors.title}
                helperText={formErrors.title}
                required
              />

              <TextField
                id="filled-basic"
                label="Price"
                variant="filled"
                name="price"
                value={form.price}
                error={!!formErrors.price}
                helperText={formErrors.price}
                required
                onChange={({ target }) =>
                  updateField({
                    name: target.name,
                    value: parseInt(target.value, 10),
                  })
                }
              />
              <TextField
                id="filled-basic"
                label="Description"
                variant="filled"
                title="description"
                name="description"
                value={form.description}
                onChange={({ target }) => updateField(target)}
                error={!!formErrors.description}
                helperText={formErrors.description}
                required
              />

              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  label="Category"
                  value={categoryId}
                  name="categoryId"
                  onChange={handleCategoryChange}
                  error={!!formErrors.categoryId}
                  helperText={formErrors.categoryId}
                  required
                >
                  {categories?.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </form>
          </CardContent>
          <div className="buttons">
            <Button
              variant="contained"
              className="productEdit-btn"
              onClick={handleAdd}
            >
              Add a product
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
};

export default AddProduct;
