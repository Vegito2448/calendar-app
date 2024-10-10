import moment from "moment";
import { FormEventHandler, useEffect } from "react";
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import { FaSave } from "react-icons/fa";
import Modal from 'react-modal';
import { useForm } from "../../../../hooks";
import { useReduxStore } from "../../../../store";
import './modal.css';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

const startDateTime = moment().minutes(0).seconds(0).add(1, 'hours');

const endDateTime = startDateTime.clone().add(1, 'hours');

const initialForm = {
  initialState: {
    title: 'Evento',
    notes: '',
    start: startDateTime.toDate(),
    end: endDateTime.toDate()
  }
};

const validate = (field: keyof typeof initialForm.initialState, values: typeof initialForm.initialState) => {
  const value = values[field];
  const { start, end } = values;
  switch (field) {
    case 'title':
      if (typeof value === 'string' && value.trim().length < 2) {
        return 'Title is required';
      }
      break;
    case 'start':
      if (!value) {
        return 'Start date is required';
      }
      if (moment(value).isSameOrAfter(end)) {
        return 'Start date has to be before end date';
      }
      break;
    case 'end':
      if (!value) {
        return 'End date is required';
      }
      if (moment(value).isSameOrBefore(start)) {
        return 'End date has to be after start date';
      }
      break;
    case 'notes':
      if (typeof value === 'string' && value.trim().length! < 2) {
        return 'Notes is required';
      }
      break;

    default:
      break;
  }
  return null;
};

export const CalendarModal = () => {

  const { ui: { modal: { open: modalIsOpen } }, calendar: { activeEvent }, dispatch } = useReduxStore();


  const { handleChange, values, errors, isValidForm, resetForm, setFormData } = useForm({
    initialState: initialForm.initialState,
    validate
  });

  const { end, start, title, notes } = values;

  const { titleError, startError, endError, notesError } = errors;

  useEffect(() => {

    if (activeEvent) {
      const { title, notes, start, end } = activeEvent;

      setFormData({
        title: title as string,
        notes,
        start: moment(start).toDate(),
        end: moment(end).toDate(),
      });

    } else {
      resetForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeEvent]);


  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }

  function closeModal() {
    dispatch({ type: 'clearActiveEvent' });
    dispatch({ type: 'modal' });
    resetForm();
  }

  const handleChangeDate = (value: Date | null, name: keyof typeof initialForm.initialState) => {
    handleChange({
      target: {
        name,
        value
      }
    });
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();


    if (!isValidForm())
      return;

    if (activeEvent) {

      dispatch({
        type: 'updateEvent', payload: {
          ...activeEvent,
          ...values,
          start: moment(start).toDate(),
          end: moment(end).toDate(),
        }
      });


    } else {

      dispatch({
        type: 'addNewEvent', payload: {
          ...values,
          start: moment(start).toDate(),
          end: moment(end).toDate(),
          id: new Date().getTime(),
        }
      });
    }

    closeModal();
  };

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        className="modal"
        overlayClassName="modal-fondo"
        closeTimeoutMS={200}
      >
        <h1>{activeEvent ? 'Edit Event' : 'Nuevo evento'}</h1>
        <hr />
        <form
          className="container"
          onSubmit={handleSubmit}
        >

          <div className="form-group mb-2">
            <label>Fecha y hora inicio</label>
            <DateTimePicker
              onChange={(value) => handleChangeDate(value, 'start')}
              value={start}
              maxDate={moment(end).subtract(1, 'minute').toDate() || undefined}
              className="form-control"
              required
            />
            {startError && <small className="text-danger">{startError}</small>}
          </div>

          <div className="form-group mb-2">
            <label>Fecha y hora fin</label>
            <DateTimePicker
              onChange={(value) => handleChangeDate(value, 'end')}
              value={end}
              minDate={moment(start).add(1, 'minute').toDate() || undefined}
              className="form-control"
              required
            />
            {endError && <small className="text-danger">{endError}</small>}
          </div>

          <hr />
          <div className="form-group mb-2">
            <label>Titulo y notas</label>
            <input
              type="text"
              className={`form-control ${titleError && 'is-invalid'}`}
              placeholder="Título del evento"
              name="title"
              autoComplete="off"
              value={title}
              onChange={handleChange}
              required
            />
            <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
          </div>

          <div className="form-group mb-2">
            <textarea
              className={`form-control ${notesError && 'is-invalid'}`}
              placeholder="Notas"
              rows={5}
              name="notes"
              value={notes}
              onChange={handleChange}
              required
            />
            <small id="emailHelp" className="form-text text-muted">Información adicional</small>
          </div>

          <button
            type="submit"
            className="btn btn-outline-primary btn-block w-100 mt-2"
          >
            <FaSave />
            <span> Guardar</span>
          </button>

        </form>
      </Modal>



    </div>
  );
};
