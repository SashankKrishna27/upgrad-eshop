import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CopyrightIcon from "@mui/icons-material/Copyright";
import { Button } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { Link } from "react-router-dom";
import "../signin/signin.css";

export default function Signin() {
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showConfirmationSnackbar, setShowConfirmationSnackbar] =
    React.useState(false);
  const [showFailureSnackbar, setShowFailureSnackbar] = React.useState(false);

  const loginFailed = () => {
    setShowFailureSnackbar(true);
    setUserName("");
    setPassword("");
  };
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const signIn = () => {
    let users = localStorage.getItem("eshop_users");
    users = users ? JSON.parse(users) : [];
    const loggedInUser = users.find((user) => user.emailAddress === userName);
    if (loggedInUser) {
      if (password === loggedInUser.password) {
        setShowConfirmationSnackbar(true);
        localStorage.setItem("eshop_user", JSON.stringify(loggedInUser));
        setTimeout(() => {
            window.location.href = '/products';
        }, 1000);
      } else {
        loginFailed();
      }
    } else {
      loginFailed();
    }
  };

  return (
    <>
      <>
            <div className="form">
                <Typography variant="h6" component="h6" align='center'>
                    <div className="icon-container">
                        <LockOutlinedIcon />
                    </div>
                    <div>Sign in</div>
                </Typography>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { mt: 1, mb: 1.5, width: '35ch', maxWidth: '100%' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <div>
                        <TextField
                            required
                            id="outlined-required"
                            label="Email Address"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                        <TextField
                            required
                            id="outlined-password-input"
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <Button fullWidth variant="contained" sx={{ backgroundColor: '#3f51b5' }} onClick={() => signIn()}>Sign in</Button>
                    <div className="no-account-text">
                        <Link to="/signup">Don't have an account? Sign up </Link>
                    </div>
                    <div className="copyright-text">Copyright <CopyrightIcon /> upGrad 2023</div>
                    <Snackbar open={showConfirmationSnackbar} autoHideDuration={1000}>
                        <Alert severity="success" sx={{ width: '100%' }}>
                            User Logged in Successfully
                        </Alert>
                    </Snackbar>
                    <Snackbar open={showFailureSnackbar} autoHideDuration={1000}>
                        <Alert severity="error" sx={{ width: '100%' }}>
                            Unsuccessful Login Attempt
                        </Alert>
                    </Snackbar>
                </Box>
            </div>
        </>
    </>
  );
}
