import { DragDropContext, DragStart, Droppable, DropResult } from "react-beautiful-dnd";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { todoState } from "../atmos";
import Board from "../Components/Board";
import { useState } from "react";
// import Icon from "./icon";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

// fontawesome solid 추가
library.add(fas);


const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100%;
  margin: 10px;
  flex-direction: column;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  gap: 10px;
`;

interface ITrashBoxProps {
  isDraggingover: boolean,
  isDraggingFromThis: boolean,
  isDrag: boolean,
}

const TreshBox = styled.div<ITrashBoxProps>`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 5px;
  margin: 0 auto;
  background-color: ${(props) => props.isDraggingover ? "#ff8563" : props.theme.boardColor};
  width: 70px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin-bottom: 20px;
  font-size: 40px;
  transition: background-color 0.3s ease-in-out, opacity 0.3s ease-in-out;
  overflow: hidden;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.4);
  opacity: ${(props) => props.isDrag ? "1" : "0" };
  svg {
    position: fixed;
    opacity: ${(props) => props.isDraggingover ? "0" : "1"};
    transition: opacity 0.3s ease-in-out;
  }
`;

const Content = styled.div`
  overflow: auto;
  padding: 10px;
`;

function MainContent(){
  const [todos, setTodos] = useRecoilState(todoState);
  const [isDrag, setIsDrag] = useState(false);

  const onDragStart = (info:DragStart) => {
    console.log(info);
    setIsDrag(true);
  }

  const onDragEnd = (info:DropResult) => {
    const { destination, source } = info;

    setIsDrag(false);

    if(!destination) return;
    if(destination?.droppableId === source.droppableId){
      // 같은 보드에서 움직임
      setTodos((allBoard) => {
        const boardCopy = [...allBoard[source.droppableId]];
        const taskObj = boardCopy[source.index];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination?.index, 0, taskObj);
        
        return {
          ...allBoard,
          [source.droppableId]: boardCopy
        };
      })
    }

    if(destination.droppableId !== source.droppableId && destination.droppableId !== "trashBox"){
      // 다른 보드로 움직임
      setTodos((allBoard) => {
        const sourceBoard = [...allBoard[source.droppableId]];
        const taskObj = sourceBoard[source.index];
        const targetBoard = [...allBoard[destination.droppableId]];

        sourceBoard.splice(source.index, 1);
        targetBoard.splice(destination.index, 0, taskObj);

        return {
          ...allBoard,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: targetBoard,
        }
      })
    }

    if(destination.droppableId === "trashBox"){

      setTodos((allBoard) => {
        const sorceBoard = [...allBoard[source.droppableId]];

        sorceBoard.splice(source.index, 1);
        return {
          ...allBoard,
          [source.droppableId]: sorceBoard
        }
      })
    }
  };

  return (
    <Content>
      <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
        <Droppable droppableId="trashBox">
          {(provided, snapshot) => (
            <TreshBox isDrag={isDrag} isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)} isDraggingover={snapshot.isDraggingOver} ref={provided.innerRef}>
              <FontAwesomeIcon icon={["fas", "trash-arrow-up"]} />
              {provided.placeholder}  
            </TreshBox>
          )}
        </Droppable>
        <Wrapper>
          <Boards>
            {Object.keys(todos).map((boardId) => <Board boardId={boardId} key={boardId} todos={todos[boardId]} />)}
          </Boards>
        </Wrapper>
      </DragDropContext>
    </Content>
  )
}

export default MainContent;