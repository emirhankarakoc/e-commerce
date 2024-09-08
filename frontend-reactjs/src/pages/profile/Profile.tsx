import Navigation from "@/components/Navigation";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import User from "./components/User";
import Addresses from "./components/Adresses";

export default function Profile() {
  const { menu } = useParams();
  const [activeComponent, setActiveComponent] = useState<string>("user");

  useEffect(() => {
    setActiveComponent(menu || "user");
  }, [menu]);

  const handleOpenUserComponent = () => setActiveComponent("user");
  const handleOpenAddressesComponent = () => setActiveComponent("addresses");
  const handleOpenOrdersComponent = () => setActiveComponent("orders");

  return (
    <div>
      <Navigation />
      <div>
        <div className="justify-between flex mx-32 py-10 border-gray-400  border-1 px-10 rounded-3xl mb-10">
          <Button onClick={handleOpenUserComponent} className="bg-green-400">
            User
          </Button>
          <Button onClick={handleOpenAddressesComponent} color="secondary">
            Addresses
          </Button>
          <Button onClick={handleOpenOrdersComponent} color="primary">
            Orders
          </Button>
        </div>
        {activeComponent === "user" && <User />}
        {activeComponent === "addresses" && <Addresses />}
        {activeComponent === "orders" && <Orders />}
      </div>
    </div>
  );
}

function Orders() {
  return <div>Orders</div>;
}
