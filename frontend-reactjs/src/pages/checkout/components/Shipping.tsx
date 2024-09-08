import { http, httpError } from "@/assets/http";
import { Button } from "@nextui-org/button";
import { useEffect, useState } from "react";

interface ShippingProps {
  propShippingId: React.Dispatch<React.SetStateAction<string | undefined>>;
  setActiveState: React.Dispatch<React.SetStateAction<string>>;
}

interface ShippingMethod {
  id: string;
  name: string;
  description: string;
  cost: number;
}

export default function Shipping({
  propShippingId,
  setActiveState,
}: ShippingProps) {
  const [methods, setMethods] = useState<ShippingMethod[]>();
  const [selectedMethodName, setSelectedMethodName] = useState<string>();

  useEffect(() => {
    const fetchMethods = async () => {
      try {
        const response = await http.get("/shippingmethods");
        setMethods(response.data);
      } catch (err) {
        httpError(err);
      }
    };

    fetchMethods();
  }, []);

  const handleSelect = (id: string) => {
    const methodId = id;
    propShippingId(methodId);
  };
  const handleContinue = () => {
    setActiveState("Payment");
  };

  return (
    <div className="p-20 px-40">
      {methods?.length === 0 ? (
        <div>
          There is a problem fetching shipping methods, try again later or text
          us!
        </div>
      ) : (
        <div>
          <h1 className="text-4xl font-bold font-sfpro">Shipping Methods</h1>
          {selectedMethodName && (
            <div className="flex flex-row items-center justify-start gap-10">
              <p>
                Selected shipping method: <strong>{selectedMethodName}</strong>
              </p>
              <Button className="bg-black text-white" onClick={handleContinue}>
                Continue
              </Button>
            </div>
          )}
          {methods?.map((method) => (
            <div
              key={method.id}
              className="bg-gray-50 p-10 rounded-lg font-sfpro shadow my-10 grid grid-cols-2"
            >
              <div className="col-span-1">
                <h3 className="text-3xl font-bold">{method.name}</h3>
                <p className="text-xl">{method.description}</p>
                <h2 className="text-2xl font-bold">${method.cost}</h2>
              </div>
              <div className="col-span-1 grid place-items-center">
                <Button
                  fullWidth
                  onClick={() => {
                    handleSelect(method.id);
                    setSelectedMethodName(method.name);
                  }}
                  className="bg-black text-white"
                >
                  Select
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
