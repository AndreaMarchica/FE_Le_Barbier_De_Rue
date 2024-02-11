import FullCalendar from "@fullcalendar/react";
import { useEffect, useRef, useState } from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import moment from "moment";
import "moment/locale/it";
import ReservationModal from "./ReservationModal";

const Reservations = () => {
  const calendarRef = useRef(null);

  const handleCustomButtonClick = () => {
    if (calendarRef.current) {
      calendarRef.current.getApi().gotoDate(moment().toISOString());
    }
  };
  const [events, setEvents] = useState([
    // Esempio di un evento
    {
      title: "Prenotato",
      start: "2024-02-09T10:00:00",
      end: "2024-02-09T10:30:00",
    },
  ]);
  useEffect(() => {
    // Configura moment per l'italiano
    moment.locale("it");
  }, []);

  const handleDateClick = (arg) => {
    const selectedDate = moment(arg.date);
    const currentDate = moment();
    // Controlla se la data selezionata è nel passato
    if (selectedDate.isBefore(currentDate, "day")) {
      alert("Non puoi prenotare nel passato!");
      return;
    }
    const title = prompt("Inserisci il nome del cliente:");
    if (title) {
      setEvents([
        ...events,
        {
          title,
          start: arg.date,
          end: moment(arg.date).add(30, "minutes").toDate(),
        },
      ]);

      // Mostra un alert di conferma
      alert("Prenotazione creata con successo!");
    }
  };
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
    </div>
  );
};
export default Reservations;
