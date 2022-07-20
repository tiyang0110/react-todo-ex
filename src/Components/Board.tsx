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

interface IAreaProps {
  isDraggingover: boolean,
  isDraggingFromThis: boolean
}

const Area = styled.div<IAreaProps>`
  background-color: ${(props) => props.isDraggingover ? "pink" : props.isDraggingFromThis ? "red" : "blue"};
  flex-grow: 1;
  transition: background-color .3s ease-in-out;
`;

interface IBoardProps {
  todos: string[];
  boardId: string;
}

function Board({todos, boardId}:IBoardProps){
  return(
    <Wrapper>
      <BoardName>{boardId}</BoardName>
      <Droppable droppableId={boardId}>
        {(provided, snapshot) => (
          <Area isDraggingover={snapshot.isDraggingOver} isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)} style={{ width: "100%"}} ref={provided.innerRef} {...provided.droppableProps}>
            {todos.map((todo, index) => (
              <DragabbleCard key={todo} todo={todo} index={index} />
            ))}
            {provided.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  )
}

export default Board;