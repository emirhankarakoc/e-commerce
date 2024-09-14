import { http, httpError } from "@/assets/http";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Input, Button, Textarea, CircularProgress } from "@nextui-org/react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const ProductUpdate = () => {
  const { smartphoneId } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async (id: string) => {
      try {
        const response = await http.get("/smartphones/" + id);
        setProduct(response.data);
      } catch (err) {
        httpError(err);
      }
    };

    fetchProduct(smartphoneId || "");
  }, [smartphoneId]);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      const response = await http.put(`/smartphones/${smartphoneId}`, formData);
      setProduct(response.data);
    } catch (err) {
      httpError(err);
    }

    setIsLoading(false);
  };
  if (!product) {
    return (
      <div>
        <Navigation />
        <div className="grid place-items-center">
          <CircularProgress />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navigation />
      <div className="emirhan mx-10">
        <p className="font-sfpro font-bold">Update Product Page</p>

        <form onSubmit={handleUpdate} className="mt-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Grid for small inputs */}
            <div className="col-span-1">
              <Input
                name="brandName"
                label="Brand Name"
                defaultValue={product?.brandName}
                className="mb-4"
              />
            </div>
            <div className="col-span-1">
              <Input
                name="modelName"
                label="Model Name"
                defaultValue={product?.modelName}
                className="mb-4"
              />
            </div>
            <div className="col-span-1">
              <Input
                name="price"
                label="Price (dont forget put first $"
                defaultValue={product?.price}
                className="mb-4"
              />
            </div>
            <div className="col-span-1">
              <Input
                name="oldPrice"
                label="Old Price (dont forget put first $)"
                defaultValue={product?.oldPrice}
                className="mb-4"
              />
            </div>
            <div className="col-span-1">
              <Input
                name="frontCameraProps"
                label="Front Camera Props"
                defaultValue={product?.frontCameraProps}
                className="mb-4"
              />
            </div>
            <div className="col-span-1">
              <Input
                name="mainCameraProps"
                label="Main Camera Props"
                defaultValue={product?.mainCameraProps}
                className="mb-4"
              />
            </div>
            <div className="col-span-1">
              <Input
                name="guaranteeOption"
                label="Guarantee Option"
                defaultValue={product?.guaranteeOption}
                className="mb-4"
              />
            </div>
            <div className="col-span-1">
              <Input
                name="screenSize"
                label="Screen Size"
                defaultValue={product?.screenSize}
                className="mb-4"
              />
            </div>
            <div className="col-span-1">
              <Input
                name="cpu"
                label="CPU"
                defaultValue={product?.cpu}
                className="mb-4"
              />
            </div>
            <div className="col-span-1">
              <Input
                name="numberOfCores"
                label="Number of Cores"
                defaultValue={product?.numberOfCores}
                className="mb-4"
              />
            </div>
            <div className="col-span-1">
              <Input
                name="battery"
                label="Battery"
                defaultValue={product?.battery}
                className="mb-4"
              />
            </div>
            <div className="col-span-1">
              <Input
                name="screenDiagonal"
                label="Screen Diagonal"
                defaultValue={product?.details.screenDiagonal}
                className="mb-4"
              />
            </div>
            <div className="col-span-1">
              <Input
                name="screenResolution"
                label="Screen Resolution"
                defaultValue={product?.details.screenResolution}
                className="mb-4"
              />
            </div>
            <div className="col-span-1">
              <Input
                name="screenRefreshRate"
                label="Screen Refresh Rate"
                defaultValue={product?.details.screenRefreshRate}
                className="mb-4"
              />
            </div>
            <div className="col-span-1">
              <Input
                name="pixelDensity"
                label="Pixel Density"
                defaultValue={product?.details.pixelDensity}
                className="mb-4"
              />
            </div>
            <div className="col-span-1">
              <Input
                name="screenType"
                label="Screen Type"
                defaultValue={product?.details.screenType}
                className="mb-4"
              />
            </div>

            <div className="col-span-3">
              <Textarea
                name="description"
                label="Description"
                defaultValue={product?.description}
                className="mb-4"
              />
            </div>
            <div className="col-span-3">
              <Textarea
                name="descriptionDetails"
                label="Description Details"
                defaultValue={product?.details.description || "girilmemis"}
                className="mb-4"
              />
            </div>
            <div className="col-span-3">
              <Textarea
                name="additionaly"
                label="Additional Information"
                defaultValue={product?.details.additionaly}
                className="mb-4"
              />
            </div>

            <div className="col-span-3">
              <p>
                {product.colors.map((color, index) => (
                  <p key={index}>#{color.code}</p>
                ))}
              </p>
              <Input
                label="Color codes(existing colors will be deleted) (seperate with ',' ex: #FFFF, #123456,#F00000)"
                className="mb-4"
              />
            </div>
            <div className="col-span-3">
              <p>
                {product.memoryOptions.map((memo, index) => (
                  <p key={index}>{memo.value}</p>
                ))}
              </p>

              <Input
                name="memoryOptions"
                label="Memory Options (existing memory options will be deleted) (seperate with ',' ex:64 GB,128 GB )"
                className="mb-4"
              />
            </div>

            {/* image listing */}

            <div className="my-10 border-3 border-purple-500 p-5 w-[1800px]">
              <p className="font-sfpro font-bold">Images </p>
              <p className="font-sfpro ">
                If you want to save your images, you need to download them.
                Because after the update, all existing images will be deleted
              </p>
              <div className="grid grid-cols-4">
                {product?.images.map((image, index) => (
                  <div
                    key={index}
                    className="col-span-1 flex flex-col mx-5 my-5"
                  >
                    <img
                      src={image.imageUrl}
                      alt="product image"
                      className=" w-full h-full mb-5"
                    />
                    <Button
                      fullWidth
                      as="a"
                      href={image.imageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      color="secondary"
                      size="sm"
                    >
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 col-span-3">
              <Input
                fullWidth
                type="file"
                name="files"
                label="Upload Files"
                multiple
                className="mb-4"
              />
            </div>
          </div>
          <Button isLoading={isLoading} fullWidth color="success" type="submit">
            Update
          </Button>
        </form>
      </div>
      <Footer />
    </div>
  );
};
