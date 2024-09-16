import { fetcher, http, httpError } from "@/assets/http";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { Button } from "@nextui-org/button";
import { colors, Input, Textarea } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { Form, useParams } from "react-router-dom";
import { toast } from "sonner";

const useProduct = (id: string) => {
  const [product, setProduct] = useState<Product | null>();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("role") != "ROLE_ADMIN") {
      console.log(localStorage.getItem("role"));

      window.location.href = "/";
    }

    if (!id) return setLoading(false);

    const fetch = async () => {
      setLoading(true);

      try {
        const data = await fetcher("/smartphones/" + id);
        setProduct(data);
        setLoading(false);
      } catch (err) {
        httpError(err);
      }
    };

    fetch();
  }, [id]);
  return { product, isLoading };
};

//  /dashboard/products/new

export const Halilpage = () => {
  const { productId } = useParams<{ productId: string }>();
  const isNew = productId === "new";
  const { product, isLoading } = useProduct(isNew ? "" : productId!);
  const [helperLoad, setHelperLoad] = useState<boolean>(false);
  if (isLoading) return;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setHelperLoad(true);
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    try {
      isNew
        ? await http.post("/smartphones", form)
        : await http.put("/smartphones/" + productId, form);

      toast.success(
        isNew
          ? "Smartphone successfully created."
          : "Smartphone successfully updated."
      );
    } catch (err) {
      httpError(err);
    }

    setHelperLoad(false);
  };

  return (
    <div>
      <Navigation />
      <div className=" container mx-auto p-5">
        <form onSubmit={handleSubmit} className="grid grid-cols-12 gap-3">
          <Input
            type="text"
            isRequired
            label="Brand Name"
            name="brandName"
            defaultValue={product?.brandName}
            className="col-span-12 md:col-span-6"
          />
          <Input
            type="text"
            isRequired
            label="Model Name"
            name="modelName"
            defaultValue={product?.modelName}
            className="col-span-12 md:col-span-6"
          />
          <Input
            type="text"
            isRequired
            label="Price (dont forget put first $)"
            name="Price"
            defaultValue={product?.price}
            className="col-span-12 md:col-span-6"
          />
          <Input
            type="text"
            isRequired
            label="Old Price (dont forget put first $)"
            name="oldPrice"
            defaultValue={product?.oldPrice}
            className="col-span-12 md:col-span-6"
          />
          <Input
            type="text"
            isRequired
            label="Front Camera Props"
            name="frontCameraProps"
            defaultValue={product?.frontCameraProps}
            className="col-span-12 md:col-span-6"
          />
          <Input
            type="text"
            isRequired
            label="Main Camera Props"
            name="mainCameraProps"
            defaultValue={product?.mainCameraProps}
            className="col-span-12 md:col-span-6"
          />
          <Input
            type="text"
            isRequired
            name="guaranteeOption"
            label="Guarantee Option"
            defaultValue={product?.guaranteeOption}
            className="col-span-12 md:col-span-6"
          />
          <Input
            type="text"
            isRequired
            name="screenSize"
            label="Screen Size"
            defaultValue={product?.screenSize}
            className="col-span-12 md:col-span-6"
          />
          <Input
            type="text"
            isRequired
            name="cpu"
            label="CPU"
            defaultValue={product?.cpu}
            className="col-span-12 md:col-span-6"
          />
          <Input
            type="text"
            isRequired
            name="numberOfCores"
            label="Number of Cores"
            defaultValue={product?.numberOfCores}
            className="col-span-12 md:col-span-6"
          />
          <Input
            type="text"
            isRequired
            name="battery"
            label="Battery"
            defaultValue={product?.battery}
            className="col-span-12 md:col-span-6"
          />
          <Input
            type="text"
            isRequired
            name="screenDiagonal"
            label="Screen Diagonal"
            defaultValue={product?.details.screenDiagonal}
            className="col-span-12 md:col-span-6"
          />
          <Input
            type="text"
            isRequired
            name="screenResolution"
            label="Screen Resolution"
            defaultValue={product?.details.screenResolution}
            className="col-span-12 md:col-span-6"
          />
          <Input
            type="text"
            isRequired
            name="screenRefreshRate"
            label="Screen Refresh Rate"
            defaultValue={product?.details.screenRefreshRate}
            className="col-span-12 md:col-span-6"
          />
          <Input
            type="text"
            isRequired
            name="pixelDensity"
            label="Pixel Density"
            defaultValue={product?.details.pixelDensity}
            className="col-span-12 md:col-span-6"
          />
          <Input
            type="text"
            isRequired
            name="screenType"
            label="Screen Type"
            defaultValue={product?.details.screenType}
            className="col-span-12 md:col-span-6"
          />
          <Textarea
            isRequired
            name="description"
            label="Description"
            defaultValue={product?.description}
            className="col-span-12 "
          />
          <Textarea
            isRequired
            name="descriptionDetails"
            label="Description Details"
            defaultValue={product?.details.description!}
            className="col-span-12 md:col-span-6"
          />
          <Textarea
            isRequired
            name="additionaly"
            label="Additional Information"
            defaultValue={product?.details.additionaly}
            className="col-span-12 md:col-span-6"
          />
          <Input
            type="text"
            isRequired
            label="Color Codes"
            name="colorNames"
            defaultValue={product?.colors.map((c) => `${c.code} `)!}
            className="col-span-12 md:col-span-6"
            description={
              "#123456,#FFFFFF,#000000 (Seperate with ',' and put '#' first."
            }
          />
          <Input
            type="text"
            isRequired
            label="Memory Options"
            name="memoryOptions"
            className="col-span-12 md:col-span-6"
            defaultValue={product?.memoryOptions.map((c) => `${c.value} `)!}
            description={"16 GB, 256GB (Seperate with ',')"}
          />
          <Input
            className="col-span-12"
            fullWidth
            type="file"
            name="files"
            label="Upload Files"
            multiple
          />

          <div className="col-span-12">
            {" "}
            {!isNew && (
              <div>
                <p className="border-4 border-red-600 p-10 text-red-800 col-span-12">
                  If you want to save the images, you need to download and
                  re-upload them. Because after the update, all existing images
                  will be deleted
                </p>
                <div className="col-span-4 md:col-span-12">
                  {product?.images.map((image, index) => (
                    <div key={index}>
                      <img
                        src={image.imageUrl}
                        alt="product image"
                        className="p-5"
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
            )}
          </div>

          <Button
            className="col-span-12 "
            isLoading={helperLoad}
            color="success"
            type="submit"
          >
            {isNew ? "Create Product" : "Update Product"}
          </Button>
        </form>
      </div>
      <Footer />
    </div>
  );
};
