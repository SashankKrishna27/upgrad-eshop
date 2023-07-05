import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CopyrightIcon from "@mui/icons-material/Copyright";
import { Button } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Link, useNavigate } from "react-router-dom";
import "../signup/signup.css";

export default function Signup() {
  const [showConfirmationSnackbar, setShowConfirmationSnackbar] =
    React.useState(false);
  const [password, setPassword] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [emailAddress, setEmailAddress] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [contactNumber, setContactNumber] = React.useState("");
  const navigate = useNavigate();
  const signUp = () => {
    let users = localStorage.getItem("eshop_users");
    if (users) {
      users = JSON.parse(users);
    } else {
      users = [];
    }
    users.push({
      firstName,
      lastName,
      emailAddress,
      password,
      confirmPassword,
      contactNumber,
    });
    localStorage.setItem("eshop_users", JSON.stringify(users));
    setShowConfirmationSnackbar(true);
    setTimeout(() => {
      navigate("/signin");
    }, 1000);
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <>
      <div className="form">
        <Typography variant="h6" component="h6" align="center">
          <div className="icon-container">
            <LockOutlinedIcon />
          </div>
          <div>Sign up</div>
        </Typography>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": {
              mt: 1,
              mb: 1.5,
              width: "35ch",
              maxWidth: "100%",
            },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              required
              id="outlined-required"
              label="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              required
              id="outlined-required"
              label="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <TextField
              required
              id="outlined-required"
              label="Email Address"
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
            />
            <TextField
              required
              id="outlined-password-input"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              required
              id="outlined-confirm-password-input"
              label="Confirm Passowrd"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <TextField
              required
              id="outlined-number-input"
              label="Contact Number"
              type="tel"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
            />
          </div>
          <Button
            fullWidth
            variant="contained"
            sx={{ backgroundColor: "#3f51b5" }}
            onClick={() => signUp()}
          >
            Sign up
          </Button>
          <div className="has-account-text">
            <Link to={"/signin"} key={new Date()}>
              Already have an account ? Sign in
            </Link>
          </div>
          <div className="copyright-text">
            Copyright <CopyrightIcon />
            <a href="https://www.upgrad.com">upGrad</a>&nbsp;2023
          </div>
          <Snackbar open={showConfirmationSnackbar} autoHideDuration={6000}>
            <Alert severity="success" sx={{ width: "100%" }}>
              User Signed Up Successfully
            </Alert>
          </Snackbar>
        </Box>
      </div>
    </>
  );
}
