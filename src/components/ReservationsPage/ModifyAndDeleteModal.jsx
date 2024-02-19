import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { Form, Row } from "react-bootstrap";
import moment from "moment";
import {
  handleSingleReservation,
  handleDeleteReservation,
} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { getReservations } from "../../redux/actions";

const ModifyAndDeleteModal = ({
  onClose,
  selectedDate,
  isOpen,
  formattedDate,
  reservationData,
}) => {
  const { onClose: modalOnClose } = useDisclosure();
  const [haircuts, setHaircuts] = useState([]);
  const [beardcuts, setBeardcuts] = useState([]);
  const [selectedHaircut, setSelectedHaircut] = useState(null);
  const [selectedBeardcut, setSelectedBeardcut] = useState(null);
  const userId = useSelector((state) => state.me.userData.id);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isOpen) {
      fetchHaircuts();
      fetchBeardcuts();

      if (reservationData) {
        setSelectedHaircut(reservationData.haircutId);
        setSelectedBeardcut(reservationData.beardcutId);
      }
    }
  }, [isOpen, reservationData]);

  const fetchHaircuts = () => {
    fetch("http://localhost:3001/services", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setHaircuts(data.filter((service) => service.category === "capelli"));
        }
      })
      .catch((error) => {
        console.error("Errore durante il recupero dei tagli capelli:", error);
      });
  };

  const fetchBeardcuts = () => {
    fetch("http://localhost:3001/services", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setBeardcuts(data.filter((service) => service.category === "barba"));
        }
      })
      .catch((error) => {
        console.error("Errore durante il recupero dei tagli barba:", error);
      });
  };

  const handleCancel = () => {
    onClose();
    modalOnClose();
    setSelectedHaircut(null);
    setSelectedBeardcut(null);
  };

  //   const handleDelete = async () => {
  //     try {
  //       await dispatch(handleDeleteReservation(reservationData.id));
  //       handleCancel();
  //       Swal.fire({
  //         position: "center",
  //         icon: "success",
  //         title: "Prenotazione eliminata!",
  //         showConfirmButton: false,
  //         timer: 2000,
  //       });
  //       dispatch(getReservations());
  //     } catch (error) {
  //       console.error("Errore durante l'eliminazione della prenotazione:", error);
  //       // Aggiungi gestione degli errori se necessario
  //     }
  //   };

  return (
    <>
      <Modal backdrop="opaque" isOpen={isOpen} onClose={handleCancel}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            {selectedDate && moment(selectedDate).format("LLLL")}
            <p>
              <b>Prenotato da:</b>{" "}
              {reservationData.user.name + " " + reservationData.user.surname}
            </p>
          </ModalHeader>
          <ModalBody>
            <Form>
              <Row>
                <label htmlFor="haircut">
                  <b>Taglio capelli:</b>
                </label>
                <select
                  id="haircut"
                  name="haircut"
                  value={selectedHaircut || ""}
                  onChange={(e) =>
                    setSelectedHaircut(
                      e.target.value === "" ? null : e.target.value
                    )
                  }
                >
                  <option value="" disabled>
                    Seleziona un taglio capelli
                  </option>
                  {haircuts.map((haircut) => (
                    <option key={haircut.id} value={haircut.id}>
                      {haircut.name}
                    </option>
                  ))}
                </select>

                <label htmlFor="beardcut">
                  <b>Taglio barba:</b>
                </label>
                <select
                  id="beardcut"
                  name="beardcut"
                  value={selectedBeardcut || ""}
                  onChange={(e) =>
                    setSelectedBeardcut(
                      e.target.value === "" ? null : e.target.value
                    )
                  }
                >
                  <option value="" disabled>
                    Seleziona un taglio barba
                  </option>
                  {beardcuts.map((beardcut) => (
                    <option key={beardcut.id} value={beardcut.id}>
                      {beardcut.name}
                    </option>
                  ))}
                </select>
              </Row>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onClick={handleCancel}>
              Annulla
            </Button>
            {reservationData && (
              <>
                <Button color="danger" onClick={"handleDelete"}>
                  Elimina
                </Button>
                <Button
                  color="primary"
                  disabled={!selectedHaircut && !selectedBeardcut}
                  onClick={async () => {
                    try {
                      await dispatch(
                        handleSingleReservation(
                          formattedDate,
                          selectedHaircut,
                          selectedBeardcut,
                          userId
                        )
                      );
                      handleCancel();
                      Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Prenotazione modificata!",
                        showConfirmButton: false,
                        timer: 2000,
                      });
                      dispatch(getReservations());
                    } catch (error) {
                      console.error(
                        "Errore durante la modifica della prenotazione:",
                        error
                      );
                      // Aggiungi gestione degli errori se necessario
                    }
                  }}
                >
                  Modifica
                </Button>
              </>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModifyAndDeleteModal;
