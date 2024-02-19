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
import { handleSingleReservation } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { getReservations } from "../../redux/actions";

const ReservationModal = ({
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
  // const postPayload = {
  //   reservationDate: selectedDate,
  //   haircutType: selectedHaircut,
  //   beardcutType: selectedHaircut,
  //   userId: userId,
  // };

  useEffect(() => {
    if (isOpen) {
      // Esegui il fetch solo quando il modale è aperto
      fetchHaircuts();
      fetchBeardcuts();
      // Riempire i select con i dati della prenotazione cliccata
      if (reservationData) {
        // Popola i select con i nomi corrispondenti agli ID
        setSelectedHaircut(getServiceName(reservationData.haircutId, haircuts));
        setSelectedBeardcut(
          getServiceName(reservationData.beardcutId, beardcuts)
        );
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
        console.log("Haircuts data:", data);
        if (Array.isArray(data)) {
          setHaircuts(data.filter((service) => service.category === "capelli"));
        } else {
          console.error("I dati ricevuti non sono un array:", data);
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
        console.log("Beardcuts data:", data);
        if (Array.isArray(data)) {
          setBeardcuts(data.filter((service) => service.category === "barba"));
        } else {
          console.error("I dati ricevuti non sono un array:", data);
        }
      })
      .catch((error) => {
        console.error("Errore durante il recupero dei tagli barba:", error);
      });
  };
  const handleCancel = () => {
    onClose();
    modalOnClose();
    // Pulire i dati selezionati quando il modale viene chiuso
    setSelectedHaircut(null);
    setSelectedBeardcut(null);
  };
  const handleDelete = async () => {
    // Aggiungi la logica per eliminare la prenotazione qui
    console.log("Elimina la prenotazione");
    handleCancel();
  };
  // Funzione per ottenere il nome corrispondente all'ID
  const getServiceName = (serviceId, services) => {
    const service = services.find((s) => s.id === serviceId);
    return service ? service.name : "";
  };

  return (
    <>
      <Modal backdrop="opaque" isOpen={isOpen} onClose={handleCancel}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            {selectedDate && moment(selectedDate).format("LLLL")}
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
              <Button
                color="danger"
                onClick={() => {
                  // Aggiungi qui la logica per eliminare la prenotazione
                  console.log("Elimina la prenotazione");
                  handleCancel();
                }}
              >
                Elimina
              </Button>
            )}
            <Button
              color="primary"
              disabled={!selectedHaircut && !selectedBeardcut} // Disabilita se entrambi sono null
              onClick={async () => {
                await dispatch(
                  handleSingleReservation(
                    formattedDate,
                    selectedHaircut,
                    selectedBeardcut,
                    userId
                  )
                );
                handleCancel(); // Chiudi il modale dopo la prenotazione
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Prenotazione salvata!",
                  showConfirmButton: false,
                  timer: 2000,
                });
                dispatch(getReservations());
                setSelectedHaircut(null);
                setSelectedBeardcut(null);
              }}
            >
              Prenota
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default ReservationModal;
