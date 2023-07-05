import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import { Link } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import CartIcon from "@mui/icons-material/ShoppingCart";
import store from "../../reducers/store";
import "../header/header.css";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "35ch",
    },
  },
}));

const handleRoute = (route) => {
  if (route === "signin") localStorage.removeItem("eshop_user");
};

const handleSearch = (value) => {
  store.dispatch({ type: "searchString", value: value });
};

export default function Header() {
  const user = localStorage.getItem("eshop_user");
  const [isLoggedIn, setIsLoggedIn] = React.useState(user);
  const [isAdmin, setIsAdmin] = React.useState(false);

  const LinkStyles = {
    color: "#FFF",
    textDecorationColor: "#FFF",
    cursor: "pointer",
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: "#3f51b5" }}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
            >
              <CartIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Upgrad E-Shop
            </Typography>
            {isLoggedIn ? (
              <>
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    id="input-with-icon-textfield"
                    label="TextField"
                    variant="standard"
                    placeholder="Search…"
                    inputProps={{ "aria-label": "search" }}
                    value={store.searchString}
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                </Search>
                <Box sx={{ flexGrow: 1 }} />
              </>
            ) : (
              ""
            )}
            {isLoggedIn ? (
              <>
                <Link
                  href="/products"
                  sx={{ mr: 2, ...LinkStyles }}
                  onClick={() => handleRoute("products")}
                >
                  Home
                </Link>
                {isAdmin ? (
                  <Link sx={{ mr: 2, ...LinkStyles }}>Add Product</Link>
                ) : (
                  ""
                )}
                <Button
                  href="/signin"
                  variant="contained"
                  sx={{ backgroundColor: "#f50157" }}
                  onClick={() => handleRoute("signin")}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link
                  href="/signin"
                  sx={{ mr: 2, ...LinkStyles }}
                  onClick={() => handleRoute("signin")}
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  sx={LinkStyles}
                  onClick={() => handleRoute("signup")}
                >
                  Signup
                </Link>
              </>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
