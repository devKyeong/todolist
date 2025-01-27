import { ITodo, toDoAtom, toDosAtom } from "@/atoms/todo";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Edit, Save } from "lucide-react";
import { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

export default function ToDo({
  id,
  type,
  title,
  description,
  state,
  regDate,
}: ITodo) {
  const setToDo = useSetRecoilState(toDoAtom);
  const setToDos = useSetRecoilState(toDosAtom);

  return (
    <AccordionItem value={`${id}`}>
      <AccordionTrigger>{title}</AccordionTrigger>
      <AccordionContent className="flex">
        <div className="description  w-[90%]">
          <Textarea
            className="border-none focus:outline-none resize-none scroll"
            placeholder="write description.."
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
              console.log(
                "event.currentTarget :  ",
                event.currentTarget.value
                //toDo
              );
              // setToDos((prev) =>
              //   prev.map((item) =>
              //     item.id === id
              //       ? { ...item, description: event.currentTarget.value }
              //       : item
              //   )
              // );

              // setToDo((prev) => ({
              //   ...prev,
              //   description: event.currentTarget.value,
              // }));
            }}
          ></Textarea>
        </div>
        <div className="button-box flex flex-col">
          <Button
            className="size-8 p-0"
            size="icon"
            variant="ghost"
            onClick={(event) => {
              setToDos((prev) =>
                prev.map((item) =>
                  item.id === id
                    ? { ...item, description: event.currentTarget.value }
                    : item
                )
              );

              // setToDo((prev) => ({
              //   ...prev,
              //   description: event.currentTarget.value,
              // }));
            }}
          >
            <Save className="size-4" />
            <span className="sr-only">Save</span>
          </Button>

          <Button className="size-8 p-0" size="icon" variant="ghost">
            <Trash2 className="size-4" />
            <span className="sr-only">Remove ToDo</span>
          </Button>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
