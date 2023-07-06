import { StyledItem } from "./myStyledComponents";
const Item = ({ item, board, index, toggel, hendlers }) => {
    const [dragOverHandler, dropHandler, dragLeaveHandler, dragStartHandler, dragEndHandler] = hendlers
    return (
      <StyledItem
        onDragOver={dragOverHandler}
        onDragLeave={dragLeaveHandler}
        onDragStart={(e) => dragStartHandler(e, board, item)}
        onDragEnd={dragEndHandler}
        onDrop={(e) => dropHandler(e, board)}
        draggable="true"        
        data-index={index}
        color={item.color}
      >
        {item.title}
      </StyledItem>
    );
  };
  
  export default Item;