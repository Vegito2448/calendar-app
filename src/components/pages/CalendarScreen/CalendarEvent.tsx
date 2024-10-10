import { EventProps } from "react-big-calendar";
import { CustomEvent } from "../../../types";

export const CalendarEvent = ({ event }: EventProps<CustomEvent>) => {
  const { title, name, end } = event;

  return (
    <div>
      <span>{title}</span>
      <span>{name}</span>


    </div>
  );
};
