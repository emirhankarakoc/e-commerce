import { http, httpError } from "@/assets/http";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { CircularProgress, Card, Button, CardBody } from "@nextui-org/react";
import { useEffect, useState } from "react";

export default function Cart() {
  const [products, setProducts] = useState<Cart | null>(null);

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwtToken");

    const fetchCart = async () => {
      try {
        const response = await http.get("/carts/myCart", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        });
        setProducts(response.data);
      } catch (error) {
        httpError(error);
      }
    };

    fetchCart();
  }, []);
  const handleRemoveFromCart = async (id: string) => {
    try {
      const jwtToken = localStorage.getItem("jwtToken");

      // API çağrısı yapmak
      const response = await http.delete(`/cart/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      // Seçilen ürünü sepetten kaldırma
      setProducts(response.data);

      // Başarı mesajı veya kullanıcıya bilgi verme
      console.log("Item removed successfully");
    } catch (error) {
      httpError(error);
    }
  };

  if (products === null) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navigation />
        <div className="flex-1 flex items-center justify-center">
          <CircularProgress size="lg" />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <div>
        <Navigation />
      </div>
      <div className="p-20 bg-[#F6F6F6] grid grid-cols-12">
        {/* urunler kismi */}
        <div className="col-span-8 ">
          <h1 className="text-4xl font-bold font-sfpro m-5 ">Shopping Cart</h1>
          {products?.items.map((item, index) => (
            <Card shadow="sm" isBlurred key={index} className="m-5">
              <CardBody>
                <div className="grid grid-cols-12 ">
                  <div className="col-span-3 grid place-items-center ">
                    <a href={"/smartphones/" + item.productId}>
                      <img
                        src={item.productImage}
                        alt={item.productName}
                        className="w-32 h-32"
                      />
                    </a>
                  </div>
                  <div className="col-span-3 grid place-items-center">
                    <a href={"/smartphones/" + item.productId}>
                      <h4 className="text-xl font-sfpro font-bold">
                        {item.productName}
                      </h4>
                      <p>{item.extras}</p>
                    </a>
                  </div>
                  <div className="col-span-3 grid place-items-center">
                    <h4 className="text-xl font-sfpro font-bold">
                      {item.productPrice}
                    </h4>
                  </div>
                  <div className="col-span-3 grid place-items-center">
                    <Button
                      color="danger"
                      size="md"
                      onClick={() => handleRemoveFromCart(item.id)}
                    >
                      Remove from Cart
                    </Button>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
        {/* summary */}
        <div className="col-span-4">
          <h2 className="font-bold text-2xl font-sfpro"> Summary</h2>
          <p>Total: ${products.summary}</p>
          <Button
            color="primary"
            className=" bg-black text-white px-16 py-4 w-full my-10 text-white font-sfpro rounded-lg"
            onClick={() => {
              window.location.href = "/checkout";
            }}
          >
            Checkout
          </Button>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
