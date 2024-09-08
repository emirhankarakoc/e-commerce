import { http, httpError } from "@/assets/http";
import {
  Button,
  Input,
  Card,
  Divider,
  CardBody,
  CardFooter,
  Textarea,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  CircularProgress,
} from "@nextui-org/react";
import { useEffect, useState } from "react";

export default function Addresses() {
  const [addresses, setAddresses] = useState<Address[]>();
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [title, setTitle] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [fullAddress, setFullAddress] = useState<string>("");
  const [newTitle, setNewTitle] = useState<string>("");
  const [newPhoneNumber, setNewPhoneNumber] = useState<string>("");
  const [newFullAddress, setNewFullAddress] = useState<string>("");

  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onOpenChange: onEditOpenChange,
  } = useDisclosure();
  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onOpenChange: onAddOpenChange,
  } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onOpenChange: onDeleteOpenChange,
  } = useDisclosure();

  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchMyAddresses = async () => {
      try {
        const jwtToken = localStorage.getItem("jwtToken");
        const response = await http.get("/users/addresses", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        });
        setAddresses(response.data);
      } catch (e) {
        httpError(e);
      }
    };

    fetchMyAddresses();
  }, []);

  useEffect(() => {
    if (selectedAddress) {
      setTitle(selectedAddress.title);
      setPhoneNumber(selectedAddress.phoneNumber);
      setFullAddress(selectedAddress.fullAddress);
    }
  }, [selectedAddress]);

  const handleUpdateAddress = async () => {
    if (!selectedAddress) return;

    const updatedAddress = {
      title,
      phoneNumber,
      fullAddress,
    };

    try {
      const jwtToken = localStorage.getItem("jwtToken");
      const response = await http.put(
        `/users/addresses/${selectedAddress.id}`,
        updatedAddress,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      setAddresses((prevAddresses) =>
        prevAddresses?.map((address) =>
          address.id === selectedAddress.id ? response.data : address
        )
      );
      setSelectedAddress(null);
      onEditOpenChange(false);
    } catch (e) {
      httpError(e);
    }
  };

  const handleAddAddress = async () => {
    const newAddress = {
      title: newTitle,
      phoneNumber: newPhoneNumber,
      fullAddress: newFullAddress,
    };

    try {
      const jwtToken = localStorage.getItem("jwtToken");
      const response = await http.post("/users/addresses", newAddress, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      setAddresses((prevAddresses) => [
        ...(prevAddresses || []),
        response.data,
      ]);
      setNewTitle("");
      setNewPhoneNumber("");
      setNewFullAddress("");
      onAddOpenChange(false);
    } catch (e) {
      httpError(e);
    }
  };

  const deleteAddress = async (id: string) => {
    setLoading(true);

    try {
      await http.delete(`/users/addresses/${id}`);
      setAddresses((prevAddresses) =>
        prevAddresses?.filter((address) => address.id !== id)
      );
      setSelectedAddress(null);
      onDeleteOpenChange(false);
    } catch (e) {
      httpError(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border-purple-600 border-2 rounded-3xl p-5 m-5">
      <h1 className="text-3xl font-bold font-sfpro p-5 text-center rounded-t-3xl">
        Addresses
      </h1>
      <div className="grid grid-cols-2 gap-4">
        {/* Address List */}
        <div>
          {addresses?.length === 0 ? (
            <div className="text-center text-lg">
              <p> No addresses available. You need to add a new one.</p>
              <Button className="bg-purple-500" onPress={onAddOpen}>
                Add
              </Button>
            </div>
          ) : (
            addresses?.map((address) => (
              <Card key={address.id} className="my-4">
                <CardBody>
                  <p className="font-bold text-2xl">{address.title}</p>
                  <p>Phone: {address.phoneNumber}</p>
                  <p>Address: {address.fullAddress}</p>
                </CardBody>
                <CardFooter>
                  <Button
                    className="bg-purple-500"
                    onClick={() => {
                      setSelectedAddress(address);
                      onEditOpen();
                    }}
                  >
                    Edit
                  </Button>
                </CardFooter>
              </Card>
            ))
          )}
          <div className="grid place-items-center">
            <Button className="bg-purple-500" onPress={onAddOpen}>
              Add Another One
            </Button>
          </div>
        </div>

        {/* Address Edit Form */}
        <div className="border-l-2 border-purple-600 pl-4">
          {selectedAddress ? (
            <div className="mt-4">
              <Input
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mb-4"
              />
              <Input
                label="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="mb-4"
              />
              <Textarea
                label="Full Address"
                value={fullAddress}
                onChange={(e) => setFullAddress(e.target.value)}
                className="mb-4"
              />
              <div className="flex  gap-10">
                <Button
                  fullWidth
                  onClick={handleUpdateAddress}
                  className="bg-purple-500"
                >
                  Save Changes
                </Button>
                <Button color="danger" variant="ghost" onPress={onDeleteOpen}>
                  Delete
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center text-lg">
              Select an address to edit.
            </div>
          )}
        </div>
      </div>

      {/* Add Address Modal */}
      <Modal
        backdrop="blur"
        isOpen={isAddOpen}
        onOpenChange={onAddOpenChange}
        classNames={{
          backdrop:
            "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Add New Address</ModalHeader>
              <ModalBody>
                <Input
                  label="Title"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="mb-4"
                />
                <Input
                  label="Phone Number"
                  value={newPhoneNumber}
                  onChange={(e) => setNewPhoneNumber(e.target.value)}
                  className="mb-4"
                />
                <Input
                  label="Full Address"
                  value={newFullAddress}
                  onChange={(e) => setNewFullAddress(e.target.value)}
                  className="mb-4"
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  fullWidth
                  className="bg-purple-500"
                  onPress={handleAddAddress}
                >
                  Add Address
                </Button>
                <Button color="danger" variant="ghost" onPress={onClose}>
                  Cancel
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Delete Address Modal */}
      <Modal
        backdrop="blur"
        isOpen={isDeleteOpen}
        onOpenChange={onDeleteOpenChange}
        classNames={{
          backdrop:
            "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Delete Address</ModalHeader>
              <ModalBody>
                <p>Are you sure you want to delete this address?</p>
              </ModalBody>
              <ModalFooter>
                <Button
                  fullWidth
                  className="bg-purple-500"
                  onPress={() => {
                    if (selectedAddress) {
                      deleteAddress(selectedAddress.id);
                    }
                  }}
                >
                  {isLoading ? (
                    <CircularProgress size="sm" />
                  ) : (
                    "YEAAAAAAAAHHHHHHHHHHHHHH"
                  )}
                </Button>
                <Button color="danger" variant="ghost" onPress={onClose}>
                  Cancel
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
