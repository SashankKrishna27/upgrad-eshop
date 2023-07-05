import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import {
  productsList as products,
  sortOrders,
  categories as categoryList,
} from "../../assets/util";
import store from "../../reducers/store";
import "../products/products.css";

export default function Products() {
  console.log(products);
  const [category, setCategory] = React.useState(-1);
  const [sortBy, setSortBy] = React.useState(-1);
  const [categories, setCategories] = React.useState(categoryList);
  const [sortingOrder, setSortingOrder] = React.useState(sortOrders);
  const [allProducts, setAllProducts] = React.useState(products);

  store.subscribe(() => {
    const storeState = store.getState();
    const searchString = storeState.searchString;
    let newProductsList = JSON.parse(JSON.stringify(products));
    newProductsList = newProductsList.filter((product) =>
      product.name.toUpperCase().includes(searchString.toUpperCase())
    );
    setAllProducts(newProductsList);
  });
  const handleCategoryChange = (event, newCategory) => {
    setCategory(newCategory);
    setTimeout(() => {
      if (newCategory === -1) {
        setAllProducts(products);
      } else {
        const newProductsList = products.filter(
          (item) => item.categoryCodeId === newCategory
        );
        setAllProducts(newProductsList);
      }
    });
  };

  const handleSortChange = (event) => {
    const newSortBy = event.target.value;
    setSortBy(newSortBy);
    setCategory(-1);
    setTimeout(() => {
      if (newSortBy === -1) {
        setAllProducts(allProducts);
      } else {
        let newProductsList = JSON.parse(JSON.stringify(products));
        switch (newSortBy) {
          case 1: {
            newProductsList = newProductsList.sort((a, b) => b.price - a.price);
            break;
          }
          case 2: {
            newProductsList = newProductsList.sort((a, b) => a.price - b.price);
            break;
          }
          case 3: {
            newProductsList = newProductsList.sort(
              (a, b) => a.dateTimeAdded - b.dateTimeAdded
            );
            break;
          }
          default:
            break;
        }
        console.log(newProductsList);
        setAllProducts(newProductsList);
      }
    });
  };

  const handleNavigateToProductInfoPage = (product) => {
    const category = categories?.find(
      (item) => item?.id === product?.categoryCodeId
    );
    product.category = category;
    localStorage.setItem("product_info", JSON.stringify(product));
  };

  return (
    <>
      <div className="products-container">
        <div className="handle-products">
          <div className="toggle-products">
            <ToggleButtonGroup
              sx={{ background: "#d3d3d36e", color: "grey" }}
              value={category}
              exclusive
              onChange={handleCategoryChange}
              aria-label="Categories"
            >
              {categories.map((category, index) => {
                return (
                  <ToggleButton key={index} value={category.id}>
                    {category.name}
                  </ToggleButton>
                );
              })}
            </ToggleButtonGroup>
          </div>
          <div className="sort-products">
            <Box sx={{ minWidth: 200, maxWidth: 200 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={sortBy}
                  label="Sort By"
                  onChange={handleSortChange}
                >
                  {sortingOrder.map((order, index) => {
                    return (
                      <MenuItem key={index} value={order.id}>
                        {order.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
          </div>
          <div className="products">
            {allProducts.map((product, index) => {
              return (
                <Card key={index} sx={{ maxWidth: 345 }}>
                  <CardMedia
                    sx={{ height: 200 }}
                    image={product.imageSrc}
                    title={product.name}
                  />
                  <CardContent sx={{ minHeight: "120px", maxHeight: "120px" }}>
                    <Typography gutterBottom variant="h5" component="div">
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {product.description}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.primary"
                      fontWeight={600}
                      marginTop={1}
                    >
                      ₹ {product.price}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      variant="contained"
                      sx={{ backgroundColor: "#3f51b5" }}
                      href={"/productInfo/" + product.categoryCodeId}
                      onClick={function () {
                        handleNavigateToProductInfoPage(product);
                      }}
                    >
                      Buy
                    </Button>
                  </CardActions>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
