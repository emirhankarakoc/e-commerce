import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/homepage/Homepage";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Smartphones from "./pages/smartphones/Smartphones";
import ProductDetails from "./pages/product-details/ProductDetails";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/smartphones" element={<Smartphones />} />
      <Route path="/smartphones/:id" element={<ProductDetails />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      {/* <Route path="/profile/:id" element={<Profile />} /> */}
    </Routes>
  );
}

export default App;
