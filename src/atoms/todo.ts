import { atom } from "recoil";

export interface ITodo {
  id: number;
  category: "common" | "private" | "work";
  title: string;
  state: "TO_DO" | "DOING" | "DONE";
  regDate: string;
}

export const toDoAtom = atom<ITodo>({ key: "toDo" });
export const toDosAtom = atom<ITodo[]>({ key: "toDos", default: [] });
