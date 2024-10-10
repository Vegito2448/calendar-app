import { produce } from "immer";
import moment from "moment";
import { create } from "zustand";
import { devtools, redux } from "zustand/middleware";
import { CustomEvent } from "../types";


interface State {
  ui: {
    modal: {
      open: boolean;
    };
  };
  calendar: {
    events: CustomEvent[];
    activeEvent: CustomEvent | null;
  };
}


interface ActionMap {
  modal: boolean;
  addNewEvent: CustomEvent;
  updateEvent: CustomEvent;
  deleteEvent: CustomEvent;
  setActiveEvent: CustomEvent;
  clearActiveEvent: null;
}

type Action<K extends keyof ActionMap> = {
  type: K;
  payload?: ActionMap[K];
};


const initialState: State = {
  ui: {
    modal: {
      open: false
    }
  },
  calendar: {
    events: [{
      id: 0,
      title: 'All Day Event very long title',
      start: moment().toDate(),
      end: moment().add(1, 'h').toDate(),
      user: {
        name: 'User 1',
        email: 'user@example.com',
        id: 1,
        role: 'admin'
      }
    }] as CustomEvent[],
    activeEvent: null as CustomEvent | null
  }
};

const reducer = (state: State, action: Action<keyof ActionMap>) =>
  produce(state, draft => {
    switch (action.type) {
      case 'modal':
        draft.ui.modal.open = !draft.ui.modal.open;
        break;
      case 'setActiveEvent':
        draft.calendar.activeEvent = action.payload as CustomEvent;
        break;
      case 'addNewEvent':
        draft.calendar.events.push(action.payload as CustomEvent);
        break;
      case 'updateEvent': {
        const { id } = action.payload as CustomEvent;
        draft.calendar.events = draft.calendar.events.map(event =>
          event.id === id ? action.payload as CustomEvent : event
        );
        break;
      }
      case 'clearActiveEvent':
        draft.calendar.activeEvent = null;
        break;
      case 'deleteEvent': {
        const id = draft.calendar?.activeEvent?.id;
        draft.calendar.events = draft.calendar.events.filter(event => event.id !== id);
        draft.calendar.activeEvent = null;
        break;
      }
      default:
        break;
    }
  });

export const useReduxStore = create(devtools(redux(reducer, initialState,)));

