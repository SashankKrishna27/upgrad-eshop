import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import TextField from '@mui/material/TextField';
import ProductInfo from '../productInfo/productInfo';
import { Button, Typography } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from "react-router-dom";
import '../order/order.css';

const steps = ['Items', 'Select Address', 'Confirm Order'];
export default function Order() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [name, setName] = React.useState('');
  const [contactNumber, setContactNumber] = React.useState('');
  const [street, setStreet] = React.useState('');
  const [city, setCity] = React.useState('');
  const [state, setState] = React.useState('');
  const [landMark, setLandmark] = React.useState('');
  const [zipCode, setZipCode] = React.useState('');
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const navigate = useNavigate();
  const [showConfirmationSnackbar, setShowConfirmationSnackbar] = React.useState(false);
  const changeStep = (increment) => {
    if (increment) {
      setActiveStep(activeStep + 1);
    } else {
      setActiveStep(activeStep - 1);
    }
  };

  const placeOrder = () => {
    setShowConfirmationSnackbar(true);
    setTimeout(() => {
      navigate('/products');
    }, 1000);
  }


  return (
    <>
      <div className='order-container'>
        <Box sx={{ width: '100%' }}>
          <Stepper activeStep={activeStep}>
            {steps.map((item) => {
              return (
                <Step key={item}>
                  <StepLabel>{item}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          <div className='order-content'>
            {activeStep === 0 ? <ProductInfo isOrder={true}></ProductInfo> : activeStep === 1 ? <div className='address-container'>
              <div className="form">
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
                      label="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                      required
                      id="outlined-number-input"
                      label="Contact Number"
                      type="number"
                      value={contactNumber}
                      onChange={(e) => setContactNumber(e.target.value)}
                    />
                    <TextField
                      required
                      id="outlined-required"
                      label="Street"
                      value={street}
                      onChange={(e)=> setStreet(e.target.value)}
                    />
                    <TextField
                      required
                      id="outlined-required"
                      label="City"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                    <TextField
                      required
                      id="outlined-required"
                      label="State"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                    />
                    <TextField
                      id="outlined-required"
                      label="Landmark"
                      value={landMark}
                      onChange={(e) => setLandmark(e.target.value)}
                    />
                    <TextField
                      required
                      id="outlined-number-input"
                      label="Zip Code"
                      type="number"
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                    />
                  </div>
                </Box>
              </div>
            </div> : <div className='order-confirmation'>
              <div className='left-container'>
                <ProductInfo isOrder={true} noImage={true}></ProductInfo>
              </div>
              <div className='right-container'>
                <div className='address'>
                  <Typography variant="h3" component="h3" sx={{ fontWeight: 500 }}>Address</Typography>
                  <div className='address-content'>
                    <div>{name}</div>
                    <div>Contact Number : {contactNumber}</div>
                    <div>{street}</div>
                    <div>{city}</div>
                    <div>{state}</div>
                    <div>{landMark}</div>
                    <div>{zipCode}</div>
                  </div>
                </div>
              </div>
            </div>
            }
            <div className='buttons'>
              {activeStep !== 0 ? <Button variant='text' sx={{ color: '#3f51b5', mr: 1 }} onClick={() => changeStep()}>Back</Button> : ''}
              {activeStep !== steps.length - 1 ? <Button variant='contained' sx={{ backgroundColor: '#3f51b5' }} onClick={() => changeStep(true)}>NEXT</Button> : <Button variant='contained' sx={{ backgroundColor: '#3f51b5' }} onClick={() => placeOrder()}>PLACE ORDER</Button>}
            </div>
          </div>
          <Snackbar open={showConfirmationSnackbar} autoHideDuration={1000}>
            <Alert severity="success" sx={{ width: '100%' }}>
              Order Placed Successfully
            </Alert>
          </Snackbar>
        </Box>
      </div>
    </>
  );
}
