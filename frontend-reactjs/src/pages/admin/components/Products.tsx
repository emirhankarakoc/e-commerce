import { http, httpError } from "@/assets/http";
import {
  Button,
  Input,
  Card,
  CardBody,
  CircularProgress,
} from "@nextui-org/react";
import { useEffect, useState } from "react";

export default function Products() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [filteredProducts, setFilteredProducts] = useState<Product[] | null>(
    null
  );
  const [selectedProductId, setSelectedProductId] = useState<string>();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      const jwtToken = localStorage.getItem("jwtToken");
      try {
        const response = await http.get("/admins/smartphones", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        });
        const data = response.data as Product[];
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        httpError(error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (products) {
      setFilteredProducts(
        products.filter((product) =>
          product.modelName.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, products]);

  const handleDeleteProduct = async (id: string) => {
    setSelectedProductId(id);
    setLoading(true);
    try {
      await http.delete(`/admins/smartphones/${id}`, {});
      setProducts(products?.filter((product) => product.id !== id) || []);
    } catch (error) {
      httpError(error);
    }
    setLoading(false);
  };

  if (products === null) {
    return (
      <div>
        <div className="grid place-items-center h-screen">
          <CircularProgress size="lg" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="p-10" id="loadingbar">
        <Input
          isClearable
          placeholder="Search products..."
          width="100%"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div>
        {filteredProducts && filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Card key={product.id} shadow="sm" className="p-10 m-5">
              <CardBody>
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-4">
                    <a href={`/smartphones/${product.id}`}>
                      <img
                        src={
                          product.images[0]?.imageUrl ||
                          "https://via.placeholder.com/150"
                        }
                        alt={product.modelName}
                        className="w-full h-auto"
                      />
                    </a>
                  </div>
                  <div className="col-span-4 flex flex-col justify-center items-start">
                    <p className="font-bold">{product.modelName}</p>
                    <p className="text-gray-500">{product.brandName}</p>
                    <p className="text-gray-500">{product.price} USD</p>
                  </div>
                  <div className="col-span-4 flex items-center">
                    <Button
                      color="warning"
                      onClick={() => {
                        window.location.href =
                          "/admin/smartphones/" + product.id;
                      }}
                    >
                      <i className="fa-solid fa-pen-to-square fa-xl"></i>
                    </Button>
                    <Button
                      isLoading={isLoading && selectedProductId === product.id}
                      color="danger"
                      onClick={() => {
                        window.location.href = "#loadingbar";

                        handleDeleteProduct(product.id);
                      }}
                      className="ml-4"
                    >
                      <i className="fa-solid fa-trash fa-xl"></i>
                    </Button>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))
        ) : (
          <div className="p-10 text-center">No products found</div>
        )}
      </div>
    </div>
  );
}
