import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Accordion,
  AccordionItem,
} from "@nextui-org/react";
import { Form, Row } from "react-bootstrap";
import moment from "moment";
import { createSingleReservation } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { getReservations } from "../../redux/actions";
import { getCustomers } from "../../redux/actions";

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
  const [combos, setCombos] = useState([]);
  const [selectedHaircut, setSelectedHaircut] = useState(null);
  const [selectedCombo, setSelectedCombo] = useState(null);
  const [selectedBeardcut, setSelectedBeardcut] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedServiceType, setSelectedServiceType] = useState(null);
  const isAdmin = useSelector((state) => state.me.userData.role === "ADMIN");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customerList, setCustomerList] = useState([]);
  const [filteredCustomerList, setFilteredCustomerList] = useState([]);
  const userId = useSelector((state) => state.me.userData.id);
  const customersFromRedux = useSelector((state) => state.customers.customers);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isAdmin) {
      // Fetch della lista dei clienti solo se l'utente è un admin
      fetchCustomerList();
    }
  }, [isAdmin]);

  const fetchCustomerList = () => {
    dispatch(getCustomers())
      .then(() => {
        setCustomerList(customersFromRedux);
        console.log(customerList);
      })
      .catch((error) => {
        console.error("Errore durante il recupero della lista clienti:", error);
      });
  };
  useEffect(() => {
    console.log("customerList:", customerList);
    if (customerList) {
      setFilteredCustomerList(customerList);
    }
  }, [customerList]);

  useEffect(() => {
    if (isOpen) {
      // Esegui il fetch solo quando il modale è aperto
      fetchHaircuts();
      fetchBeardcuts();
      fetchCombos();
      // Riempire i select con i dati della prenotazione cliccata
      if (reservationData) {
        console.log("Dati di reservationData:", reservationData);

        // Popola i select con i nomi corrispondenti agli ID
        setSelectedHaircut(getServiceName(reservationData.haircutId, haircuts));
        setSelectedBeardcut(
          getServiceName(reservationData.beardcutId, beardcuts)
        );
        setSelectedCombo(getServiceName(reservationData.comboId, combos));
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

  const handleCancel = () => {
    onClose();
    modalOnClose();
    // Pulire i dati selezionati quando il modale viene chiuso
    setSelectedHaircut(null);
    setSelectedBeardcut(null);
    setSelectedCombo(null);
    setSelectedServiceType(null);
  };
  // Funzione per ottenere il nome corrispondente all'ID
  const getServiceName = (serviceId, services) => {
    const service = services.find((s) => s.id === serviceId);
    return service ? service.name : "";
  };
  const isButtonDisabled = () => {
    return selectedServices.length === 0;
  };

  return (
    <>
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onClose={handleCancel}
        className="myfont"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            {selectedDate && moment(selectedDate).format("LLLL")}
          </ModalHeader>
          <ModalBody>
            <Form>
              <Row>
                <Accordion variant="light">
                  {" "}
                  {isAdmin && (
                    <AccordionItem
                      key="admin-accordion"
                      aria-label="Selezione Cliente"
                      title="Selezione Cliente"
                    >
                      {/* Searchbar per la selezione del cliente */}
                      <Form.Group controlId="formCustomerSearch">
                        <Form.Control
                          type="text"
                          placeholder="Cerca cliente..."
                          onChange={(e) => {
                            // Implementa la logica per filtrare la lista dei clienti in base all'input della searchbar
                            const searchTerm = e.target.value.toLowerCase();
                            const filteredCustomers = customerList.filter(
                              (customer) =>
                                customer.name
                                  .toLowerCase()
                                  .includes(searchTerm) ||
                                customer.surname
                                  .toLowerCase()
                                  .includes(searchTerm)
                            );
                            // Aggiorna lo stato con la lista filtrata
                            setFilteredCustomerList(filteredCustomers);
                          }}
                        />
                      </Form.Group>

                      {/* Lista dei clienti */}
                      {filteredCustomerList.map((customer) => (
                        <div key={customer.id}>
                          <input
                            type="radio"
                            id={`customer-${customer.id}`}
                            name="customer"
                            checked={selectedCustomer === customer.id}
                            onChange={() => {
                              // Aggiorna lo stato quando viene selezionato un cliente
                              setSelectedCustomer(customer.id);
                            }}
                          />
                          <label htmlFor={`customer-${customer.id}`}>
                            {`${customer.name} ${customer.surname}`}
                          </label>
                        </div>
                      ))}
                    </AccordionItem>
                  )}
                  {/* Taglio Capelli */}
                  <AccordionItem
                    key="1"
                    aria-label="Taglio Capelli"
                    title="Taglio Capelli"
                    onClick={() => setSelectedServiceType("haircut")}
                  >
                    {haircuts.map((haircut) => (
                      <div key={haircut.id}>
                        <input
                          type="checkbox"
                          id={`haircut-${haircut.id}`}
                          name={`haircut-${haircut.id}`}
                          checked={
                            selectedServices.includes(haircut.id) &&
                            selectedServiceType === "haircut"
                          }
                          onChange={() => {
                            const serviceId = haircut.id; // Usa l'ID del servizio
                            setSelectedServiceType("haircut");
                            setSelectedServices([serviceId]);
                            setSelectedHaircut(serviceId);
                            setSelectedBeardcut(null); // Resetta il taglio barba
                            setSelectedCombo(null); // Resetta il combo
                          }}
                        />
                        <label htmlFor={`haircut-${haircut.id}`}>
                          {`${haircut.name} - ${haircut.price}€ - ${haircut.description}`}
                        </label>
                      </div>
                    ))}
                  </AccordionItem>
                  {/* Taglio Barba */}
                  <AccordionItem
                    key="2"
                    aria-label="Taglio Barba"
                    title="Taglio Barba"
                    onClick={() => setSelectedServiceType("beardcut")}
                  >
                    {beardcuts.map((beardcut) => (
                      <div key={beardcut.id}>
                        <input
                          type="checkbox"
                          id={`beardcut-${beardcut.id}`}
                          name={`beardcut-${beardcut.id}`}
                          checked={
                            selectedServices.includes(beardcut.id) &&
                            selectedServiceType === "beardcut"
                          }
                          onChange={() => {
                            const serviceId = beardcut.id; // Usa l'ID del servizio
                            setSelectedServiceType("beardcut");
                            setSelectedServices([serviceId]);
                            setSelectedHaircut(null); // Resetta il taglio capelli
                            setSelectedBeardcut(serviceId);
                            setSelectedCombo(null); // Resetta il combo
                          }}
                        />
                        <label htmlFor={`beardcut-${beardcut.id}`}>
                          {`${beardcut.name} - ${beardcut.price}€ - ${beardcut.description}`}
                        </label>
                      </div>
                    ))}
                  </AccordionItem>
                  {/* Combo */}
                  <AccordionItem
                    key="3"
                    aria-label="Combo"
                    title="Combo"
                    onClick={() => setSelectedServiceType("combo")}
                  >
                    {combos.map((combo) => (
                      <div key={combo.id}>
                        <input
                          type="checkbox"
                          id={`combo-${combo.id}`}
                          name={`combo-${combo.id}`}
                          checked={
                            selectedServices.includes(combo.id) &&
                            selectedServiceType === "combo"
                          }
                          onChange={() => {
                            const serviceId = combo.id; // Usa l'ID del servizio
                            setSelectedServiceType("combo");
                            setSelectedServices([serviceId]);
                            setSelectedHaircut(null); // Resetta il taglio capelli
                            setSelectedBeardcut(null); // Resetta il taglio barba
                            setSelectedCombo(serviceId); // Deselect haircuts and beardcuts when selecting combo
                          }}
                        />
                        <label htmlFor={`combo-${combo.id}`}>
                          {`${combo.name} - ${combo.price}€ - ${combo.description}`}
                        </label>
                      </div>
                    ))}
                  </AccordionItem>
                </Accordion>
                {selectedServiceType && selectedServices.length === 1 && (
                  <div className="mt-3">
                    <p>
                      Servizio selezionato:{" "}
                      {getServiceName(
                        selectedServices[0],
                        selectedServiceType === "haircut"
                          ? haircuts
                          : selectedServiceType === "beardcut"
                          ? beardcuts
                          : combos
                      )}
                    </p>
                  </div>
                )}
              </Row>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onClick={handleCancel}>
              Annulla
            </Button>
            <Button
              color="primary"
              disabled={isButtonDisabled()}
              style={{
                opacity: isButtonDisabled() ? 0.5 : 1,
                cursor: isButtonDisabled() ? "not-allowed" : "pointer",
              }}
              onClick={async () => {
                if (selectedServices.length === 1) {
                  // Ensure only one checkbox is selected
                  console.log(selectedServices);
                  console.log("Parametri prima di createSingleReservation:", {
                    formattedDate,
                    selectedHaircut,
                    selectedBeardcut,
                    selectedCombo,
                    userId,
                  });
                  await dispatch(
                    createSingleReservation(
                      formattedDate,
                      selectedHaircut,
                      selectedBeardcut,
                      selectedCombo,
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
                  setSelectedCombo(null);
                } else {
                  // Handle the case where more than one checkbox is selected (if needed)
                  console.log("Select only one service type at a time.");
                }
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
