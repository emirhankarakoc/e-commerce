import { APIURL, http, httpError } from "@/assets/http";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { Divider } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import Shipping from "./components/Shipping";
import Payment from "./components/Payment";
import Address from "./components/Adress";

export default function Checkout() {
  const [activeState, setActiveState] = useState<string>("Address");
  const [selectedAdressId, setAdressId] = useState<string | undefined>();
  const [selectedShippingId, setShippingId] = useState<string | undefined>();

  return (
    <div>
      <Navigation />

      <div className="w-full mt-10 grid grid-cols-3 place-items-center">
        <div className="col-span-1">
          <button
            onClick={() => setActiveState("Address")}
            className={`w-full text-center p-2 ${activeState === "Address" ? "text-black" : "text-gray-500"}`}
          >
            <div className="grid grid-cols-3 justify-center">
              <div className="col-span-1 grid place-items-center">
                <i className="fa-solid fa-location-dot"></i>
              </div>
              <div className="col-span-2 items-start flex flex-col">
                <h4 className="text-sm font-bold">Step 1</h4>
                <p className="text-xl">Address</p>
              </div>
            </div>
          </button>
        </div>
        <div className="col-span-1">
          <button
            onClick={() => setActiveState("Shipping")}
            className={`w-full text-center p-2 ${activeState === "Shipping" ? "text-black" : "text-gray-500"}`}
          >
            <div className="grid grid-cols-3 justify-center">
              <div className="col-span-1 grid place-items-center">
                <i className="fa-solid fa-dolly"></i>
              </div>
              <div className="col-span-2 items-start flex flex-col">
                <h4 className="text-sm font-bold">Step 2</h4>
                <p className="text-xl">Shipping</p>
              </div>
            </div>
          </button>
        </div>
        <div className="col-span-1">
          <button
            onClick={() => setActiveState("Payment")}
            className={`w-full text-center p-2 ${activeState === "Payment" ? "text-black" : "text-gray-500"}`}
          >
            <div className="grid grid-cols-3 justify-center">
              <div className="col-span-1 grid place-items-center">
                <i className="fa-solid fa-credit-card"></i>
              </div>
              <div className="col-span-2 items-start flex flex-col">
                <h4 className="text-sm font-bold">Step 3</h4>
                <p className="text-xl">Payment</p>
              </div>
            </div>
          </button>
        </div>
      </div>
      <Divider className="my-10" />

      {activeState === "Address" && (
        <Address propAdressId={setAdressId} setActiveState={setActiveState} />
      )}

      {activeState === "Shipping" && (
        <Shipping
          propShippingId={setShippingId}
          setActiveState={setActiveState}
        />
      )}

      {activeState === "Payment" && (
        <Payment
          addressId={selectedAdressId}
          shippingMethodId={selectedShippingId}
        />
      )}

      <Footer />
    </div>
  );
}
