import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, todoState } from "../atmos";

interface IForm {
  todo: string;
}

function CreateTodo(){
  const setTodos = useSetRecoilState(todoState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onSubmit = ({todo}:IForm) => {
    setTodos((oldTodos) => [{text: todo, id:Date.now(), category}, ...oldTodos]);
    setValue("todo", "");
  };  

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("todo",{
        required: "Write Todo!",
      })} placeholder="Write a todo" />
      <button>Add</button>
    </form>
  )
}

export default CreateTodo;