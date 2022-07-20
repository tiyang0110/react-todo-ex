import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import React from "react";

const Card = styled.div`
  background-color: ${(props) => props.theme.cardColor};
  padding: 10px 10px;
  border-radius: 5px;
  margin-bottom: 5px;
  width: 100%;
  box-sizing: border-box;
`;


interface IDragabbleCardProps{
  todo: string;
  index: number;
}

function DragabbleCard({todo, index}:IDragabbleCardProps){
  return (
    <Draggable key={todo} draggableId={todo} index={index}>
      {(e) => (
        <Card ref={e.innerRef} {...e.dragHandleProps} {...e.draggableProps}>
          {todo}
        </Card>
      )}
    </Draggable>
  )
}

export default React.memo(DragabbleCard);