import React from "react";
import { useSetRecoilState } from "recoil";
import { Categories, ITodo, todoState } from "../atmos";

function Todo({text, category, id}:ITodo){
  const setTodo = useSetRecoilState(todoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { currentTarget: {name}} = event;

    setTodo((oldTodos) => {
      const targetIndex = oldTodos.findIndex(todo => todo.id === id);
      const oldTodo = oldTodos[targetIndex];
      const newTodo = { text, id, category: name as any };

      return [...oldTodos.slice(0, targetIndex), newTodo, ...oldTodos.slice(targetIndex + 1)];
    })
  }

  return (
    <li>
      <span>{text}</span>
      {category !== Categories.TODO && <button name={Categories.TODO} onClick={onClick}>To do</button>}
      {category !== Categories.DOING && <button name={Categories.DOING} onClick={onClick}>Doing</button>}
      {category !== Categories.DONE && <button name={Categories.DONE} onClick={onClick}>Done</button>}
    </li>
  );
}

export default Todo;