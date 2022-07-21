import { Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { ITodo, todoState } from "../atmos";
import DragabbleCard from "../Components/DragabbleCard";

const Wrapper = styled.div`
  padding-top: 20px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BoardName = styled.h1`
  font-weight: 700;
  margin-bottom: 10px;
`;

interface IAreaProps {
  isDraggingover: boolean,
  isDraggingFromThis: boolean
}

const Area = styled.div<IAreaProps>`
  background-color: ${(props) => props.isDraggingover ? "#dfe6e9" : props.isDraggingFromThis ? "#b2bec3" : "transparent"};
  flex-grow: 1;
  transition: background-color .3s ease-in-out;
  padding: 20px;
  box-sizing: border-box;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0 10px;
  box-sizing: border-box;
  input {
    width: 100%;
    padding: 5px 10px;
    border: 1px solid white;
    border-radius: 5px;
    &:focus{
      outline: none;
      border: 1px solid ${(props) => props.theme.bgColor};
      box-sizing: border-box;
      transition: border 0.3s ease-in-out;
    }
  }
`;

interface IBoardProps {
  todos: ITodo[];
  boardId: string;
}

interface IForm {
  todo: string;
}

function Board({todos, boardId}:IBoardProps){
  const setTodos = useSetRecoilState(todoState);
  const { register, setValue, handleSubmit } = useForm<IForm>()
  const onValid = ({todo}:IForm) => {
    const newTodo = {
      id: Date.now(),
      text: todo,
    }
    setTodos((allBoard) => {
      return {
        ...allBoard,
        [boardId]: [
          newTodo,
          ...allBoard[boardId],
        ],
      }
    });
    setValue("todo", "");
  }

  return(
    <Wrapper>
      <BoardName>{boardId}</BoardName>
      <Form onSubmit={handleSubmit(onValid)}>
        <input {...register("todo", { required: true })} type="text" placeholder={`Add on ${boardId}`} />  
      </Form>
      <Droppable droppableId={boardId}>
        {(provided, snapshot) => (
          <Area isDraggingover={snapshot.isDraggingOver} isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)} style={{ width: "100%"}} ref={provided.innerRef} {...provided.droppableProps}>
            {todos.map((todo, index) => (
              <DragabbleCard key={todo.id} todoId={todo.id} todoText={todo.text} index={index} />
            ))}
            {provided.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  )
}

export default Board;