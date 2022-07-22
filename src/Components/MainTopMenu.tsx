import styled from "styled-components";

const TopMenu = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  top: 0;
  background-color: #282b30;
  grid-column: 1 / 3;
  color: #FFF;
  span{
    font-size: 28px;
    font-weight: 700;
  }
`;

const TopMenuLogo = styled.div`
  width: 150px;
  cursor: pointer;
`;

const TopMenuCategory = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  span{
    font-weight: 300;
  }
  span:not(:first-child){
    margin-left: 10px;
  }
`;


function MainTopMenu(){
  return (
    <TopMenu>
      <TopMenuLogo>
        <span>No'R'tion</span>
      </TopMenuLogo>
      <TopMenuCategory>
        <span>Menu1</span>
        <span>Menu2</span>
        <span>Menu3</span>
        <span>Menu4</span>
      </TopMenuCategory>
    </TopMenu>
  )
}

export default MainTopMenu;