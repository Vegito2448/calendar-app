import { Event } from "react-big-calendar";
import { User } from "./user";

export interface CustomEvent extends Event {
  id: number;
  notes: string;
  user?: User;
}