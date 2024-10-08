import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/homepage/Homepage";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Smartphones from "./pages/smartphones/Smartphones";
import ProductDetails from "./pages/product-details/ProductDetails";
import Cart from "./pages/cart/Cart";
import Admin from "./pages/admin/Admin";
import AddProduct from "./pages/addProduct/AddProduct";
import Checkout from "./pages/checkout/Checkout";
import { OrderPage } from "./pages/orderPage/OrderPage";
import { ProductUpdate } from "./pages/productupdate/ProductUpdate";
import { Halilpage } from "./pages/halilpage/Halilpage";
import { AdminOrderListPage } from "./pages/adminorder/AdminOrderListPage";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/smartphones" element={<Smartphones />} />
      <Route path="/smartphones/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/orders/:orderId" element={<OrderPage />} />

      <Route path="/admin" element={<Admin />} />
      <Route path="/admin/smartphones/:productId" element={<Halilpage />} />
      <Route path="/admin/orders" element={<AdminOrderListPage />} />

      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/profile/:menu" element={<Profile />} />

      {/* <Route path="/profile/:id" element={<Profile />} /> */}
    </Routes>
  );
}

export default App;
