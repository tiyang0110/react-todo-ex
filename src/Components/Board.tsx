import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DragabbleCard from "../Components/DragabbleCard";


const Wrapper = styled.div`
  padding: 20px 10px;
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

interface IBoardProps {
  todos: string[];
  boardId: string;
}

function Board({todos, boardId}:IBoardProps){
  return(
    <Droppable droppableId={boardId}>
      {(provided) => (
        <Wrapper ref={provided.innerRef} {...provided.droppableProps}>
          <BoardName>{boardId}</BoardName>
          {todos.map((todo, index) => (
            <DragabbleCard key={todo} todo={todo} index={index} />
          ))}
          {provided.placeholder}
        </Wrapper>
      )}
    </Droppable>
  )
}

export default Board;