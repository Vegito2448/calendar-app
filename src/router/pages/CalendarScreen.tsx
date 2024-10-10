import moment from "moment";
import { useState } from "react";
import { Calendar, EventPropGetter, momentLocalizer, View } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { AddNewFab, CalendarEvent, NavBar } from "../../components";
import { CalendarModal } from '../../components/pages/CalendarScreen/CalendarModal/CalendarModal';
import { DeleteEventFab } from '../../components/ui/DeleteEventFab';
import { useReduxStore } from "../../store/";
import { CustomEvent } from "../../types";
const localizer = momentLocalizer(moment);

const eventStyleGetter: EventPropGetter<CustomEvent> = () => {
  const style = {
    backgroundColor: '#367CF7',
    borderRadius: '0px',
    opacity: 0.8,
    display: 'block',
    color: 'white'
  };

  return {
    style

  };

};

export const CalendarScreen = () => {

  const { dispatch, calendar: { events: EventsList, activeEvent } } = useReduxStore();

  const [lastView, setLastView] = useState<View>(localStorage.getItem('lastView') as View || 'month');



  const onDoubleClick = () =>
    dispatch({ type: 'modal' });



  const onSelect = (event: CustomEvent) => {
    dispatch({ type: 'setActiveEvent', payload: event });
  };

  const onView = (view: View) => {

    localStorage.setItem('lastView', view);
    setLastView(view);

  };

  const onSelectSlot = () => {
    dispatch({ type: 'clearActiveEvent' });
  };

  return (
    <div
      className="calendar-screen"
    >
      <NavBar />
      <Calendar
        localizer={localizer}
        events={EventsList}
        startAccessor="start"
        endAccessor="end"
        eventPropGetter={eventStyleGetter}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onView}
        onSelectSlot={onSelectSlot}
        selectable
        view={lastView as View}
        components={{
          event: CalendarEvent
        }}
      />
      <AddNewFab
        onClick={() => dispatch({ type: 'modal' })}
      />
      {activeEvent && <DeleteEventFab
        onClick={() => dispatch({ type: 'deleteEvent' })}
      />}
      <CalendarModal />
    </div>
  );
};
