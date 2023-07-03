const Item = ({ item, board, index, toggel, hendlers }) => {
    const [dragOverHandler, dropHandler, dragLeaveHandler, dragStartHandler, dragEndHandler] = hendlers
    return (
      <div
        onDragOver={dragOverHandler}
        onDragLeave={dragLeaveHandler}
        onDragStart={(e) => dragStartHandler(e, board, item)}
        onDragEnd={dragEndHandler}
        onDrop={(e) => dropHandler(e, board)}
        draggable="true"
        className={`item ${toggel}`}
        data-index={index}
      >
        {item.title}
      </div>
    );
  };
  
  export default Item;