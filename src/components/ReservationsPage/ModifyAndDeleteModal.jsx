import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  AccordionItem,
  Accordion,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import { Form, Row } from "react-bootstrap";
import moment from "moment";
import { handleSingleReservation } from "../../redux/actions";
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
  const [combos, setCombos] = useState([]);
  const [selectedService, setSelectedService] = useState(null);

  const [selectedHaircut, setSelectedHaircut] = useState(null);
  const [selectedBeardcut, setSelectedBeardcut] = useState(null);
  const [selectedCombo, setSelectedCombo] = useState(null);

  const userId = useSelector((state) => state.me.userData.id);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isOpen) {
      fetchHaircuts();
      fetchBeardcuts();
      fetchCombos();

      if (reservationData) {
        setSelectedHaircut(reservationData.haircutId);
        setSelectedBeardcut(reservationData.beardcutId);
        setSelectedCombo(reservationData.comboId);
      }
      const serviceId =
        reservationData.haircutId ||
        reservationData.beardcutId ||
        reservationData.comboId;
      setSelectedService(serviceId);
    }
  }, [isOpen, reservationData]);

  const handleCheckboxChange = (serviceId) => {
    setSelectedService(serviceId);
    setSelectedHaircut(null);
    setSelectedBeardcut(null);
    setSelectedCombo(null);

    // Aggiorna la selezione del servizio specifico
    if (haircuts.some((haircut) => haircut.id === serviceId)) {
      setSelectedHaircut(serviceId);
    } else if (beardcuts.some((beardcut) => beardcut.id === serviceId)) {
      setSelectedBeardcut(serviceId);
    } else if (combos.some((combo) => combo.id === serviceId)) {
      setSelectedCombo(serviceId);
    }
  };

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
  const fetchCombos = () => {
    fetch("http://localhost:3001/services", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCombos(data.filter((service) => service.category === "combo"));
        } else {
          console.error("I dati ricevuti non sono un array:", data);
        }
      })
      .catch((error) => {
        console.error("Errore durante il recupero dei tagli combo:", error);
      });
  };
  // Funzione per ottenere il nome corrispondente all'ID
  const getServiceName = (serviceId, services) => {
    const service = services.find((s) => s.id === serviceId);
    return service ? service.name : "";
  };

  const handleCancel = () => {
    onClose();
    modalOnClose();
    setSelectedHaircut(null);
    setSelectedBeardcut(null);
    setSelectedCombo(null);
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
              <Popover placement="bottom">
                <PopoverTrigger>
                  {reservationData.user.name +
                    " " +
                    reservationData.user.surname}
                </PopoverTrigger>
                <PopoverContent>
                  <div className="px-1 py-2 flex flex-col align-items-center ">
                    <div>
                      <img
                        src={reservationData.user.avatar}
                        alt="avatar"
                        className="text-center rounded-circle"
                      />
                    </div>
                    <div className="text-small font-bold">
                      {reservationData.user.phoneNumber}
                    </div>
                    <div className="text-tiny">
                      {reservationData.user.email}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </p>
            {reservationData && (
              <p>
                <b>Servizio prenotato:</b>{" "}
                {reservationData.haircutId
                  ? getServiceName(reservationData.haircutId, haircuts)
                  : reservationData.beardcutId
                  ? getServiceName(reservationData.beardcutId, beardcuts)
                  : reservationData.comboId
                  ? getServiceName(reservationData.comboId, combos)
                  : "Servizio non specificato"}
              </p>
            )}
          </ModalHeader>
          <ModalBody>
            <Form>
              <Row>
                <Accordion variant="light">
                  {/* Taglio Capelli */}
                  <AccordionItem
                    key="1"
                    aria-label="Taglio Capelli"
                    title="Taglio Capelli"
                  >
                    {haircuts.map((haircut) => (
                      <div key={haircut.id}>
                        <input
                          type="checkbox"
                          id={`haircut-${haircut.id}`}
                          name={`haircut-${haircut.id}`}
                          checked={selectedHaircut === haircut.id}
                          onChange={() => handleCheckboxChange(haircut.id)}
                        />
                        {`${haircut.name} - ${haircut.price}€ - ${haircut.description}`}
                      </div>
                    ))}
                  </AccordionItem>
                  {/* Taglio Barba */}
                  <AccordionItem
                    key="2"
                    aria-label="Taglio Barba"
                    title="Taglio Barba"
                  >
                    {beardcuts.map((beardcut) => (
                      <div key={beardcut.id}>
                        <input
                          type="checkbox"
                          id={`beardcut-${beardcut.id}`}
                          name={`beardcut-${beardcut.id}`}
                          checked={selectedBeardcut === beardcut.id}
                          onChange={() => handleCheckboxChange(beardcut.id)}
                        />
                        {`${beardcut.name} - ${beardcut.price}€ - ${beardcut.description}`}
                      </div>
                    ))}
                  </AccordionItem>

                  {/* Combo */}
                  <AccordionItem key="3" aria-label="Combo" title="Combo">
                    {combos.map((combo) => (
                      <div key={combo.id}>
                        <input
                          type="checkbox"
                          id={`combo-${combo.id}`}
                          name={`combo-${combo.id}`}
                          checked={selectedCombo === combo.id}
                          onChange={() => handleCheckboxChange(combo.id)}
                        />
                        {`${combo.name} - ${combo.price}€ - ${combo.description}`}
                      </div>
                    ))}
                  </AccordionItem>
                </Accordion>
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
