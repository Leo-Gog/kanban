import { StyledItem } from "./myStyledComponents";
const Item = ({ item, board, index, hendlers }) => {
    const [dragOverHandler, dropHandler, dragStartHandler] = hendlers
    return (
      <StyledItem
        onDragOver={dragOverHandler}
        onDragStart={(e) => dragStartHandler(e, board, item)}
        onDrop={(e) => dropHandler(e, board)}
        draggable="true"        
        data-index={index}
        color={item.color}
      >
        {item.title}
      </StyledItem>
    )
  }
  
  export default Item;