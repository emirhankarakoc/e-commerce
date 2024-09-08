import Navigation from "@/components/Navigation";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import User from "./components/User";
import Addresses from "./components/Adresses";
import { APIURL, http } from "@/assets/http";
import Admin from "../admin/Admin";

export default function Profile() {
  const { menu } = useParams();
  const [activeComponent, setActiveComponent] = useState<string>("user");
  const [user, setUser] = useState<User>();

  useEffect(() => {
    setActiveComponent(menu || "user");
  }, [menu]);

  useEffect(() => {
    const handleGetMe = async () => {
      try {
        const response = await http.get(`${APIURL}/accounts/getme`);
        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    handleGetMe();
  }, []);

  const handleOpenUserComponent = () => setActiveComponent("user");
  const handleOpenAddressesComponent = () => setActiveComponent("addresses");
  const handleOpenOrdersComponent = () => setActiveComponent("orders");
  const handleOpenAdminMenuComponent = () => setActiveComponent("admin");

  return (
    <div>
      <Navigation />
      <div>
        <div
          className={`justify-between flex mx-32 py-10  border-3 px-10 rounded-3xl mb-10
          ${activeComponent === "user" ? " border-green-500" : null}
          ${activeComponent === "addresses" ? " border-purple-500" : null}
          ${activeComponent === "orders" ? " border-blue-500" : null}
           ${
             user?.role === "ROLE_ADMIN" && activeComponent === "admin"
               ? " border-red-500"
               : null
           }`}
        >
          <Button
            onClick={handleOpenUserComponent}
            className={`       
          ${activeComponent === "user" ? " bg-green-500" : null}
          ${activeComponent === "addresses" ? " bg-gray-400" : null}
          ${activeComponent === "orders" ? " bg-gray-400" : null}
          ${activeComponent === "admin" ? " bg-gray-400" : null}`}
          >
            User
          </Button>
          <Button
            onClick={handleOpenAddressesComponent}
            className={`       
          ${activeComponent === "user" ? " bg-gray-400" : null}
          ${activeComponent === "addresses" ? " bg-purple-500" : null}
          ${activeComponent === "orders" ? " bg-gray-400" : null}  
          ${activeComponent === "admin" ? " bg-gray-400" : null}`}
          >
            Addresses
          </Button>
          <Button
            onClick={handleOpenOrdersComponent}
            className={`       
           ${activeComponent === "user" ? " bg-gray-400" : null}
            ${activeComponent === "addresses" ? " bg-gray-400" : null}
            ${activeComponent === "orders" ? " bg-blue-500" : null}
            ${activeComponent === "admin" ? " bg-gray-400" : null}`}
          >
            Orders
          </Button>

          {user?.role === "ROLE_ADMIN" ? (
            <Button
              onClick={handleOpenAdminMenuComponent}
              className={`       
           ${activeComponent === "user" ? " bg-gray-400" : null}
           ${activeComponent === "admin" ? " bg-red-400" : null}
            ${activeComponent === "addresses" ? " bg-gray-400" : null}
            ${activeComponent === "orders" ? " bg-gray-500" : null}`}
            >
              Admin Menu
            </Button>
          ) : null}
        </div>
        {activeComponent === "user" && <User />}
        {activeComponent === "addresses" && <Addresses />}
        {activeComponent === "orders" && <Orders />}
        {activeComponent === "admin" && <Admin />}
      </div>
    </div>
  );
}

function Orders() {
  return <div>Orders</div>;
}
