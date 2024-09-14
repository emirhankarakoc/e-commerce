import { APIURL, http } from "@/assets/http";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { Button, CircularProgress } from "@nextui-org/react";
import { useEffect, useState } from "react";
import Users from "./components/Users";
import Products from "./components/Products";
import Orders from "./components/Orders";
import AddProduct from "../addProduct/AddProduct";
import { ShippingMethods } from "./components/ShippingMethods";

export default function Admin() {
  const [isAdmin, setAdmin] = useState(false);
  const [isUsersComponentActive, setUsersComponentActive] = useState(false);
  const [isProductsComponentActive, setProductsComponentActive] =
    useState(false);

  const [isShippingComponentActive, setShippingComponentActive] =
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
    setUsersComponentActive(true);
    setProductsComponentActive(false);
    setShippingComponentActive(false);
  };

  const handleProducts = () => {
    setUsersComponentActive(false);
    setProductsComponentActive(true);
    setShippingComponentActive(false);
  };

  const handleShippingMethods = () => {
    setUsersComponentActive(false);
    setProductsComponentActive(false);
    setShippingComponentActive(true);
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
      <h1 className=" grid place-items-center text-3xl font-sfpro font-bold ">
        Admin Menu
      </h1>

      <div className="p-10  bg-[#F6F6F6]  border-3 mx-32 border-red-500 rounded-3xl">
        <div className="flex justify-between   ">
          <Button color="primary" onClick={handleUser}>
            Users
          </Button>
          <Button color="success" onClick={handleProducts}>
            Products
          </Button>
          <Button color="danger" onClick={handleShippingMethods}>
            Shipping Methods
          </Button>

          <Button
            color="secondary"
            onClick={() => {
              window.location.href = "/admin/smartphones/new";
            }}
          >
            Add Product
          </Button>
          <Button
            color="warning"
            onClick={() => {
              window.location.href = "/admin/orders";
            }}
          >
            Orders
          </Button>
        </div>
      </div>
      <div className="mx-32">
        {isUsersComponentActive && <Users />}
        {isProductsComponentActive && <Products />}
        {isShippingComponentActive && <ShippingMethods />}
      </div>
    </div>
  );
}
