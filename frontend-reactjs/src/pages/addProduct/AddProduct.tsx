import { http } from "@/assets/http";
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
  const [isLoading, setLoading] = useState<boolean>(false);
  const [responseMessage, setMessage] = useState<string>("");
  const [createdProductId, setCreatedProductId] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const url = `http://localhost:8080/smartphones`;
    const form = new FormData(e.currentTarget);
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
    <div className="rounded-lg border-3  border-red-500 my-10 p-5">
      {/* Show chosen product type */}

      <form onSubmit={handleSubmit} className="mt-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Grid for small inputs */}
          <Input name="brandName" label="Brand Name" className="col-span-1" />
          <Input name="modelName" label="Model Name" className="col-span-1" />
          <Input
            name="price"
            label="Price (dont forget put first $)"
            className="col-span-1"
          />
          <Input
            name="oldPrice"
            label="Old Price (dont forget put first $)"
            className="col-span-1"
          />
          <Input
            name="frontCameraProps"
            label="Front Camera Props"
            className="col-span-1"
          />
          <Input
            name="mainCameraProps"
            label="Main Camera Props"
            className="col-span-1"
          />
          <Input
            name="guaranteeOption"
            label="Guarantee Option"
            className="col-span-1"
          />
          <Input name="screenSize" label="Screen Size" className="col-span-1" />
          <Input name="cpu" label="CPU" className="col-span-1" />
          <Input name="numberOfCores" label="Number of Cores" />
          <Input name="battery" label="Battery" className="col-span-1" />
          <Input
            name="screenDiagonal"
            label="Screen Diagonal"
            className="col-span-1"
          />
          <Input
            name="screenResolution"
            label="Screen Resolution"
            className="col-span-1"
          />
          <Input
            name="screenRefreshRate"
            label="Screen Refresh Rate"
            className="col-span-1"
          />
          <Input
            name="pixelDensity"
            label="Pixel Density"
            className="col-span-1"
          />
          <Input name="screenType" label="Screen Type" className="col-span-1" />
          {/* Large inputs */}
          <Textarea
            name="description"
            label="Description"
            className="col-span-3"
          />
          <Textarea
            name="descriptionDetails"
            label="Description Details"
            className="col-span-3"
          />
          <Textarea
            name="additionaly"
            label="Additional Information"
            className="col-span-3"
          />
          {/* New inputs for arrays */}
          <Input
            isRequired
            name="colorNames"
            label="Color codes (seperate with ',' ex: #FFFF, #123456,#F00000)"
            className="mb-4"
          />
          <Input
            isRequired
            name="memoryOptions"
            label="Memory Options (seperate with ',' ex:64 GB,128 GB )"
            className="mb-4"
          />
          <Input
            type="file"
            name="files"
            label="Upload Files"
            multiple
            className="mb-4"
          />
          <Button
            type="submit"
            isLoading={isLoading}
            fullWidth
            color="success"
            className="mt-4"
          >
            Submit
          </Button>

          {responseMessage && (
            <div>
              <div className="mt-4 text-center">{responseMessage}</div>
              {createdProductId && (
                <div>
                  <Button
                    fullWidth
                    color="primary"
                    onClick={() => {
                      window.location.href = "/smartphones/" + createdProductId;
                    }}
                  >
                    Lets see
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </form>
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
    </div>
  );
}
