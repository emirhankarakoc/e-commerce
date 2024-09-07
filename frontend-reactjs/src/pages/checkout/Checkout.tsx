import { http, httpError } from "@/assets/http";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { useEffect, useState } from "react";

export default function Checkout() {
  const [userCart, setCart] = useState<Cart>();

  useEffect(() => {
    const fetchMyCart = async () => {
      try {
        const jwtToken = localStorage.getItem("jwtToken");
        const response = await http.get("/cart/myCart", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        });
        setCart(response.data);
      } catch (error) {
        httpError(error);
      }
    };

    fetchMyCart();
  }, []);
  return (
    <div>
      <div>
        <Navigation />
      </div>
      <div>hello rowld@ bismillahirrahmanirrahim</div>
      <div>{userCart?.summary}</div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
