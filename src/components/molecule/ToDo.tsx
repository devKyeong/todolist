import { ITodo } from "@/atoms/todo";

export default function Todo({ id, category, title, state, regDate }: ITodo) {
  return (
    <li>
      <h3>
        [{category}]{title}
      </h3>
    </li>
  );
}
