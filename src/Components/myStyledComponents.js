import styled from "styled-components";

// Kanban Component

const KanbanContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const KanbanBoards = styled.div`
  display: flex;
`;

export { KanbanContainer, KanbanBoards };

// Board Component

const BoardContainer = styled.div`
  width: 350px;
  min-height: 375px;
  border-radius: 10px;
  bacground-color: #f3e6de;
  padding: 20px;
  margin: 2px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  background-color: #fcfcf9;
`;

const BoardTitle = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 10px;
  color: #333;
`;

const BoardDivider = styled.hr`
  background-color: ${(props) => props.color};
  height: 3px;
  width: 100%;
  margin: 15px 0;
`;

const AddContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const ItemInput = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid lightgray;
  border-radius: 4px;
  margin-right: 5px;
  background-color: #fff;
  color: #333;
`;

const ColorSelect = styled.select`
  padding: 8px;
  border: 1px solid lightgray;
  border-radius: 4px;
  margin-right: 5px;
  background-color: #fff;
  color: #333;
`;

const AddItemButton = styled.button`
  padding: 8px 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
export {
  BoardContainer,
  BoardTitle,
  BoardDivider,
  AddContainer,
  ItemInput,
  ColorSelect,
  AddItemButton,
};

// Item Component

const StyledItem = styled.div`
  width: 100%;
  min-height: 60px;
  border: 1px solid ${(props) => props.color};
  border-left: 6px solid ${(props) => props.color};
  padding: 15px;
  border-radius: 6px;
  margin-bottom: 20px;
  cursor: grab;
  background-color: #fcfcf9;
  display: flex;
  align-item: center;
`;
export { StyledItem };
