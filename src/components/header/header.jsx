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
import "../header/header.css";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isAdmin, setIsAdmin] = React.useState(true);

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
        width: "20ch",
      },
    },
  }));

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
              upGrad E-Shop
            </Typography>
            {isLoggedIn ? (
              <>
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ "aria-label": "search" }}
                  />
                </Search>
                <Box sx={{ flexGrow: 1 }} />
              </>
            ) : (
              ""
            )}
            {isLoggedIn ? (
              <>
                <Link href="/products" sx={{ mr: 2, ...LinkStyles }}>
                  Home
                </Link>
                {isAdmin ? (
                  <Link sx={{ mr: 2, ...LinkStyles }}>Add Product</Link>
                ) : (
                  ""
                )}
                <Button variant="contained" sx={{ backgroundColor: "#f50157" }}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/signin" sx={{ mr: 2, ...LinkStyles }}>
                  Login
                </Link>
                <Link href="/signup" sx={LinkStyles}>
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
