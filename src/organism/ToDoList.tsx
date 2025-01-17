import { useRecoilValue } from "recoil";
import { toDosAtom } from "../../atoms/todo";
import Todo from "../molecule/ToDo";

function ToDoList() {
  const toDos = useRecoilValue(toDosAtom);

  return (
    <ul>
      {toDos.map((toDo) => (
        <Todo {...toDo} />
      ))}
    </ul>
  );
}

export default ToDoList;
