import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Textarea,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useState } from "react";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { getProducts } from "../../redux/actions";

const AddProductModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [stock, setStock] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    const productData = {
      name,
      description,
      category,
      price,
      imageUrl,
      stock,
    };

    try {
      const response = await fetch("http://localhost:3001/products", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Prodotto salvato correttamente",
          showConfirmButton: false,
          timer: 2000,
        });
        onClose();
        dispatch(getProducts());
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Errore nel salvataggio del prodotto",
          showConfirmButton: false,
          timer: 2000,
        });
        console.error("Errore durante il salvataggio del prodotto");
      }
    } catch (error) {
      // Gestire gli errori di rete o del server
      console.error("Errore durante la richiesta:", error);
    }
  };

  return (
    <>
      <Button onPress={onOpen} color="primary">
        Inserisci nuovo prodotto
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onClose}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">
              Inserisci nuovo prodotto{" "}
            </ModalHeader>
            <ModalBody>
              <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                <Input
                  type="text"
                  label="Nome prodotto"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Select
                  label="Seleziona categoria"
                  className="max-w-xs"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <SelectItem key="capelli" value="capelli">
                    Capelli
                  </SelectItem>
                  <SelectItem key="barba" value="barba">
                    Barba
                  </SelectItem>
                  <SelectItem key="altro" value="altro">
                    Altro
                  </SelectItem>
                </Select>
                <Textarea
                  label="Descrizione prodotto"
                  placeholder="Massimo 255 caratteri"
                  className="max-w-xs"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <Input
                  type="number"
                  label="Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                <Input
                  type="text"
                  label="Indirizzo immagine"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
                <Input
                  type="number"
                  label="Quantità"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Annulla
              </Button>
              <Button color="primary" onPress={handleSubmit}>
                Inserisci
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
};
export default AddProductModal;
