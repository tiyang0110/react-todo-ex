import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { todoState } from "./atmos";
import Board from "./Components/Board";


const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;

`;

const Boards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  gap: 10px;
`;


function App(){
  const [todos, setTodos] = useRecoilState(todoState);

  const onDragEnd = (info:DropResult) => {
    const { destination, draggableId, source } = info;

    console.log(info);

    console.log(destination);
    console.log(source.droppableId);

    if(!destination) return;
    if(destination?.droppableId === source.droppableId){
      // 같은 보드에서 움직임
      setTodos((allBoard) => {
        const boardCopy = [...allBoard[source.droppableId]];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination?.index, 0, draggableId);
        return {
          ...allBoard,
          [source.droppableId]: boardCopy
        };
      })
    }

    if(destination.droppableId !== source.droppableId){
      // 다른 보드로 움직임
      setTodos((allBoard) => {
        const sourceBoard = [...allBoard[source.droppableId]];
        const targetBoard = [...allBoard[destination.droppableId]];

        sourceBoard.splice(source.index, 1);
        targetBoard.splice(destination.index, 0, draggableId);

        return {
          ...allBoard,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: targetBoard,
        }
      })
    }

  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(todos).map((boardId) => <Board boardId={boardId} key={boardId} todos={todos[boardId]} />)}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;