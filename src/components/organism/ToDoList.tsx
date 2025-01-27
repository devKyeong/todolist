import { toDosAtom } from "@/atoms/todo";
import ToDoAccordionItem from "@/components/molecule/ToDo";
import { Accordion } from "@/components/ui/accordion";
import { useRecoilValue } from "recoil";

export default function ToDoList() {
  const toDos = useRecoilValue(toDosAtom);

  return (
    <>
      <Accordion
        type="single"
        collapsible
        className="w-[60%] mx-auto my-10 p-5 border-solid"
      >
        {toDos.map((toDo) => (
          <ToDoAccordionItem key={toDo.id} {...toDo} />
        ))}
      </Accordion>
    </>
  );
}
