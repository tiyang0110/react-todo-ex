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