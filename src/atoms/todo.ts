import { atom } from "recoil";

export interface ITodo {
  id: number;
  type: "public" | "private";
  state: "TODO" | "DOING" | "DONE";
  title: string;
  description: string;
  regDate: string;
}

export const toDoAtom = atom<ITodo>({ key: "toDo" });
export const toDosAtom = atom<ITodo[]>({ key: "toDos", default: [] });
