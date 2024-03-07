import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Button,
  useDisclosure,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import moment from "moment";
import { deleteSingleReservation } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { getReservations } from "../../redux/actions";

const ModifyAndDeleteModal = ({
  onClose,
  selectedDate,
  isOpen,
  reservationData,
}) => {
  const { onClose: modalOnClose } = useDisclosure();
  const [haircuts, setHaircuts] = useState([]);
  const [beardcuts, setBeardcuts] = useState([]);
  const [combos, setCombos] = useState([]);
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

  return (
    <>
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onClose={handleCancel}
        className="myfont"
        placement="center"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            {selectedDate && moment(selectedDate).format("LLLL")}
            <p className="pt-3">
              <b>Prenotato da:</b>
              <br />{" "}
              <Popover placement="bottom">
                <PopoverTrigger>
                  {reservationData.user.name +
                    " " +
                    reservationData.user.surname}
                </PopoverTrigger>
                <PopoverContent>
                  <div className="px-1 py-2 flex flex-col align-items-center myfont">
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
                <b>Servizio prenotato:</b>
                <br></br>{" "}
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
          <ModalFooter>
            <Button color="danger" variant="light" onClick={handleCancel}>
              Annulla
            </Button>
            {reservationData && (
              <>
                <Button
                  color="danger"
                  onClick={async () => {
                    try {
                      await dispatch(
                        deleteSingleReservation(
                          reservationData,
                          selectedHaircut,
                          selectedBeardcut,
                          selectedCombo,
                          userId
                        )
                      );
                      handleCancel();
                      Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Prenotazione eliminata!",
                        showConfirmButton: false,
                        timer: 2000,
                      });
                      dispatch(getReservations());
                    } catch (error) {
                      console.error(
                        "Errore durante la modifica della prenotazione:",
                        error
                      );
                    }
                  }}
                >
                  Elimina
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
