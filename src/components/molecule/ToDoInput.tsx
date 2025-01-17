import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { toDosAtom } from "../../atoms/todo";
//import styles from "./styles/ToDoInput.module.scss";
import { Plus } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormDescription,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";

interface IForm {
  toDo: string;
}

export default function ToDoInput() {
  const setToDos = useSetRecoilState(toDosAtom);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IForm>();

  const onInvalid = () => {};

  const onSubmit = ({ toDo }: IForm) => {
    console.log("toDo : ", toDo);
    setValue("toDo", "");
    setToDos((prev) => [
      {
        id: Date.now(),
        category: "private",
        title: toDo ?? "",
        regDate: new Date().toISOString().slice(0, 10).replace(/-/g, "."),
        state: "TO_DO",
      },
      ...prev,
    ]);
  };

  return (
    <form
      className="flex flex-col mx-auto my-20"
      onSubmit={handleSubmit(onSubmit, onInvalid)}
    >
      <div className="flex flex-row mx-auto my-5 h-10">
        <input
          className="bg-blend-color-burn"
          placeholder="What will you do..?"
          {...register("toDo", {
            required: "please write a to do...",
          })}
        />
        <button className="">
          <Plus />
        </button>
      </div>
      <h3>{errors?.toDo?.message}</h3>
    </form>
  );
}
