import { http, httpError } from "@/assets/http";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const AdminOrderListPage = () => {
  const [orders, setOrders] = useState<Order[]>();

  useEffect(() => {
    if (localStorage.getItem("role") != "ROLE_ADMIN") {
      window.location.href = "/";
    }

    const fetchOrders = async () => {
      try {
        const response = await http.get("/admins/orders");
        console.log(response.data);
        setOrders(response.data);
      } catch (err) {
        httpError(err);
      }
    };

    fetchOrders();
  }, []);

  const handleSetCargoStatusToSent = async (id: string) => {
    try {
      await http.put("/admins/orders/sent/" + id);
      toast.success(
        "Order updated successfully. Please reload the page for see changes."
      );
    } catch (e) {
      httpError(e);
    }
  };
  const handleSetCargoStatusToFinished = async (id: string) => {
    try {
      await http.put("/admins/orders/finished/" + id);
      toast.success(
        "Order updated successfully. Please reload the page for see."
      );
    } catch (e) {
      httpError(e);
    }
  };
  const handleSetCargoStatusToPreparing = async (id: string) => {
    try {
      await http.put("/admins/orders/preparing/" + id);
      toast.success(
        "Order updated successfully. Please reload the page for see."
      );
    } catch (e) {
      httpError(e);
    }
  };

  if (!orders) return;

  return (
    <div>
      <Navigation />

      <div>
        <Table aria-label="Orders List for Admin Menu">
          <TableHeader>
            <TableColumn key="a">User Id</TableColumn>
            <TableColumn key="b">Address</TableColumn>
            <TableColumn key="c">Shipping Type</TableColumn>
            <TableColumn key="d">Card Owner Name</TableColumn>
            <TableColumn key="e">Card Number</TableColumn>
            <TableColumn key="f">Subtotal</TableColumn>
            <TableColumn key="g">Shipping Status</TableColumn>
            <TableColumn key="h">Manage</TableColumn>
          </TableHeader>
          {orders?.map((order, index) => (
            <TableBody>
              <TableRow key={index}>
                <TableCell>{order.userId}</TableCell>
                <TableCell>{order.adress}</TableCell>
                <TableCell>{order.shippingType}</TableCell>
                <TableCell>{order.cardOwnerName}</TableCell>
                <TableCell>{order.cardNumber}</TableCell>
                <TableCell>{order.subtotal}</TableCell>
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
                  <div>
                    <Dropdown>
                      <DropdownTrigger>
                        <Button variant="bordered">Actions</Button>
                      </DropdownTrigger>
                      <DropdownMenu aria-label="Static Actions">
                        <DropdownItem
                          className="text-secondary"
                          color="secondary"
                          key="inspect"
                          onClick={() =>
                            (window.location.href = "/orders/" + order.id)
                          }
                        >
                          Inspect
                        </DropdownItem>
                        <DropdownItem
                          key="preparing"
                          className="text-warning"
                          color="warning"
                          onClick={() => {
                            handleSetCargoStatusToPreparing(order.id);
                          }}
                        >
                          set cargo status "PRAPARING"
                        </DropdownItem>
                        <DropdownItem
                          key="sent"
                          className="text-success"
                          color="success"
                          onClick={() => {
                            handleSetCargoStatusToSent(order.id);
                          }}
                        >
                          set cargo status "SENT"
                        </DropdownItem>
                        <DropdownItem
                          key="finished"
                          className="text-primary"
                          color="primary"
                          onClick={() => {
                            handleSetCargoStatusToFinished(order.id);
                          }}
                        >
                          set cargo status "FINISHED"
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          ))}
        </Table>
      </div>

      <Footer />
    </div>
  );
};
