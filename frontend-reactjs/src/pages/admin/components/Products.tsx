import { http, httpError } from "@/assets/http";
import {
  Button,
  Input,
  Card,
  CardBody,
  CircularProgress,
} from "@nextui-org/react";
import { useEffect, useState } from "react";

function Products() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [filteredProducts, setFilteredProducts] = useState<Product[] | null>(
    null
  );
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );
  const [isUpdateMenuActive, setUpdateMenuActive] = useState<boolean>(false);
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

  const handleUpdateProduct = (id: string) => {
    setSelectedProductId(id);
    setUpdateMenuActive(true);
  };

  const handleCloseUpdateMenu = () => {
    setUpdateMenuActive(false);
    setSelectedProductId(null);
  };

  const handleDeleteProduct = async (id: string) => {
    setLoading(true);
    const jwtToken = localStorage.getItem("jwtToken");
    try {
      await http.delete(`/admins/smartphones/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
      });
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

      {isLoading && (
        <div className="grid place-items-center">
          <CircularProgress color="secondary" size="lg" />
          <div>Please wait.</div>
        </div>
      )}

      <div>
        {filteredProducts && filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Card key={product.id} shadow="sm" className="p-10 m-5">
              <CardBody>
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-4">
                    <img
                      src={
                        product.images[0]?.imageUrl ||
                        "https://via.placeholder.com/150"
                      }
                      alt={product.modelName}
                      className="w-full h-auto"
                    />
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
                        handleUpdateProduct(product.id);
                        setUpdateMenuActive(!isUpdateMenuActive);
                      }}
                    >
                      <i className="fa-solid fa-pen-to-square fa-xl"></i>
                    </Button>
                    <Button
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
              {isUpdateMenuActive && selectedProductId && (
                <UpdateProduct
                  product1={
                    products.find((p) => p.id === selectedProductId) || {}
                  }
                  setState={setUpdateMenuActive}
                />
              )}
            </Card>
          ))
        ) : (
          <div className="p-10 text-center">No products found</div>
        )}
      </div>
    </div>
  );
}

function UpdateProduct({
  product1,
  setState,
}: {
  product1: Product;
  setState: (active: boolean) => void;
}) {
  const [modelName, setModelName] = useState(product1.modelName ?? "");
  const [brandName, setBrandName] = useState(product1.brandName ?? "");
  const [price, setPrice] = useState(product1.price ?? "");
  const [oldPrice, setOldPrice] = useState(product1.oldPrice ?? "");
  const [cpu, setCpu] = useState(product1.cpu ?? "");
  const [numberOfCores, setNumberOfCores] = useState(
    product1.numberOfCores ?? ""
  );
  const [battery, setBattery] = useState(product1.battery ?? "");
  const [screenSize, setScreenSize] = useState(product1.screenSize ?? "");
  const [description, setDescription] = useState(product1.description ?? "");

  // New states for Details
  const [descriptionDetails, setDescriptionDetails] = useState(
    product1.details?.descriptionDetails ?? ""
  );
  const [screenDiagonal, setScreenDiagonal] = useState(
    product1.details?.screenDiagonal ?? ""
  );
  const [screenResolution, setScreenResolution] = useState(
    product1.details?.screenResolution ?? ""
  );
  const [screenRefreshRate, setScreenRefreshRate] = useState(
    product1.details?.screenRefreshRate ?? ""
  );
  const [pixelDensity, setPixelDensity] = useState(
    product1.details?.pixelDensity ?? ""
  );
  const [screenType, setScreenType] = useState(
    product1.details?.screenType ?? ""
  );
  const [additionaly, setAdditionaly] = useState(
    product1.details?.additionaly ?? ""
  );
  const handleUpdate = async () => {
    try {
      const jwtToken = localStorage.getItem("jwtToken");
      const response = await http.put(
        `/admins/smartphone/${product1.id}`,
        {
          modelName,
          brandName,
          price,
          oldPrice,
          cpu,
          numberOfCores,
          battery,
          screenSize,
          description,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      alert("Update successful. Please refresh the page.");
      console.log("Product updated:", response.data);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="px-20 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Product Update Menu</h1>
        <Button color="danger" onClick={() => setState(false)}>
          <i
            className="fa-solid fa-xmark fa-2xl"
            style={{ color: "white" }}
          ></i>
        </Button>
      </div>
      <div className="space-y-4">
        <Input
          isClearable
          label="Model Name"
          placeholder="Enter model name"
          value={modelName}
          onChange={(e) => setModelName(e.target.value)}
        />
        <Input
          isClearable
          label="Brand Name"
          placeholder="Enter brand name"
          value={brandName}
          onChange={(e) => setBrandName(e.target.value)}
        />
        <Input
          isClearable
          label="Price"
          placeholder="Enter price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <Input
          isClearable
          label="Old Price"
          placeholder="Enter old price"
          value={oldPrice}
          onChange={(e) => setOldPrice(e.target.value)}
        />
        <Input
          isClearable
          label="CPU"
          placeholder="Enter CPU details"
          value={cpu}
          onChange={(e) => setCpu(e.target.value)}
        />
        <Input
          isClearable
          label="Number of Cores"
          placeholder="Enter number of cores"
          value={numberOfCores}
          onChange={(e) => setNumberOfCores(e.target.value)}
        />
        <Input
          isClearable
          label="Battery"
          placeholder="Enter battery details"
          value={battery}
          onChange={(e) => setBattery(e.target.value)}
        />
        <Input
          isClearable
          label="Screen Size"
          placeholder="Enter screen size"
          value={screenSize}
          onChange={(e) => setScreenSize(e.target.value)}
        />
        <Input
          isClearable
          label="Description"
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button onClick={handleUpdate}>Update</Button>
      </div>
    </div>
  );
}

export default Products;
