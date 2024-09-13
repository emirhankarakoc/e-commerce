import { http, httpError } from "@/assets/http";
import { Button } from "@nextui-org/button";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface PaymentProps {
  addressId: string;
  shippingMethodId: string;
}

export default function Payment({ addressId, shippingMethodId }: PaymentProps) {
  const [address, setAddress] = useState<Address>();
  const [shipping, setShipping] = useState<ShippingMethod>();
  const [cart, setCart] = useState<Cart>();
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [subtotal, setSubtotal] = useState<number>(0);

  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwtToken");
    const fetchAddress = async () => {
      try {
        const response = await http.get(`/users/addresses/${addressId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        });
        setAddress(response.data);
        console.log(response.data);
      } catch (e) {
        httpError(e);
      }
    };
    const fetchShipping = async () => {
      try {
        const response = await http.get(`/shippingmethods/${shippingMethodId}`);
        setShipping(response.data);
        console.log(response.data);
      } catch (e) {
        httpError(e);
      }
    };
    const fetchCart = async () => {
      try {
        const response = await http.get("/carts/myCart", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        });

        setCart(response.data);
        console.log(response.data);
      } catch (e) {
        httpError(e);
      }
    };
    console.log(shippingMethodId, addressId);

    fetchAddress();
    fetchShipping();
    fetchCart();
  }, [addressId, shippingMethodId]);
  // Separate useEffect to calculate subtotal when cart and shipping are available
  useEffect(() => {
    console.log(
      cart?.summary + "cart summary" + "shopping cost" + shipping?.cost
    );

    if (cart && shipping) {
      const cartSummary = parseFloat(cart.summary); // Remove the dollar sign and parse
      const shippingCost = parseFloat(shipping.cost); // Remove the dollar sign and parse

      const araba = cartSummary + 20 + shippingCost;
      console.log(araba);
      console.log(cartSummary + "cartsummary - shippingcost" + shippingCost);

      setSubtotal(araba);
    }
  }, [cart, shipping]);
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").substring(0, 16);
    let formattedValue = value.replace(/(.{4})/g, "$1 ").trim();
    setCardNumber(formattedValue);
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").substring(0, 4);
    let formattedValue = value.replace(/(.{2})/, "$1/").trim();
    setExpiryDate(formattedValue);
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").substring(0, 3);
    setCvv(value);
  };

  const handleOwnerNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOwnerName(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();

    try {
      const data = await http.post("/orders", {
        shippingTypeId: shippingMethodId,
        addressId: addressId,
        cardOwnerName: ownerName,
        cardNumber: cardNumber,
        expiration: expiryDate,
        cvv: cvv,
      });
      const response = data.data;

      toast.success(response);
    } catch (err) {
      httpError(err);
    }

    console.log("Shipping Method ID:", shippingMethodId);
    console.log("Address ID:", addressId);
    console.log("Cart Details:", cart);
    console.log("Card Number:", cardNumber);
    console.log("Expiry Date:", expiryDate);
    console.log("CVV:", cvv);
    console.log("Card Owner's Name:", ownerName);
    setLoading(false);
    //end
  };

  return (
    <div>
      <div>
        <div className="grid grid-cols-2 gap-10 p-20 px-40">
          <div className="col-span-1 p-10 border-1 rounded-xl">
            <h1 className="font-bold text-3xl font-sfpro">Summary</h1>
            {cart?.items.map((item, index) => (
              <div
                className="p-5 bg-gray-100 grid grid-cols-4 mt-10 rounded-lg"
                key={index}
              >
                <div className="col-span-1 grid place-items-center">
                  <img
                    className="w-20 h-20 "
                    src={item.productImage}
                    alt={item.productName}
                  />
                </div>
                <div className="col-span-2 grid place-items-start">
                  <p>{item.productName}</p>
                  <p>{item.extras}</p>
                </div>
                <div className="col-span-1 grid place-items-center">
                  <p className="font-bold font-sfpro text-2xl">
                    {item.productPrice}
                  </p>
                </div>
              </div>
            ))}

            <div className="py-10">
              <div>
                <h1 className="font-sfpro text-gray-400 text-xl">Address</h1>
              </div>
              <div className="text-black font-sfpro">
                <p>{address?.fullAddress}</p>
              </div>
            </div>

            <div className="py-10">
              <div>
                <h1 className="font-sfpro text-gray-400 text-xl">
                  Shipment Method
                </h1>
              </div>
              <div className="text-black font-sfpro">
                <p>{shipping?.name}</p>
              </div>
            </div>

            <div className="py-5">
              <div className="flex justify-between items-center">
                <div className="font-bold font-sfpro text-lg">Tax:</div>
                <div className="font-bold font-sfpro text-lg text-right">
                  $20
                </div>
              </div>
            </div>

            <div className="py-5">
              <div className="flex justify-between items-center">
                <div className="font-bold font-sfpro text-lg">Shipping:</div>
                <div className="font-bold font-sfpro text-lg text-right">
                  ${shipping?.cost}
                </div>
              </div>
            </div>

            <div className="py-5">
              <div className="flex justify-between items-center">
                <div className="font-bold font-sfpro text-3xl">Subtotal:</div>
                <div className="font-bold font-sfpro text-3xl text-right">
                  ${subtotal}
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-1 p-10">
            <h1 className="font-bold text-3xl font-sfpro">Payment</h1>

            <div className="mt-10 p-5 border rounded-lg">
              <div className="flex flex-col items-center mb-5">
                <div className="relative w-[450px] h-64 bg-[#141414] text-white p-4 rounded-3xl shadow-lg">
                  <div className="absolute top-10 left-10">
                    <i
                      className="fa-solid fa-sd-card fa-rotate-270 fa-2xl"
                      style={{ color: "white" }}
                    ></i>
                  </div>

                  <div className="absolute top-10 left-20">
                    <i
                      className="fa-solid fa-wifi fa-rotate-90 fa-2xl"
                      style={{ color: "white" }}
                    ></i>
                  </div>

                  <div className="absolute top-10 right-10">
                    <i
                      className="fa-brands fa-cc-visa fa-2xl"
                      style={{ color: "white" }}
                    ></i>
                  </div>

                  <div className="absolute top-10 right-20">
                    <i
                      className="fa-brands fa-cc-mastercard fa-2xl"
                      style={{ color: "white" }}
                    ></i>
                  </div>
                  <div className="absolute bottom-24 left-10 text-xl font-bold">
                    {cardNumber || "1234 5678 9123 4567"}
                  </div>

                  <div className="absolute font-bold font-sfpro bottom-16 left-10 text-lg">
                    {ownerName || "JOHN DOE"}
                  </div>

                  <div className="absolute bottom-8 left-10 font-sfpro text-lg font-bold">
                    CVV:{cvv}
                  </div>

                  <div className="absolute bottom-10 right-20 text-lg font-sfpro font-bold">
                    {expiryDate || "MM/YY"}
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="ownerName" className="block text-gray-700">
                    Card Owner's Name
                  </label>
                  <input
                    id="ownerName"
                    type="text"
                    value={ownerName}
                    onChange={handleOwnerNameChange}
                    className="mt-1 p-2 w-full border rounded-lg"
                    placeholder="John Doe"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="cardNumber" className="block text-gray-700">
                    Card Number
                  </label>
                  <input
                    id="cardNumber"
                    type="text"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    className="mt-1 p-2 w-full border rounded-lg"
                    maxLength={19} // For formatted card number with spaces
                    placeholder="1234 5678 9012 3456"
                  />
                </div>

                <div className="flex space-x-4 mb-4">
                  <div className="flex-1">
                    <label htmlFor="expiryDate" className="block text-gray-700">
                      Expiry Date (MM/YY)
                    </label>
                    <input
                      id="expiryDate"
                      type="text"
                      value={expiryDate}
                      onChange={handleExpiryDateChange}
                      className="mt-1 p-2 w-full border rounded-lg"
                      maxLength={5} // For formatted expiry date
                      placeholder="MM/YY"
                    />
                  </div>

                  <div className="flex-1">
                    <label htmlFor="cvv" className="block text-gray-700">
                      CVV
                    </label>
                    <input
                      id="cvv"
                      type="text"
                      value={cvv}
                      onChange={handleCvvChange}
                      className="mt-1 p-2 w-full border rounded-lg"
                      maxLength={3}
                      placeholder="123"
                    />
                  </div>
                </div>

                <Button
                  isLoading={isLoading}
                  type="submit"
                  className="w-full py-2 bg-[#000000] text-white rounded-lg"
                >
                  Pay Now
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
