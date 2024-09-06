import { APIURL, http, httpError } from "@/assets/http";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Breadcrumblar from "../smartphones/components/Breadcrumblar";
import { Button, CircularProgress } from "@nextui-org/react";
import Details from "./components/Details";
import Reviews from "./components/Reviews";
import Discounts from "../homepage/components/Discounts";

export default function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedMemory, setSelectedMemory] = useState<string | null>(null);
  const [mainImage, setMainImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await http.get(`${APIURL}/smartphones/${id}`);
        const data = response.data;
        console.log("Fetched Product Data:", data);
        setProduct(data);
        if (data.images && data.images.length > 0) {
          setMainImage(data.images[0].imageUrl); // Başlangıçta ilk resmi ana resim olarak ayarla
        }
      } catch (error) {
        httpError(error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleColorSelect = (colorCode: string) => {
    setSelectedColor(colorCode);
  };

  const handleMemorySelect = (memoryValue: string) => {
    setSelectedMemory(memoryValue);
  };

  const handlePurchase = async () => {
    const jwtToken = localStorage.getItem("jwtToken");

    if (!jwtToken) {
      alert("Please log in first.");
      return;
    }

    if (!selectedColor || !selectedMemory) {
      alert("Please select both color and memory.");
      return;
    }

    const requestBody = {
      productId: id,
      productColor: selectedColor,
      productMemory: selectedMemory,
    };

    try {
      // Make the API call
      await http.post(`${APIURL}/cart`, requestBody, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      alert("Item added to cart successfully.!");
    } catch (error) {
      httpError(error);
    }
  };

  const handleWishlist = async () => {
    if (!selectedColor || !selectedMemory) {
      alert("Please select both color and memory.");
      return;
    }

    try {
      console.log({
        productId: id,
        color: selectedColor,
        memory: selectedMemory,
      });

      alert(`Added to wishlist ! ${id} ${selectedColor} ${selectedMemory}`);
    } catch (error) {
      httpError(error);
    }
  };

  const handleImageClick = (imageUrl: string) => {
    setMainImage(imageUrl);
  };

  if (product === undefined) {
    return (
      <div>
        <Navigation />
        <div className="grid place-items-center">
          <CircularProgress size="lg" aria-label="Loading..." />
        </div>
        <Footer />
      </div>
    );
  }

  if (product !== null) {
    return (
      <div>
        <Navigation />
        <Breadcrumblar
          category="Smartphones"
          brandName={product.brandName}
          modelName={product.modelName}
        />
        <div className="py-10 px-40">
          <div className="grid grid-cols-12 gap-4">
            {/* Resim Bölgesi */}
            <div className="col-span-6 flex">
              <div className="flex-1 flex justify-center items-center">
                <img
                  src={mainImage || "/placeholder.png"}
                  alt="Main Product"
                  className="w-full h-auto object-contain"
                />
              </div>
              <div className="w-20 flex flex-col space-y-2">
                {product.images.map((image, index) => (
                  <img
                    key={index}
                    src={image.imageUrl}
                    alt={`Thumbnail ${index}`}
                    className={`w-full h-20 object-cover cursor-pointer ${image.imageUrl === mainImage ? "opacity-50" : ""}`}
                    onClick={() => handleImageClick(image.imageUrl)}
                    aria-label={`Thumbnail ${index}`}
                  />
                ))}
              </div>
            </div>

            {/* Veriler */}
            <div className="col-span-6">
              {/* Marka ve model ismi */}
              <div className="col-span-12">
                <p className="text-3xl font-sfpro font-bold my-5">
                  {product.brandName}&nbsp;{product.modelName}
                </p>
              </div>
              {/* Fiyat */}
              <div className="col-span-12 flex flex-row">
                <p className="text-2xl font-sfpro font-bold">
                  {product.price}&nbsp;
                </p>
                <p className="text-2xl font-sfpro line-through truncate">
                  {product.oldPrice || "Bu nesne için girilmemiş."}
                </p>
              </div>
              {/* Renk Seçenekleri */}
              <div className="flex flex-wrap gap-2 mt-4">
                <div>Color options:</div>
                {product.colors.map((color) => (
                  <div
                    key={color.id}
                    className={`w-8 h-8 rounded-full cursor-pointer relative ${selectedColor === color.code ? "border-4 border-black" : "border border-gray-300"}`}
                    style={{ backgroundColor: color.code }}
                    onClick={() => handleColorSelect(color.code)}
                    aria-label={`Color: ${color.code}`}
                  >
                    {selectedColor === color.code && (
                      <div className="absolute inset-0 border-2 border-black rounded-full pointer-events-none"></div>
                    )}
                  </div>
                ))}
              </div>

              {/* Bellek Seçenekleri */}
              <div className="col-span-12 mt-4">
                {product.memoryOptions.map((memory) => (
                  <Button
                    key={memory.id}
                    onClick={() => handleMemorySelect(memory.value)}
                    className={`mr-2 ${selectedMemory === memory.value ? "bg-black text-white" : ""}`}
                  >
                    {memory.value}
                  </Button>
                ))}
              </div>
              {/* zimbirti detaylarin ilk 3 kolonu */}
              <div className="grid grid-cols-3 my-5 gap-5">
                {/* screen size */}
                <div className="col-span-1 bg-[#f3f3f3] rounded-lg  p-3">
                  <div className="grid grid-cols-3 place-items-center">
                    <div className="col-span-1 flex items-center justify-start">
                      <i
                        className="fa-solid fa-mobile-screen-button fa-xl"
                        style={{ color: "#4e4e4e" }}
                      ></i>
                    </div>
                    <div className="col-span-2 flex flex-col items-start justify-center">
                      <div className="text-[#b6b6b6] font-sfpro">
                        Screen size
                      </div>
                      <div className="text-[#4E4E4E] font-sfpro">
                        {product.screenSize}
                      </div>
                    </div>
                  </div>
                </div>
                {/*cpus*/}
                <div className="col-span-1 bg-[#f3f3f3] rounded-lg  p-3">
                  <div className="grid grid-cols-3 place-items-center">
                    <div className="col-span-1 flex items-center justify-start">
                      <i
                        className="fa-solid fa-microchip fa-xl"
                        style={{ color: "#4e4e4e" }}
                      ></i>
                    </div>
                    <div className="col-span-2 flex flex-col items-start justify-center">
                      <div className="text-[#b6b6b6] font-sfpro">CPU</div>
                      <div className="text-[#4E4E4E] font-sfpro">
                        {product.cpu}
                      </div>
                    </div>
                  </div>
                </div>
                {/* number of cores */}
                <div className="col-span-1 bg-[#f3f3f3] rounded-lg  p-3">
                  <div className="grid grid-cols-3 place-items-center">
                    <div className="col-span-1 flex items-center justify-start">
                      <i
                        className="fa-solid fa-microchip fa-xl"
                        style={{ color: "#4e4e4e" }}
                      ></i>
                    </div>
                    <div className="col-span-2 flex flex-col items-start justify-center">
                      <div className="text-[#b6b6b6] font-sfpro">
                        Number of Cores
                      </div>
                      <div className="text-[#4E4E4E] font-sfpro">
                        {product.numberOfCores}
                      </div>
                    </div>
                  </div>
                </div>
                {/* main camera */}
                <div className="col-span-1 bg-[#f3f3f3] rounded-lg  p-3">
                  <div className="grid grid-cols-3 place-items-center">
                    <div className="col-span-1 flex items-center justify-start">
                      <i
                        className="fa-solid fa-camera fa-xl"
                        style={{ color: "#4e4e4e" }}
                      ></i>
                    </div>
                    <div className="col-span-2 flex flex-col items-start justify-center">
                      <div className="text-[#b6b6b6] font-sfpro">
                        Main Camera
                      </div>
                      <div className="text-[#4E4E4E] font-sfpro">
                        {product.mainCameraProps}
                      </div>
                    </div>
                  </div>
                </div>
                {/* front camera */}
                <div className="col-span-1 bg-[#f3f3f3] rounded-lg  p-3">
                  <div className="grid grid-cols-3 place-items-center">
                    <div className="col-span-1 flex items-center justify-start">
                      <i
                        className="fa-solid fa-camera-rotate fa-xl"
                        style={{ color: "#4e4e4e" }}
                      ></i>
                    </div>
                    <div className="col-span-2 flex flex-col items-start justify-center">
                      <div className="text-[#b6b6b6] font-sfpro">
                        Front Camera
                      </div>
                      <div className="text-[#4E4E4E] font-sfpro">
                        {product.frontCameraProps}
                      </div>
                    </div>
                  </div>
                </div>
                {/* battery capacity */}
                <div className="col-span-1 bg-[#f3f3f3] rounded-lg  p-3">
                  <div className="grid grid-cols-3 place-items-center">
                    <div className="col-span-1 flex items-center justify-start">
                      <i
                        className="fa-solid fa-battery-half fa-xl"
                        style={{ color: "#4e4e4e" }}
                      ></i>
                    </div>
                    <div className="col-span-2 flex flex-col items-start justify-center">
                      <div className="text-[#b6b6b6] font-sfpro">
                        Battery Capacity
                      </div>
                      <div className="text-[#4E4E4E] font-sfpro">
                        {product.battery}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* product description... DANGEROUS, DETAILS DESCRIPTION DEGIL */}
              <div className="col-span-12 p-2">{product.description}</div>

              {/* Satın Alma ve Istek listesine ekleme butonu */}
              <div className="col-span-12">
                <div className="grid grid-cols-2 gap-4">
                  <div className="mt-4">
                    <button
                      onClick={handleWishlist}
                      className="w-full border-2 border-black py-3 rounded-lg hover:bg-gray-100 "
                    >
                      Add To Wishlist
                    </button>
                  </div>
                  <div className="mt-4">
                    <button
                      onClick={handlePurchase}
                      color="primary"
                      className="w-full bg-black py-3 rounded-lg hover:bg-gray-800 text-white"
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
              {/* free delivery kismindaki 3 adet buton. */}
              <div className=" grid grid-cols-3 my-5  bg-white">
                {/* free delivery */}
                <div className="col-span-1 p-3">
                  <div className="grid grid-cols-3 place-items-center">
                    <div className="col-span-1 flex items-center justify-start bg-[#f3f3f3] rounded-lg p-7">
                      <i
                        className="fa-solid fa-truck fa-xl"
                        style={{ color: "#4e4e4e" }}
                      ></i>
                    </div>
                    <div className="col-span-2 flex flex-col items-start justify-center">
                      <div className="text-[#b6b6b6] font-sfpro">
                        Free Delivery
                      </div>
                      <div className="text-[#4E4E4E] font-sfpro">1-2 day</div>
                    </div>
                  </div>
                </div>
                {/* stokta var mi? */}
                <div className="col-span-1 p-3">
                  <div className="grid grid-cols-3 place-items-center">
                    <div className="col-span-1 flex items-center justify-start bg-[#f3f3f3] rounded-lg p-7">
                      <i
                        className="fa-solid fa-store fa-xl"
                        style={{ color: "#4e4e4e" }}
                      ></i>
                    </div>
                    <div className="col-span-2 flex flex-col items-start justify-center">
                      <div className="text-[#b6b6b6] font-sfpro">In Stock</div>
                      <div className="text-[#4E4E4E] font-sfpro">1-2 day</div>
                    </div>
                  </div>
                </div>
                {/* garanti suresi */}
                <div className="col-span-1 p-3">
                  <div className="grid grid-cols-3 place-items-center">
                    <div className="col-span-1 flex items-center justify-start bg-[#f3f3f3] rounded-lg p-7">
                      <i
                        className="fa-solid fa-certificate fa-xl"
                        style={{ color: "#4e4e4e" }}
                      ></i>
                    </div>
                    <div className="col-span-2 flex flex-col items-start justify-center">
                      <div className="text-[#b6b6b6] font-sfpro">
                        Guaranteed
                      </div>
                      <div className="text-[#4E4E4E] font-sfpro">
                        {product.guaranteeOption}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* detaylar kismi */}
        <div className="bg-[#FAFAFA] p-20">
          <Details detaylar={product.details} />
        </div>
        {product.reviews == null && (
          <div className="bg-white p-20">
            <Reviews reviews={product.reviews} />{" "}
          </div>
        )}

        <div>
          <Discounts />
        </div>
        <Footer />
      </div>
    );
  }

  return null;
}
