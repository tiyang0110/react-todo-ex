import styled from "styled-components";
import MainTopMenu from "./Components/MainTopMenu";
import MainLeftMenu from "./Components/MainLeftMenu";
import MainContent from "./Components/MainContent";

const Main = styled.div`
  display: grid;
  grid-template-columns: 150px 1fr;
  grid-template-rows: 70px 1fr;
`;

/*
  코드 챌린지!
  1. input 꾸미기 O
  2. Todos -> Local Storage 저장 O
  3. Task 삭제 
     -> 버튼, 드래그앤드랍(휴지통 삭제?) O
  4. 보드 자체 순서 바꾸기
  5. 보드 생성 폼 -> 실제 보드 생성
*/

function App(){
  return (
    <Main>
      <MainTopMenu />
      <MainLeftMenu />
      <MainContent />
    </Main>
  );
}

export default App;