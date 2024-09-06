import { http } from "@/assets/http";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { Button, CircularProgress, Input, Textarea } from "@nextui-org/react";
import { useState } from "react";

export default function AddProduct() {
  return (
    <div>
      <Content />
    </div>
  );
}

function Content() {
  const [chosenProductType, setProductType] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);
  const [responseMessage, setMessage] = useState<string>("");
  const [createdProductId, setCreatedProductId] = useState<string>("");
  const [formData, setFormData] = useState({
    files: [],
    colorNames: "",
    memoryOptions: "",
    brandName: "",
    modelName: "",
    price: "",
    oldPrice: "",
    description: "",
    frontCameraProps: "",
    mainCameraProps: "",
    guaranteeOption: "",
    screenSize: "",
    cpu: "",
    numberOfCores: "",
    battery: "",
    descriptionDetails: "",
    screenDiagonal: "",
    screenResolution: "",
    screenRefreshRate: "",
    pixelDensity: "",
    screenType: "",
    additionaly: "",
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({
        ...formData,
        files: Array.from(e.target.files),
      });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleArrayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    if (!chosenProductType) {
      alert("Please choose a product type.");
      return;
    }

    const url = `http://localhost:8080/${chosenProductType}`;
    const form = new FormData();

    // Append form data
    form.append("colorNames", JSON.stringify(formData.colorNames));
    form.append("memoryOptions", JSON.stringify(formData.memoryOptions));
    form.append("brandName", formData.brandName);
    form.append("modelName", formData.modelName);
    form.append("price", formData.price);
    form.append("oldPrice", formData.oldPrice);
    form.append("description", formData.description);
    form.append("frontCameraProps", formData.frontCameraProps);
    form.append("mainCameraProps", formData.mainCameraProps);
    form.append("guaranteeOption", formData.guaranteeOption);
    form.append("screenSize", formData.screenSize);
    form.append("cpu", formData.cpu);
    form.append("numberOfCores", formData.numberOfCores);
    form.append("battery", formData.battery);
    form.append("descriptionDetails", formData.descriptionDetails);
    form.append("screenDiagonal", formData.screenDiagonal);
    form.append("screenResolution", formData.screenResolution);
    form.append("screenRefreshRate", formData.screenRefreshRate);
    form.append("pixelDensity", formData.pixelDensity);
    form.append("screenType", formData.screenType);
    form.append("additionaly", formData.additionaly);
    formData.files.forEach((file, index) => {
      form.append(`multipartFiles[${index}]`, file);
    });

    setLoading(true);

    try {
      const response = await http.post(url, form);

      console.log(response);

      setMessage("Product created successfully!");
      setCreatedProductId(response.data.id);
    } catch (error) {
      console.error("Error:", error);
      setMessage("Product creation failed.");
    }
    setLoading(false);
  };

  return (
    <div className="bg-gray-300 p-20 m-20 rounded-lg">
      <h2 className="font-bold font-sfpro text-4xl">Add Product Menu</h2>
      {/* Product type buttons */}
      <div className="flex flex-row gap-20 justify-center">
        <Button color="secondary" onClick={() => setProductType("smartphones")}>
          Smartphone
        </Button>
        <Button color="warning" onClick={() => setProductType("smartwatches")}>
          Smart Watch
        </Button>
        <Button color="danger" onClick={() => setProductType("tablets")}>
          Tablet
        </Button>
        <Button color="primary" onClick={() => setProductType("headphones")}>
          Headphone
        </Button>
      </div>

      {/* Show chosen product type */}
      {chosenProductType && (
        <div className="mt-10">
          <h4 className="text-2xl font-sfpro font-bold">
            Product Type: {chosenProductType}
          </h4>
          <form className="mt-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Grid for small inputs */}
              <div className="col-span-1">
                <Input
                  name="brandName"
                  label="Brand Name"
                  value={formData.brandName}
                  onChange={handleChange}
                  className="mb-4"
                />
              </div>
              <div className="col-span-1">
                <Input
                  name="modelName"
                  label="Model Name"
                  value={formData.modelName}
                  onChange={handleChange}
                  className="mb-4"
                />
              </div>
              <div className="col-span-1">
                <Input
                  name="price"
                  label="Price (dont forget put first $"
                  value={formData.price}
                  onChange={handleChange}
                  className="mb-4"
                />
              </div>
              <div className="col-span-1">
                <Input
                  name="oldPrice"
                  label="Old Price (dont forget put first $)"
                  value={formData.oldPrice}
                  onChange={handleChange}
                  className="mb-4"
                />
              </div>
              <div className="col-span-1">
                <Input
                  name="frontCameraProps"
                  label="Front Camera Props"
                  value={formData.frontCameraProps}
                  onChange={handleChange}
                  className="mb-4"
                />
              </div>
              <div className="col-span-1">
                <Input
                  name="mainCameraProps"
                  label="Main Camera Props"
                  value={formData.mainCameraProps}
                  onChange={handleChange}
                  className="mb-4"
                />
              </div>
              <div className="col-span-1">
                <Input
                  name="guaranteeOption"
                  label="Guarantee Option"
                  value={formData.guaranteeOption}
                  onChange={handleChange}
                  className="mb-4"
                />
              </div>
              <div className="col-span-1">
                <Input
                  name="screenSize"
                  label="Screen Size"
                  value={formData.screenSize}
                  onChange={handleChange}
                  className="mb-4"
                />
              </div>
              <div className="col-span-1">
                <Input
                  name="cpu"
                  label="CPU"
                  value={formData.cpu}
                  onChange={handleChange}
                  className="mb-4"
                />
              </div>
              <div className="col-span-1">
                <Input
                  name="numberOfCores"
                  label="Number of Cores"
                  value={formData.numberOfCores}
                  onChange={handleChange}
                  className="mb-4"
                />
              </div>
              <div className="col-span-1">
                <Input
                  name="battery"
                  label="Battery"
                  value={formData.battery}
                  onChange={handleChange}
                  className="mb-4"
                />
              </div>
              <div className="col-span-1">
                <Input
                  name="screenDiagonal"
                  label="Screen Diagonal"
                  value={formData.screenDiagonal}
                  onChange={handleChange}
                  className="mb-4"
                />
              </div>
              <div className="col-span-1">
                <Input
                  name="screenResolution"
                  label="Screen Resolution"
                  value={formData.screenResolution}
                  onChange={handleChange}
                  className="mb-4"
                />
              </div>
              <div className="col-span-1">
                <Input
                  name="screenRefreshRate"
                  label="Screen Refresh Rate"
                  value={formData.screenRefreshRate}
                  onChange={handleChange}
                  className="mb-4"
                />
              </div>
              <div className="col-span-1">
                <Input
                  name="pixelDensity"
                  label="Pixel Density"
                  value={formData.pixelDensity}
                  onChange={handleChange}
                  className="mb-4"
                />
              </div>
              <div className="col-span-1">
                <Input
                  name="screenType"
                  label="Screen Type"
                  value={formData.screenType}
                  onChange={handleChange}
                  className="mb-4"
                />
              </div>
              {/* Large inputs */}
              <div className="col-span-3">
                <Textarea
                  name="description"
                  label="Description"
                  value={formData.description}
                  onChange={handleChange}
                  className="mb-4"
                />
              </div>
              <div className="col-span-3">
                <Textarea
                  name="descriptionDetails"
                  label="Description Details"
                  value={formData.descriptionDetails}
                  onChange={handleChange}
                  className="mb-4"
                />
              </div>
              <div className="col-span-3">
                <Textarea
                  name="additionaly"
                  label="Additional Information"
                  value={formData.additionaly}
                  onChange={handleChange}
                  className="mb-4"
                />
              </div>
            </div>
            {/* New inputs for arrays */}
            <div className="mt-4">
              <Input
                name="colorNames"
                label="Color codes (seperate with ',' ex: #FFFF, #123456,#F00000)"
                value={formData.colorNames}
                onChange={handleArrayChange}
                className="mb-4"
              />
            </div>
            <div className="mt-4">
              <Input
                name="memoryOptions"
                label="Memory Options (seperate with ',' ex:64 GB,128 GB )"
                value={formData.memoryOptions}
                onChange={handleArrayChange}
                className="mb-4"
              />
            </div>
            <div className="mt-4">
              <Input
                type="file"
                name="files"
                label="Upload Files"
                multiple
                onChange={handleFileChange}
                className="mb-4"
              />
            </div>
            <Button
              fullWidth
              onClick={handleSubmit}
              color="success"
              className="mt-4"
            >
              Submit
            </Button>
            {isLoading && (
              <div className="mt-4 text-center">
                <CircularProgress size="lg" />
              </div>
            )}
            {responseMessage && (
              <div>
                <div className="mt-4 text-center">{responseMessage}</div>
                {createdProductId && (
                  <div>
                    <Button
                      fullWidth
                      color="primary"
                      onClick={() => {
                        window.location.href =
                          "/smartphones/" + createdProductId;
                      }}
                    >
                      Lets see
                    </Button>
                  </div>
                )}
              </div>
            )}
            <div className="mt-8">
              <Button
                fullWidth
                onClick={() => {
                  window.location.reload();
                }}
                color="danger"
              >
                Clear Everything
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
