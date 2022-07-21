import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import React from "react";

const Card = styled.div<{isDragging: boolean}>`
  background-color: ${(props) => props.isDragging ? "#74b9ff" : props.theme.cardColor};
  padding: 10px 10px;
  border-radius: 5px;
  margin-bottom: 5px;
  width: 100%;
  box-sizing: border-box;
  box-shadow: ${(props) => props.isDragging ? "0px 2px 5px rgba(0, 0, 0, 0.4)" : "none"};
  font-size: 12px;
  font-weight: 400;
  display: flex;
  justify-content: space-between;
  align-items: center;
  span{
    cursor: pointer;
  }
`;

interface IDragabbleCardProps{
  todoId: number;
  todoText: string;
  index: number;
}

function DragabbleCard({todoId, todoText, index}:IDragabbleCardProps){

  return (
    <Draggable key={todoId} draggableId={todoId + ""} index={index}>
      {(e, snapshot) => (
        <Card isDragging={snapshot.isDragging} ref={e.innerRef} {...e.dragHandleProps} {...e.draggableProps}>
          {todoText}
        </Card>
      )}
    </Draggable>
  )
}

export default React.memo(DragabbleCard);