import React, { useState } from "react";
import { useForm } from "react-hook-form";

// function TodoList(){
//   const [todo, setTodo] = useState("");
//   const onChange = (event:React.FormEvent<HTMLInputElement>) => {
//     const {
//       currentTarget : { value }
//     } = event;
//     setTodo(value);
//   };

//   const onSubmit = (event:React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     console.log(todo);
//   };

//   return <div>
//     <form onSubmit={onSubmit}>
//       <input onChange={onChange} value={todo} placeholder="Write a todo" />
//       <button>Add</button>
//     </form>
//   </div>;
// }

function TodoList(){
  const { register, handleSubmit, formState } = useForm();
  
  const onValid = (data:any) => {

  }

  return (
    <div>
      <form onSubmit={handleSubmit(onValid)}>
        <input {...register("Email")} placeholder="Email" />
        <button>Add</button>
      </form>
    </div>
  );
}

export default TodoList;