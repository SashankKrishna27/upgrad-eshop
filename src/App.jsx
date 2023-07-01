import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/header/header";
import Signup from "./components/signup/signup";
import Signin from "./components/signin/signin";
import Products from "./components/products/products";

function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/"></Route>
          <Route path="/signin" element={<Signin />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/products" element={<Products />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
