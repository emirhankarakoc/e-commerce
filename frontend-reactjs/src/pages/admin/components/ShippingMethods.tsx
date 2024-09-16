import React, { useState, useEffect } from "react";
import {
  Button,
  Input,
  Card,
  CardBody,
  CardFooter,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  CircularProgress,
} from "@nextui-org/react";
import { useDisclosure } from "@nextui-org/react";
import { http, httpError } from "@/assets/http";

export const ShippingMethods = () => {
  const [shippingMethods, setShippingMethods] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [cost, setCost] = useState("");

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

  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetchShippingMethods = async () => {
      try {
        const response = await http.get("/shippingmethods");
        setShippingMethods(response.data);
      } catch (e) {
        httpError(e);
      }
    };
    fetchShippingMethods();
  }, []);

  useEffect(() => {
    if (selectedMethod) {
      setName(selectedMethod.name);
      setDescription(selectedMethod.description);
      setCost(selectedMethod.cost);
    }
  }, [selectedMethod]);

  const handleUpdateShippingMethod = async () => {
    if (!selectedMethod) return;

    const updatedMethod = { name, description, cost };

    try {
      const response = await http.put(
        "/admins/shipping-methods/" + selectedMethod.id!,
        updatedMethod
      );
      const updatedShippingMethod = response.data;

      // UI'da güncelleme
      setShippingMethods((prevMethods) =>
        prevMethods.map((method) =>
          method.id === updatedShippingMethod.id
            ? updatedShippingMethod
            : method
        )
      );
    } catch (e) {
      httpError(e);
    }

    setSelectedMethod(null);
    onEditOpenChange(false);
  };

  const handleAddShippingMethod = async () => {
    const newMethod = { name, description, cost };

    try {
      const response = await http.post("/admins/shipping-methods", newMethod);
      const addedMethod = response.data;

      // UI'ya yeni eklenen methodu ekle
      setShippingMethods((prevMethods) => [...prevMethods, addedMethod]);
    } catch (e) {
      httpError(e);
    }

    onAddOpenChange(false);
  };

  const handleDeleteShippingMethod = async (id) => {
    setLoading(true);

    try {
      await http.delete(`/admins/shipping-methods/${id}`);
      // UI'dan silinen methodu çıkar
      setShippingMethods((prevMethods) =>
        prevMethods.filter((method) => method.id !== id)
      );
    } catch (e) {
      httpError(e);
    } finally {
      setLoading(false);
    }

    setSelectedMethod(null);
    onDeleteOpenChange(false);
  };

  return (
    <div className="border-danger-600 border-2 rounded-3xl p-5 m-5">
      <h1 className="text-3xl font-bold font-sfpro p-5 text-center rounded-t-3xl">
        Shipping Methods
      </h1>
      <div className="grid grid-cols-2 gap-4">
        {/* Shipping Method List */}
        <div>
          {shippingMethods?.length === 0 ? (
            <div className="text-center text-lg">
              <p>No shipping methods available. Add a new one.</p>
              <Button className="bg-danger-500" onPress={onAddOpen}>
                Add
              </Button>
            </div>
          ) : (
            shippingMethods.map((method) => (
              <Card key={method.id} className="my-4">
                <CardBody>
                  <p className="font-bold text-2xl">{method.name}</p>
                  <p>Description: {method.description}</p>
                  <p>Cost: ${method.cost}</p>
                </CardBody>
                <CardFooter>
                  <Button
                    className="bg-danger-500"
                    onClick={() => {
                      setSelectedMethod(method);
                      onEditOpen();
                    }}
                  >
                    Edit
                  </Button>
                </CardFooter>
              </Card>
            ))
          )}
          {shippingMethods?.length !== 0 && (
            <div className="grid place-items-center">
              <Button className="bg-danger-500" onPress={onAddOpen}>
                Add Another
              </Button>
            </div>
          )}
        </div>

        {/* Shipping Method Edit Form */}
        <div className="border-l-2 border-danger-600 pl-4">
          {selectedMethod ? (
            <div className="mt-4">
              <Input
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mb-4"
              />
              <Input
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mb-4"
              />
              <Input
                label="Cost (Don't put $ symbol. Just write value)"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                className="mb-4"
              />
              <div className="flex gap-10">
                <Button
                  fullWidth
                  onClick={handleUpdateShippingMethod}
                  className="bg-danger-500"
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
              Select a shipping method to edit.
            </div>
          )}
        </div>
      </div>

      {/* Add Shipping Method Modal */}
      <Modal isOpen={isAddOpen} onOpenChange={onAddOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Add New Shipping Method</ModalHeader>
              <ModalBody>
                <Input
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mb-4"
                />
                <Input
                  label="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mb-4"
                />
                <Input
                  label="Cost (Don't put $ symbol. Just write value)"
                  value={cost}
                  onChange={(e) => setCost(e.target.value)}
                  className="mb-4"
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  fullWidth
                  className="bg-danger-500"
                  onPress={handleAddShippingMethod}
                >
                  Add Shipping Method
                </Button>
                <Button color="danger" variant="ghost" onPress={onClose}>
                  Cancel
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Delete Shipping Method Modal */}
      <Modal isOpen={isDeleteOpen} onOpenChange={onDeleteOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Delete Shipping Method</ModalHeader>
              <ModalBody>
                <p>Are you sure you want to delete this shipping method?</p>
              </ModalBody>
              <ModalFooter>
                <Button
                  fullWidth
                  className="bg-danger-500"
                  onPress={() => {
                    if (selectedMethod) {
                      handleDeleteShippingMethod(selectedMethod.id);
                    }
                  }}
                >
                  {isLoading ? <CircularProgress size="sm" /> : "Delete"}
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
};
