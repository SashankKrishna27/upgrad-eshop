import * as React from "react";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import "../productInfo/productInfo.css";

export default function ProductInfo(props) {
  const [quantity, setQuantity] = React.useState(1);
  
  const productDetailsFromLocal =
  JSON.parse(localStorage.getItem("product_info")) || {};
  console.log("askjxnaskxa", productDetailsFromLocal);

  return (
    <>
      <div className="product-info-container">
        {!props.noImage ? (
          <div className="left-container">
            <img
              src={productDetailsFromLocal?.imageSrc}
              height={300}
              width={300}
              alt=""
            />
            {console.log(productDetailsFromLocal)}
          </div>
        ) : (
          ""
        )}
        <div className="right-container">
          <div className="content">
            <div className="title">{productDetailsFromLocal?.name}</div>
            <div className="quantity">
              <span className="quantity-header">Quantity : </span>
              <span className="quantity-value">{productDetailsFromLocal?.quantity || 1}</span>
            </div>
            <div className="category">
              <span className="category-header">Category : </span>
              <span className="category-value">
                {productDetailsFromLocal?.category?.name}
              </span>
            </div>
            <div className="description">
              <i>{productDetailsFromLocal?.description}</i>
            </div>
            <div className="price">₹ {productDetailsFromLocal?.price}</div>
            {!props?.isOrder ? (
              <TextField
                required
                id="outlined-required"
                label="Enter Quantity"
                type="number"
                value={quantity}
                onChange={(e) => {
                  setQuantity(e.target.value);
                  productDetailsFromLocal.quantity = quantity;
                  localStorage.setItem(
                    "product_info",
                    JSON.stringify(productDetailsFromLocal))
                }}
              />
            ) : (
              ""
            )}
          </div>
          {!props?.isOrder ? (
            <Button
              variant="contained"
              sx={{ backgroundColor: "#3f51b5", mt: 2 }}
              href="/order"
              onClick={() => {
                productDetailsFromLocal.quantity = quantity;
                productDetailsFromLocal.price = productDetailsFromLocal?.price * quantity;
                console.log("product", productDetailsFromLocal);
                localStorage.setItem(
                  "product_info",
                  JSON.stringify(productDetailsFromLocal)
                );
              }}
            >
              PLACE ORDER
            </Button>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}
