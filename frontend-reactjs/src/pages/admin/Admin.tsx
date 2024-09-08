import { APIURL, http } from "@/assets/http";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { Button, CircularProgress } from "@nextui-org/react";
import { useEffect, useState } from "react";
import Users from "./components/Users";
import Products from "./components/Products";
import Orders from "./components/Orders";
import AddProduct from "../addProduct/AddProduct";

export default function Admin() {
  const [isAdmin, setAdmin] = useState(false);
  const [isUsersComponentActive, setUsersComponentActive] = useState(false);
  const [isProductsComponentActive, setProductsComponentActive] =
    useState(false);
  const [isOrdersComponentActive, setOrdersComponentActive] = useState(false);
  const [isAddProductComponentActive, setAddProductComponentActive] =
    useState(false);

  useEffect(() => {
    const handleGetMe = async () => {
      try {
        const response = await http.get(`${APIURL}/accounts/getme`);
        console.log(response.data);

        if (response.data.role === "ROLE_ADMIN") {
          setAdmin(true);
        }
      } catch (error) {
        console.log(error);
      }
    };

    handleGetMe();
  }, []);

  const handleUser = () => {
    setAddProductComponentActive(false);

    setUsersComponentActive(true);
    setProductsComponentActive(false);
    setOrdersComponentActive(false);
  };

  const handleProducts = () => {
    setAddProductComponentActive(false);
    setUsersComponentActive(false);
    setProductsComponentActive(true);
    setOrdersComponentActive(false);
  };

  const handleOrders = () => {
    setAddProductComponentActive(false);

    setUsersComponentActive(false);
    setProductsComponentActive(false);
    setOrdersComponentActive(true);
  };
  const handleAddProduct = () => {
    setAddProductComponentActive(true);

    setUsersComponentActive(false);
    setProductsComponentActive(false);
    setOrdersComponentActive(false);
  };

  if (!isAdmin) {
    return (
      <div>
        <Navigation />
        <div className="grid place-items-center h-screen">
          <CircularProgress size="lg" />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <div className="p-10 m-20 bg-[#F6F6F6] rounded-xl ">
        <div className="flex flex-row gap-10 ">
          <h1 className="text-3xl font-sfpro font-bold">Admin Menu</h1>
          <Button color="primary" onClick={handleUser}>
            Users
          </Button>
          <Button color="success" onClick={handleProducts}>
            Products
          </Button>
          <Button onClick={handleAddProduct} color="secondary">
            Add Product
          </Button>
          <Button color="warning" onClick={handleOrders}>
            Orders
          </Button>
        </div>
        <div>
          {isUsersComponentActive && <Users />}
          {isProductsComponentActive && <Products />}
          {isOrdersComponentActive && <Orders />}
          {isAddProductComponentActive && <AddProduct />}
        </div>
      </div>
    </div>
  );
}
