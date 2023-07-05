import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/header/header";
import Signup from "./components/signup/signup";
import Signin from "./components/signin/signin";
import Order from "./components/order/order";
import Products from "./components/products/products";
import ProductInfo from "./components/productInfo/productInfo";
import store from "./reducers/store";
import { Provider } from "react-redux";

function App() {
  return (
    <>
    <Provider store={store}>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/"></Route>
          <Route path="/signin" element={<Signin />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/products" element={<Products />}></Route>
          <Route path="/productInfo/:id" element={<ProductInfo />}></Route>
          <Route path="/order" element={<Order />}></Route>
        </Routes>
      </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
