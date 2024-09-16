import { http, httpError } from "@/assets/http";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardBody, Image } from "@nextui-org/react";

export const OrderPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState<Order>();

  useEffect(() => {
    const fetchOrder = async (id: string) => {
      try {
        const response = await http.get("/orders/" + id);
        setOrder(response.data);
      } catch (error) {
        httpError(error);
      }
    };

    fetchOrder(orderId!);
  }, [orderId]);

  if (!order) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <Navigation />
      <div className="p-6">
        <div className="mb-6">
          <p className="text-3l font-sfpro font-bold grid place-items-center">
            Order Details
          </p>
        </div>
        <div className="mb-6 grid-cols-2 grid">
          <div className="col-span-1">
            <div className="space-y-8 my-5">
              <p className="grid place-items-center">
                <strong>Address:</strong> {order.adress}
              </p>
              <p className="grid place-items-center">
                <strong>Card Owner:</strong> {order.cardOwnerName}
              </p>
              <p className="grid place-items-center">
                <strong>Subtotal:</strong> {order.subtotal}
              </p>
              <p className="grid place-items-center">
                <strong>Date:</strong>{" "}
                {new Date(order.date).toLocaleDateString()}
              </p>
              <p className="grid place-items-center">
                <strong>Status:</strong>{" "}
                {order.status == "PREPARING" && (
                  <div className="text-yellow-700 bg-yellow-100 p-4 rounded-2xl grid place-items-center">
                    {order.status}
                  </div>
                )}
                {order.status == "SENT" && (
                  <div className="text-green-700 bg-green-100 p-4 rounded-2xl grid place-items-center">
                    {order.status}
                  </div>
                )}
                {order.status == "FINISHED" && (
                  <div className="text-blue-700 bg-blue-100 p-4 rounded-2xl grid place-items-center">
                    {order.status}
                  </div>
                )}
              </p>
              <p className="grid place-items-center">
                <strong>Card Number:</strong> {order.cardNumber}
              </p>
              <p className="grid place-items-center">
                <strong>Shipping Type:</strong> {order.shippingType}
              </p>
            </div>
          </div>
          <div className="col-span-1">
            {order.smartphones.map((item, index) => (
              <a href={`/smartphones/${item.productId}`}>
                <div
                  key={index}
                  className="grid grid-cols-3 my-5 border-3 border-purple-950 rounded-3xl p-10"
                >
                  <div className="col-span-2">
                    <p>
                      <strong>Name:</strong>
                      {item.productName}
                    </p>
                    <p>
                      <strong>Price:</strong>
                      {item.productPrice}
                    </p>
                    <p>
                      <strong>Extras:</strong>
                      {item.extras}
                    </p>
                  </div>
                  <div className="col-span-1">
                    <img
                      className="w-32 h-20"
                      src={item.productImage}
                      alt="product image"
                    />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
