import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { ITodo, toDosAtom } from "@/atoms/todo";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
//import styles from "./styles/ToDoInput.module.scss";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { z } from "zod";

const schema = z.object({
  title: z.string(),
  type: z.enum(["private", "public"]),
});

export default function ToDoForm() {
  const setToDos = useSetRecoilState(toDosAtom);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      type: "private",
    },
  });

  const onInvalid = () => {};

  const onSubmit = ({ title, type }: z.infer<typeof schema>) => {
    console.log("Todo: ", { title, type });
    form.setValue("title", "");
    form.setValue("type", "private");
    setToDos((prev) => [
      {
        id: Date.now(),
        type,
        title,
        description: "",
        regDate: new Date().toISOString().slice(0, 10).replace(/-/g, "."),
        state: "TODO",
      },
      ...prev,
    ]);
  };

  const onTypeChange = (value: ITodo["state"]) => {
    console.log("selected type : ", value);
  };
  return (
    <Card className="w-full m-auto max-w-3xl">
      <CardHeader className="text-2xl font-bold text-center">
        My Todo List
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="flex flex-col mx-auto"
            onSubmit={form.handleSubmit(onSubmit, onInvalid)}
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>ToDo</FormLabel> */}
                  <FormControl>
                    <div className="flex ">
                      <Select onValueChange={onTypeChange}>
                        <SelectTrigger className="w-[150px]">
                          <SelectValue placeholder="Todo Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="private">Private</SelectItem>
                          <SelectItem value="public">Public</SelectItem>
                        </SelectContent>
                      </Select>

                      <Input
                        className="mx-1"
                        placeholder="Write toDo.."
                        {...field}
                      />

                      <Button size="icon">
                        <Plus className="size-4" />
                        <span className="sr-only">Add todo</span>
                      </Button>
                    </div>
                  </FormControl>
                  <FormDescription />
                  <FormMessage>
                    {form.formState.errors?.title?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
