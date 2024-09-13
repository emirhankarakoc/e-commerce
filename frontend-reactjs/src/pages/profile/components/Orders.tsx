import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  CircularProgress,
  Button,
} from "@nextui-org/react";
import { http, httpError } from "@/assets/http";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await http.get("/orders/all");
        let data = response.data;

        // Convert the date strings to Date objects
        data = data.map((order: any) => ({
          ...order,
          date: new Date(order.date), // Convert to Date object
        }));

        setOrders(data);
      } catch (error) {
        httpError(error);
      }
    };

    fetchOrders();
  }, []);

  if (!orders) {
    return (
      <div>
        <div>
          <Navigation />
        </div>
        <div>
          <CircularProgress />
        </div>
        <div>
          <Footer />
        </div>
      </div>
    );
  }
  return (
    <div className="mx-10">
      <Table aria-label="Orders Table">
        <TableHeader>
          <TableColumn>Status</TableColumn>

          <TableColumn>Product Count</TableColumn>

          <TableColumn>Address</TableColumn>
          <TableColumn>Shipping Type</TableColumn>

          <TableColumn>Card Number</TableColumn>
          <TableColumn>Subtotal</TableColumn>
          <TableColumn>Date</TableColumn>
        </TableHeader>
        <TableBody>
          {orders.map((order, index) => (
            <TableRow key={index}>
              <TableCell>
                {order.status === "PREPARING" && (
                  <div className="text-yellow-700 bg-yellow-100 p-4 rounded-2xl grid place-items-center">
                    {order.status}
                  </div>
                )}
                {order.status === "SENT" && (
                  <div className="text-green-700 bg-green-100 p-4 rounded-2xl grid place-items-center">
                    {order.status}
                  </div>
                )}
                {order.status === "FINISHED" && (
                  <div className="text-blue-700 bg-blue-100 p-4 rounded-2xl grid place-items-center">
                    {order.status}
                  </div>
                )}
              </TableCell>
              <TableCell>
                {order.smartphones.length == 1 ? (
                  <div className="grid place-items-center">
                    {order.smartphones.length}
                  </div>
                ) : (
                  <div className="grid place-items-center">
                    <div>{order.smartphones.length} device</div>
                    <Button
                      color="warning"
                      onClick={() => {
                        window.location.href = "/orders/" + order.id;
                      }}
                    >
                      Details
                    </Button>
                  </div>
                )}
              </TableCell>
              <TableCell>{order.adress}</TableCell>
              <TableCell>{order.shippingType}</TableCell>
              <TableCell>{order.cardNumber}</TableCell>
              <TableCell>{order.subtotal}</TableCell>
              <TableCell>{order.date.toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
