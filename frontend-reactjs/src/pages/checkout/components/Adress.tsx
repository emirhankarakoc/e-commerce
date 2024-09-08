import { APIURL, http } from "@/assets/http";
import { Button } from "@nextui-org/button";
import {
  CircularProgress,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import { useEffect, useState } from "react";

interface AdressProps {
  propAdressId: React.Dispatch<React.SetStateAction<string | undefined>>;
  setActiveState: React.Dispatch<React.SetStateAction<string>>;
}

export default function Adress({ propAdressId, setActiveState }: AdressProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isLoading, setLoading] = useState(false);
  const [selectedAdressName, setSelectedAdressName] = useState<string>();

  const [adresses, setAdresses] = useState<Address[]>([]);
  const [newAddress, setNewAddress] = useState({
    title: "",
    phoneNumber: "",
    fullAdress: "",
  });

  useEffect(() => {
    const fetchMyAddress = async () => {
      try {
        const jwtToken = localStorage.getItem("jwtToken");
        const response = await http.get(`${APIURL}/users/addresses`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        });
        console.log(response.data);

        setAdresses(response.data);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    fetchMyAddress();
  }, []);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setNewAddress({
      ...newAddress,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    const jwtToken = localStorage.getItem("jwtToken");
    await http.post(`${APIURL}/users/addresses`, newAddress, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    setLoading(false);
    onClose(); // Modal'ı kapat
    window.location.href = window.location.href;
  };
  const handleContinue = () => {
    setActiveState("Shipping"); // veya bir sonraki adımın ismi neyse onu kullanın
  };
  const handleDeleteConfirm = () => {
    console.log("SILINDI");
  };
  return (
    <div className="p-20 px-40">
      <div className="flex justify-between">
        <div className="font-sfpro text-4xl font-bold">Select Address</div>
        <Button
          onClick={() => {
            window.location.href = "/profile/addresses";
          }}
          color="warning"
          variant="ghost"
        >
          Update Adresses
        </Button>
      </div>
      {selectedAdressName && (
        <div className="flex flex-row items-center gap-10">
          <div>Selected Adress: {selectedAdressName}</div>
          <div>
            <Button className="bg-black text-white" onClick={handleContinue}>
              Continue
            </Button>
          </div>
        </div>
      )}

      {adresses.length === 0 ? (
        <div className="mt-4">
          <div>No addresses available, why don't you add?</div>
          <Button
            onClick={() => {
              window.location.href = "/";
            }}
          >
            Click me for manage your adresses.
          </Button>
        </div>
      ) : (
        <div className="mt-4 ">
          {adresses.map((adress, index) => (
            <div
              key={index}
              className={`mb-2 p-4 border shadow rounded-lg ${selectedAdressName === adress.title ? "border-2 border-green-400" : "border-1 border-gray-400"}`}
            >
              <div className="grid grid-cols-2">
                <div className="col-span-1">
                  <div>
                    <strong>Title:</strong> {adress.title}
                  </div>
                  <div>
                    <strong>Phone Number:</strong> {adress.phoneNumber}
                  </div>
                  <div>
                    <strong>Full Address:</strong> {adress.fullAddress}
                  </div>
                </div>

                <div className="col-span-1 flex flex-row">
                  <Button
                    fullWidth
                    onClick={() => {
                      propAdressId(adress.id);
                      setSelectedAdressName(adress.title);
                    }}
                    className={` mx-5
                     ${adress.title === selectedAdressName ? "bg-green-400 text-white" : "bg-gray-300 text-black"}
                   `}
                    variant="bordered"
                  >
                    {adress.title === selectedAdressName
                      ? "Selected"
                      : "Select"}
                  </Button>
                </div>
              </div>
            </div>
          ))}
          <Button
            fullWidth
            onClick={() => {
              window.location.href = "/";
            }}
            className="bg-black text-white"
          >
            Can't find? Click here.
          </Button>
        </div>
      )}
    </div>
  );
}
