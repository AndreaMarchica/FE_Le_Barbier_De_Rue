import FullCalendar from "@fullcalendar/react";
import { useEffect, useRef, useState } from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import moment from "moment";
import "moment/locale/it";
import ReservationModal from "./ReservationModal";
import { useDisclosure } from "@nextui-org/react";
import { getReservations } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import ModifyAndDeleteModal from "./ModifyAndDeleteModal";

const Reservations = () => {
  const calendarRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
  const [isModifyAndDeleteModalOpen, setIsModifyAndDeleteModalOpen] =
    useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const formattedDate = selectedDate
    ? selectedDate.format("YYYY-MM-DDTHH:mm:ss")
    : null;

  const reservationsDataFromRedux = useSelector(
    (state) => state.reservations.reservations
  );
  const [events, setEvents] = useState(reservationsDataFromRedux);
  const handleCustomButtonClick = () => {
    if (calendarRef.current) {
      calendarRef.current.getApi().gotoDate(moment().toISOString());
    }
  };

  useEffect(() => {
    // Configura moment per l'italiano
    moment.locale("it");
    dispatch(getReservations());
  }, []);

  useEffect(() => {
    if (Array.isArray(reservationsDataFromRedux)) {
      const reservations = reservationsDataFromRedux.map((reservation) => ({
        title: "Prenotato",
        start: reservation.reservationDate,
        end: moment(reservation.reservationDate)
          .add(30, "minutes")
          .toISOString(),
      }));
      setEvents(reservations);
    }
  }, [reservationsDataFromRedux]);

  const handleDateClick = (arg) => {
    const selectedDate = moment(arg.date || arg.start);
    const currentDate = moment();
    // Controlla se la data selezionata è nel passato
    if (selectedDate.isBefore(currentDate, "day")) {
      alert("Non puoi prenotare nel passato!");
      return;
    }
    // Salva la data selezionata nello stato
    setSelectedDate(selectedDate);

    // Apri il modale
    console.log("Modal should open now.");
    onOpen();
    setIsReservationModalOpen(true);
  };

  const handleEventClick = (arg) => {
    const reservationData = reservationsDataFromRedux.find((reservation) =>
      moment(reservation.reservationDate).isSame(arg.event.start, "minute")
    );

    // Imposta il dato dell'evento selezionato nello state e apri il nuovo modale
    if (reservationData) {
      setSelectedEvent(reservationData);
      setIsModifyAndDeleteModalOpen(true);
      console.log(reservationData);
    }
  };

  /*   const handleModalClose = () => {
    // Chiudi il modale
    console.log("Closing modal.");
    onClose();
    // Pulisci la data selezionata
    setSelectedDate(null);
  }; */
  return (
    <div className="p-5">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: "prev,next",
          center: "title",
          right: "customButton", // Usa il pulsante personalizzato
        }}
        customButtons={{
          customButton: {
            text: "Oggi",
            click: handleCustomButtonClick,
          },
        }}
        ref={calendarRef}
        initialView="timeGridWeek"
        editable={false} // Per abilitare la trascinabilità degli eventi, con false impedisce di allungare la durata
        selectable={true} // Per abilitare la selezione di nuovi eventi cliccando sulle celle
        selectMirror={true}
        dayMaxEvents={true}
        events={events}
        dateClick={handleDateClick}
        eventClick={handleEventClick} // Aggiungi la funzione eventClick
        locale="it" // Imposta la localizzazione in italiano
        slotLabelFormat={{
          hour: "numeric",
          minute: "2-digit",
          omitZeroMinute: false,
          meridiem: "short",
        }}
        slotDuration="00:30:00" // Imposta la durata degli slot a 30 minuti
        defaultTimedEventDuration="00:30:00" // Imposta la durata predefinita degli eventi temporizzati a 30 minuti
        firstDay={1} // Imposta il lunedì come primo giorno della settimana
        businessHours={{
          // Imposta gli orari di apertura del barbiere
          daysOfWeek: [2, 3, 4, 5, 6], // Martedì - Sabato
          startTime: "09:00", // Ore di apertura
          endTime: "19:00", // Ore di chiusura
        }}
        hiddenDays={[0, 1]} // Nascondi la domenica e il lunedì
        slotMinTime="09:00" // Nascondi le ore precedenti alle 9:00
        slotMaxTime="19:00" // Nascondi le ore successive alle 18:00
        allDaySlot={false} // Imposta allDaySlot su false per nascondere l'opzione All-day
        slotLabelInterval={{ minutes: 30 }} // Imposta l'intervallo tra le etichette degli orari
        contentHeight="auto" // Imposta l'altezza del contenuto su 'auto'
      />
      {/* Usa il ReservationModal solo per dateClick */}
      {selectedDate && (
        <ReservationModal
          onClose={() => {
            setSelectedDate(null);
            setIsReservationModalOpen(false);
          }}
          selectedDate={selectedDate}
          isOpen={isReservationModalOpen}
          formattedDate={formattedDate}
        />
      )}

      {/* Usa il nuovo modale solo per eventClick */}
      {selectedEvent && (
        <ModifyAndDeleteModal
          onClose={() => {
            setSelectedEvent(null);
            setIsModifyAndDeleteModalOpen(false);
          }}
          selectedDate={selectedEvent.reservationDate}
          isOpen={isModifyAndDeleteModalOpen}
          formattedDate={formattedDate}
          reservationData={selectedEvent}
        />
      )}
    </div>
  );
};
export default Reservations;
