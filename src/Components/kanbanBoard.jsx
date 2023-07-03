import Item from "./kanbanItem"

const Board = ({board, toggel, hendlers, newItemTitles}) => {
    const [handleNewItemChange, handleAddItem, ...itemHendlers] = hendlers
    const  [dragOverHandler, dropHandler] = itemHendlers
    return (
        <div
            className={`board ${toggel}`}
            onDragOver={(e) => dragOverHandler(e)}
            onDrop={(e) => dropHandler(e, board)}
        >   
            <div className={`border__title ${toggel}`}>{board.title}</div>
                {board.items.map((item, index) => (
                    <Item key={item.id} board={board} item={item} index={index} toggel={toggel} hendlers={itemHendlers}/>
                ))}
                <div className={`item-container ${toggel}`}>
                <input
                    type="text"
                    placeholder="Add new item"
                    value={newItemTitles[board.id]}
                    onChange={(e) => handleNewItemChange(e, board)}
                    className={`item-input ${toggel}`}
                />
                <button onClick={() => handleAddItem(board)} className={`add-item-button ${toggel}`}>Add</button>
            </div>
        </div>
    )
}
export default Board