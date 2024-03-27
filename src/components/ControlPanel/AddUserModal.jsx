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
} from "@nextui-org/react";
import { useState } from "react";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { getCustomers } from "../../redux/actions";

const AddUserModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    const userData = {
      name,
      surname,
      username,
      dateOfBirth,
      email,
      password,
      phoneNumber,
    };

    try {
      const response = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Utente salvato correttamente",
          showConfirmButton: false,
          timer: 2000,
        });
        onClose();
        dispatch(getCustomers());
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Errore nel salvataggio dell'utente",
          showConfirmButton: false,
          timer: 2000,
        });
        console.error("Errore durante il salvataggio dell'utente");
      }
    } catch (error) {
      // Gestire gli errori di rete o del server
      console.error("Errore durante la richiesta:", error);
    }
  };

  return (
    <>
      <Button onPress={onOpen} color="primary">
        Inserisci nuovo utente
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
              Inserisci nuovo utente{" "}
            </ModalHeader>
            <ModalBody>
              <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                <Input
                  type="text"
                  label="Nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Input
                  type="text"
                  label="Cognome"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                />
                <Input
                  type="text"
                  label="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <Input
                  type="date"
                  label="Data di nascita"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                />
                <Input
                  type="email"
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  type="password"
                  label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Input
                  type="number"
                  label="Numero di telefono"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
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
export default AddUserModal;
